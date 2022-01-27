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
        <div className="team-channer-header p-6 border-b dark:border-grey-500">
            <div className="flex justify-between">
                <div>
                    <MessagingHeader />
                </div>
                <div className="text-grey-200">
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

    const { setIsEditing, channelName, setChannelName } = useStateContext();

    if (channel.type === "messaging") {
        return (
            <div className="flex items-center text-grey-200">
                {members.map(({ user }, i) => {
                    console.log({ user });
                    return (
                        <div
                            key={i}
                            className="flex items-center text-grey-200"
                        >
                            <Avatar name={user.fullName || user.id} size={32} />
                            <p>{user.fullName || user.id}</p>
                        </div>
                    );
                })}
                {additionalMembers > 0 && <p>and {additionalMembers} more</p>}
            </div>
        );
    }

    // console.log({ channel });

    return (
        <>
            <div className="flex items-center messaging-header text-grey-200">
                <div>
                    <p># {channel.data.name || channel.data.id}</p>
                </div>
                <div className="px-2">
                    <span className="">
                        <GrCircleInformation
                            onClick={() => {
                                setIsEditing((prevState) => !prevState);
                                setChannelName(channel.data.name);
                            }}
                        />
                    </span>
                </div>
            </div>
        </>
    );
};
