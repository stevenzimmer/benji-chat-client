import { useState } from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";

import ChannelInner from "./ChannelInner";
import CreateChannel from "./CreateChannel";
import EditChannel from "./EditChannel";
// import TeamMessage from "./TeamMessage";
import { useStateContext } from "@/context/StateContextProvider";
export default function ChannelContainer() {
    const {
        createType,
        setCreateType,
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
    } = useStateContext();
    const { channel } = useChatContext();
    // console.log({ channel });

    if (isCreating) {
        return (
            <div className="is-creating">
                <CreateChannel />
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="is-editing">
                <EditChannel />
            </div>
        );
    }

    const EmptyState = () => (
        <div className="empty-state">
            <p>This is the beginning of your chat history</p>
            <p>Send messages, attachments, links and more</p>
        </div>
    );
    return (
        <div className="channel-container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => (
                    <MessageTeam key={i} {...messageProps} />
                )}
            >
                <ChannelInner />
            </Channel>
        </div>
    );
}
