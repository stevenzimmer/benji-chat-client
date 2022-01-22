import React from "react";
import { MessageTeam, useMessageContext } from "stream-chat-react";

export default function TeamMessage({ messageProps }) {
    // const { handleOpenThread, message } = useMessageContext();

    // const handleOpenThread = (e) => {
    //     console.log("handle open thread", e);
    // };

    return (
        <MessageTeam
            message={{ ...message, user: {} }}
            // handleOpenThread={handleOpenThread}
        />
    );
}
