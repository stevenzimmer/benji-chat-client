import { connect } from "getstream";
import bcrypt from "bcrypt";
import crypto from "crypto";

export default async function register(req, res) {
    try {
        const { fullName, username, phoneNumber, password } = req.body;

        const userId = crypto.randomBytes(16).toString("hex");
        const serverClient = connect(
            process.env.STREAM_API_KEY,
            process.env.STREAM_API_SECRET,
            process.env.STREAM_APP_ID
        );

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({
            token,
            fullName,
            username,
            userId,
            hashedPassword,
            phoneNumber,
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
