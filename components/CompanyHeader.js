import { useChatContext } from "stream-chat-react";
export default function CompanyHeader() {
    const { client } = useChatContext();
    // console.log({ client });
    return (
        <div className="company-header mb-12">
            <p>{client.user.name}</p>
            <p className="font-bold text-2xl">Benji Chat</p>
        </div>
    );
}
