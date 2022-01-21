import React from "react";
import {
    MessageList,
    MessageInput,
    Thread,
    Window,
    useChannelActionContext,
    Avatar,
    useChannelStateContext,
    useChatContext,
} from "stream-chat-react";

import { useStateContext } from "@/context/StateContextProvider";

import { GrCircleInformation } from "react-icons/gr";

export default function TeamChannelHeader() {
    const { watcher_count } = useChannelStateContext();

    const getWatcherText = (watchers) => {
        if (!watchers) return "No users online";
        if (watchers === 1) return "1 user online";
        return `${watchers} users online`;
    };

    return (
        <div className="team-channer-header">
            <div className="flex justify-between">
                <div>
                    <MessagingHeader />
                </div>
                <div>
                    <p>{getWatcherText(watcher_count)}</p>
                </div>
            </div>
        </div>
    );
}

const MessagingHeader = () => {
    const { channel } = useChannelStateContext();
    const { client } = useChatContext();
    const members = Object.values(channel.state.members).filter(
        ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    const {
        setCreateType,
        setIsCreating,
        setIsEditing,
        toggleContainer,
        setToggleContainer,
    } = useStateContext();

    if (channel.type === "messaging") {
        return (
            <div>
                {members.map(({ user }, i) => (
                    <div key={i}>
                        <Avatar name={user.fullName} size={32} />
                        <p>{user.fullName}</p>
                    </div>
                ))}
                {additionalMembers > 0 && <p>and {additionalMembers} more</p>}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center messaging-header ">
                <div>
                    <p># {channel.data.name}</p>
                </div>
                <div>
                    <span>
                        <GrCircleInformation
                            onClick={() =>
                                setIsEditing((prevState) => !prevState)
                            }
                        />
                    </span>
                </div>
            </div>
        </>
    );
};
