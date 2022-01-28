import { GrFormAdd } from "react-icons/gr";
import { useStateContext } from "@/context/StateContextProvider";
import AddIcon from "@mui/icons-material/Add";
export default function TeamChannelList({
    children,
    error = false,
    loading,

    link,
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
        isOpen,
        setIsOpen,
    } = useStateContext();

    if (error) {
        return link.type === "team" ? (
            <div className="team-channel-list-error">
                <p>Connection error, please wait a moment and try again</p>
            </div>
        ) : null;
    }

    if (loading) {
        return (
            <div className="team-channel-list-loading">
                <p>
                    {link.type === "team" ? "Channels" : "Messages"} loading...
                </p>
            </div>
        );
    }
    return (
        <>
            <div
                className={`flex items-center  ${
                    isOpen ? "justify-between" : "justify-center"
                }`}
            >
                <div className="flex items-center justify-start dark:text-grey-50 text-grey-600">
                    <div
                        className={`text-center flex items-center justify-center ${
                            isOpen
                                ? ""
                                : "rounded-full hover:dark:bg-grey-600 hover:bg-grey-100 cursor-pointer w-12 h-12"
                        }`}
                    >
                        {link.icon()}
                    </div>
                    {isOpen && (
                        <div className="px-2 lg:px-6 lg:text-base text-sm">
                            {link.text}
                        </div>
                    )}
                </div>

                {isOpen && (
                    <div
                        className="dark:text-grey-50  cursor-pointer w-12 h-12 rounded-full flex items-center justify-center hover:dark:bg-grey-600 hover:bg-grey-100"
                        onClick={() => {
                            setCreateType(link.type);
                            setIsCreating((prevState) => !prevState);
                            setIsEditing(false);
                            if (setToggleContainer) {
                                setToggleContainer((prevState) => !prevState);
                            }
                        }}
                    >
                        <AddIcon />
                    </div>
                )}
            </div>
            {isOpen && <div className="dark:text-grey-50 ">{children}</div>}
        </>
    );
}
