import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import UserList from "./UserList";

import { AiFillCloseCircle } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import kebabCase from "just-kebab-case";

import Button from "@mui/material/Button";
import ChannelNameInput from "./ChannelNameInput";

export default function EditChannel() {
    const { channel } = useChatContext();
    const {
        setIsEditing,
        selectedUsers,
        setSelectedUsers,
        setChannelName,
        channelName,
    } = useStateContext();

    let removedMembers = [];

    Object.keys(channel.state.members).map((member) => {
        if (!selectedUsers.includes(member)) {
            removedMembers.push(member);
        }
    });

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const nameChanged =
            channelName !== (channel.data.name || channel.data.id);

        if (nameChanged) {
            await channel.update(
                {
                    name: channelName,
                    id: kebabCase(channelName),
                },
                {
                    text: `Channel name changed to ${channelName}`,
                }
            );
        }

        if (selectedUsers.length) {
            if (
                selectedUsers.length !==
                Object.keys(channel.state.members).length
            ) {
                if (
                    selectedUsers.length >
                    Object.keys(channel.state.members).length
                ) {
                    selectedUsers.map((member) =>
                        channel.addMembers([member], {
                            text: `${member} joined the channel`,
                        })
                    );
                } else {
                    removedMembers.map((member) =>
                        channel.removeMembers([member], {
                            text: `${member} left the channel`,
                        })
                    );
                }
            }
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    };

    useEffect(() => {
        setSelectedUsers((prevState) => {
            return Object.keys(channel.state.members).map((obj) => {
                console.log("edit channel previous state", prevState);
                return obj;
            });
        });
    }, []);
    return (
        <div className="edit-channel px-6 dark:bg-grey-300 py-6 h-full">
            <div className="flex items-center mb-12">
                <div>
                    <p>Edit Channel</p>
                </div>
                <div>
                    <CloseIcon
                        onClick={(e) => {
                            setIsEditing((prevState) => !prevState);
                        }}
                    />
                </div>
            </div>

            <ChannelNameInput />
            <UserList />
            <Button variant="outlined" onClick={handleSaveChanges}>
                Save Changes
            </Button>
        </div>
    );
}
