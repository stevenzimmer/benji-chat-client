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
import TagIcon from "@mui/icons-material/Tag";

import { useStateContext } from "@/context/StateContextProvider";

import EditIcon from "@mui/icons-material/Edit";

export default function TeamChannelHeader() {
    const { watcher_count } = useChannelStateContext();

    console.log({ watcher_count });

    const getWatcherText = (watchers) => {
        if (!watchers) return "No users online";
        if (watchers === 1) return "1 user online";
        return `${watchers} users online`;
    };

    return (
        <div className="team-channer-header py-6 border-b dark:border-grey-500 border-grey-200">
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
            <div className="flex items-center dark:text-grey-200">
                {members.map(({ user }, i) => {
                    console.log({ user });
                    return (
                        <div key={i} className="flex items-center ">
                            <Avatar
                                shape="rounded"
                                name={user.fullName || user.id}
                                size={24}
                            />
                            <div className="px-6">
                                <p className="">{user.fullName || user.id}</p>
                            </div>
                        </div>
                    );
                })}
                {additionalMembers > 0 && <p>and {additionalMembers} more</p>}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center messaging-header dark:text-grey-200">
                <div>
                    <TagIcon />
                </div>
                <div className="px-2">
                    <p className="">{channel.data.name || channel.data.id}</p>
                </div>
                <div className="px-2">
                    <EditIcon
                        onClick={() => {
                            setIsEditing((prevState) => !prevState);
                            setChannelName(channel.data.name);
                        }}
                        fontSize="small"
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </>
    );
};
