import React from "react";
import { useStateContext } from "@/context/StateContextProvider";
import { Avatar, useChatContext } from "stream-chat-react";
const channelByUser = async ({
    client,
    setActiveChannel,
    channel,
    setChannel,
}) => {
    const filters = {
        type: "messaging",
        member_count: 2,
        members: { $eq: [client.user.id, client.userID] },
    };

    const [existingChannel] = await client.queryChannels(filters);
    if (existingChannel) {
        return setActiveChannel(existingChannel);
    }

    const newChannel = client.channel("messaging", {
        members: [channel.id, client.userID],
    });

    setChannel(newChannel);

    return setActiveChannel(newChannel);
};

export default function SearchResult({ channel, focusedId, setChannel, type }) {
    const { setToggleContainer } = useStateContext();
    const { client, setActiveChannel } = useChatContext();

    console.log({ type });

    if (type === "channel") {
        return (
            <div
                onClick={() => {
                    setChannel(channel);
                    if (setToggleContainer) {
                        setToggleContainer((prevState) => !prevState);
                    }
                }}
                className={focusedId === channel.id ? "focused-channel" : ""}
            >
                <div>
                    <p># {channel.data.name}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={async () => {
                channelByUser({
                    client,
                    setActiveChannel,
                    channel,
                    setChannel,
                });

                if (setToggleContainer) {
                    setToggleContainer((prevState) => !prevState);
                }
            }}
            className={focusedId === channel.id ? "focused-user" : ""}
        >
            <div className="search-result-user">
                <Avatar name={channel.name} size={24} />

                <p>{channel.name}</p>
            </div>
        </div>
    );
}
