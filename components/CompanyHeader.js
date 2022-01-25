import { useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function CompanyHeader() {
    // const { client } = useChatContext();
    // console.log({ client });
    return (
        <div className="company-header mb-12">
            {cookies.get("fullName") || cookies.get("username")}
            <p className="font-bold text-2xl">Benji Chat</p>
        </div>
    );
}
