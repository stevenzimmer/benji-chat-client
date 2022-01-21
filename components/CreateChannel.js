import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import UserList from "./UserList";
import ChannelNameInput from "./ChannelNameInput";

import { AiFillCloseCircle } from "react-icons/ai";
export default function CreateChannel() {
    const {
        createType,
        setCreateType,
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
        selectedUsers,
        setSelectedUsers,
        setChannelName,
        channelName,
    } = useStateContext();

    const { client, setActiveChannel } = useChatContext();

    const createChannel = async (e) => {
        e.preventDefault();
        try {
            console.log("create cahnnel");
            const newChannel = await client.channel(createType, channelName, {
                name: channelName,
                members: selectedUsers,
            });

            await newChannel.watch();
            setChannelName("");
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div className="create-channel">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p>
                        {createType === "team"
                            ? "Create a new channel"
                            : "Send a direct message"}
                    </p>
                </div>
                <div>
                    <AiFillCloseCircle
                        onClick={(e) => {
                            setIsCreating((prevState) => !prevState);
                            setChannelName("");
                        }}
                    />
                </div>
            </div>

            {createType === "team" && <ChannelNameInput />}

            <p className="mb-2">Add Members</p>
            <UserList />

            <div
                className={`border w-auto inline-block px-2 create-${
                    createType === "team" ? "channel" : "message-group"
                }-button`}
                onClick={createChannel}
            >
                <p>
                    {createType === "team"
                        ? "Create channel"
                        : "Create Message group"}
                </p>
            </div>
        </div>
    );
}
