import { useState, useEffect } from "react";

import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
export default function ChannelNameInput() {
    const { channelName, setChannelName, setSelectedUsers, selectedUsers } =
        useStateContext();
    const { client, setActiveChannel, channel } = useChatContext();
    // const [selected, setSelected] = useState([]);

    // console.log({ channel });
    // console.log({ client });
    // console.log({ selectedUsers });
    const handleChange = (e) => {
        e.preventDefault();
        setChannelName(e.target.value);
    };

    // useEffect(() => {
    //     setChannelName(channel?.data?.name);

    //     setSelectedUsers((prevState) => [...prevState, client.userID]);
    // }, []);

    return (
        <div className="channel-name-input">
            <div className="flex mb-4">
                <div>
                    <p>Name</p>
                </div>
                <div className="px-2">
                    <input
                        type="text"
                        value={channelName}
                        onChange={handleChange}
                        placeholder="channel-name (No spaces)"
                        className="border"
                    />
                </div>
            </div>
        </div>
    );
}
