import { connect } from "getstream";
import bcrypt from "bcrypt";
const StreamChat = require("stream-chat").StreamChat;

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
    methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async (req, res) => {
    // Run the middleware
    await runMiddleware(req, res, cors);
    try {
        const { username, password } = req.body;

        const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY;
        const api_secret = process.env.NEXT_PUBLIC_STREAM_API_SECRET;
        const app_id = process.env.NEXT_PUBLIC_STREAM_APP_ID;

        // const serverClient = await connect(api_key, api_secret, app_id);

        const serverClient = await StreamChat.getInstance(api_key, api_secret);

        console.log({ serverClient });

        // console.log("query users", serverClient.queryUsers({ name: username }));

        // const client = await StreamChat.getInstance(
        //     serverClient.apiKey,
        //     serverClient.apiSecret
        // );

        // if (!client.secret) {
        //     console.log("no client secret");
        //     console.log(serverClient.apiSecret);
        //     client.secret = serverClient.apiSecret;
        // }

        // console.log({ client });

        // console.log("before users");
        const { users } = await serverClient.queryUsers({ name: username });

        console.log({ users });

        // if (!users) {
        //     return res.status(400).json({ message: "Could not query Users" });
        // }

        // if (!users.length) {
        //     return res.status(400).json({ message: "User not found" });
        // }

        // const success = await bcrypt.compare(password, users[0].hashedPassword);

        // const token = serverClient.createUserToken(users[0].id);

        // // console.log({ token });

        // if (success) {
        //     res.status(200).json({
        //         token,
        //         fullName: users[0].fullName,
        //         userId: users[0].id,
        //     });
        // } else {
        //     res.status(500).json({ message: "Incorrect Password" });
        // }

        // res.status(200).json({
        //     token,
        //     fullName,
        //     username,
        //     userID,
        //     hashedPassword,
        //     phoneNumber,
        // });
    } catch (err) {
        console.log("catch error");
        console.log({ err });
        res.status(500).json({
            message: "There was an issue, please try again",
        });
    }
};
