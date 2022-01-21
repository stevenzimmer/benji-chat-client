import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import UserList from "./UserList";

import ChannelNameInput from "./ChannelNameInput";

import { AiFillCloseCircle } from "react-icons/ai";

export default function EditChannel() {
    const { channel } = useChatContext();
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

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const nameChanged =
            channelName !== (channel.data.name || channel.data.id);

        if (nameChanged) {
            await channel.update({
                name: channelName,
                text: `Channel name changed to ${channelName}`,
            });
        }

        if (selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    };
    return (
        <div className="edit-channel">
            <div>
                <p>Edit Channel</p>
                <AiFillCloseCircle
                    onClick={(e) => {
                        setIsEditing((prevState) => !prevState);
                    }}
                />
            </div>

            <ChannelNameInput />
            <div onClick={handleSaveChanges}>
                <p>Save Changes</p>
            </div>
        </div>
    );
}
