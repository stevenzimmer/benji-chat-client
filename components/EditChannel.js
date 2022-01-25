import { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import UserList from "./UserList";

// import ChannelNameInput from "./ChannelNameInput";

import { AiFillCloseCircle } from "react-icons/ai";
import kebabCase from "just-kebab-case";

const ChannelNameInput = () => {
    const { setChannelName, channelName } = useStateContext();
    // console.log({ channelName });
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    };

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input
                value={channelName}
                onChange={handleChange}
                placeholder="channel-name"
            />
            <p>Add Members</p>
        </div>
    );
};

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
        <div className="edit-channel">
            <div>
                <p>Edit Channel</p>
                <AiFillCloseCircle
                    onClick={(e) => {
                        setIsEditing((prevState) => !prevState);
                    }}
                />
            </div>

            <ChannelNameInput
                channelName={channelName}
                setChannelName={setChannelName}
            />
            <UserList />
            <div onClick={handleSaveChanges}>
                <p>Save Changes</p>
            </div>
        </div>
    );
}
