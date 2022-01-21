import { GrFormAdd } from "react-icons/gr";
import { useStateContext } from "@/context/StateContextProvider";
export default function TeamChannelList({
    children,
    error = false,
    loading,
    type,
}) {
    const {
        createType,
        setCreateType,
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
        toggleContainer,
        setToggleContainer,
    } = useStateContext();

    if (error) {
        return type === "team" ? (
            <div className="team-channel-list-error">
                <p>Connection error, please wait a moment and try again</p>
            </div>
        ) : null;
    }

    if (loading) {
        return (
            <div className="team-channel-list-loading">
                <p>{type === "team" ? "Channels" : "Messages"} loading...</p>
            </div>
        );
    }
    return (
        <div className="flex items-center team-channel-list">
            <div>
                <p>{type === "team" ? "Channels" : "Direct Messages"} </p>
            </div>
            <div>
                <GrFormAdd
                    onClick={() => {
                        setCreateType(type);
                        setIsCreating((prevState) => !prevState);
                        setIsEditing(false);
                        if (setToggleContainer) {
                            setToggleContainer((prevState) => !prevState);
                        }
                    }}
                />
            </div>
        </div>
    );
}
