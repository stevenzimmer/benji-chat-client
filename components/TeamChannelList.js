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
        <>
            <div className="flex items-center justify-between team-channel-list  group dark:bg-grey-100 p-2">
                <div>
                    <p className="">
                        {type === "team" ? "Channels" : "Direct Messages"}{" "}
                    </p>
                </div>
                <div className="hidden group-hover:block">
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
            <div className="dark:text-grey-50">{children}</div>
        </>
    );
}
