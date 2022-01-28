import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import UserList from "./UserList";
import kebabCase from "just-kebab-case";

import { AiFillCloseCircle } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import ChannelNameInput from "./ChannelNameInput";

// const ChannelNameInput = () => {
//     const { channelName, setChannelName } = useStateContext();
//     const handleChange = (e) => {
//         e.preventDefault();
//         setChannelName(e.target.value);
//     };

//     return (
//         <div className="channel-name-input__wrapper ">
//             <div className="flex items-center mb-6">
//                 <div>
//                     <p>Name</p>
//                 </div>
//                 <div>
//                     <input
//                         value={channelName}
//                         onChange={handleChange}
//                         placeholder="channel-name"
//                     />
//                 </div>
//             </div>

//             <p>Add Members</p>
//         </div>
//     );
// };
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

    const { client, setActiveChannel, channel } = useChatContext();

    // console.log("create channel client", client);

    console.log("current user", client.userID);

    useEffect(() => {
        setSelectedUsers([]);

        setSelectedUsers((prevState) => {
            console.log({ prevState });
            console.log(client.userID);

            return [...prevState, client.userID];
        });
        setChannelName("");
        // console.log({ selectedUsers });
    }, []);

    const createChannel = async (e) => {
        e.preventDefault();
        // console.log({ selectedUsers });
        // console.log(kebabCase(channelName));

        try {
            console.log("create channel");
            console.log({ createType });
            const newChannel = await client.channel(
                createType,
                kebabCase(channelName),
                {
                    name: channelName,
                    members: selectedUsers,
                }
            );

            await newChannel.watch();
            setChannelName("");
            setIsCreating(false);
            setSelectedUsers((prevState) => {
                console.log({ prevState });
                console.log(client.userID);
                if (!prevState.includes(client.userID)) {
                    return [...prevState, client.userID];
                }
            });
            setActiveChannel(newChannel);
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div className="create-channel p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="font-bold">
                        {createType === "team"
                            ? "Create a new channel"
                            : "Send a direct message"}
                    </p>
                </div>
                <div>
                    <CloseIcon
                        onClick={(e) => {
                            setIsCreating((prevState) => !prevState);
                            setSelectedUsers([]);
                            setChannelName("");
                        }}
                    />
                </div>
            </div>

            {createType === "team" && (
                <ChannelNameInput
                    channelName={channelName}
                    setChannelName={setChannelName}
                />
            )}

            <UserList />

            <Button variant="outlined" onClick={createChannel}>
                {createType === "team"
                    ? "Create channel"
                    : "Create Message group"}
            </Button>
        </div>
    );
}
