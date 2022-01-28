import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [createType, setCreateType] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const [toggleContainer, setToggleContainer] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState("");
    const [channelName, setChannelName] = useState("");

    return (
        <StateContext.Provider
            value={{
                createType,
                setCreateType,
                isCreating,
                setIsCreating,
                isEditing,
                setIsEditing,
                toggleContainer,
                setToggleContainer,
                selectedUsers,
                setSelectedUsers,
                channelName,
                setChannelName,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
