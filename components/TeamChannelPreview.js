import { Avatar, useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import { motion, AnimatePresence } from "framer-motion";

const itemVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
    transition: {
        duration: 0.3,
    },
};
export default function TeamChannelPreview({ channel, type }) {
    const {
        channel: activeChannel,
        client,
        setActiveChannel,
    } = useChatContext();
    const {
        createType,
        setCreateType,
        isCreating,
        setIsCreating,
        isEditing,
        setIsEditing,
        setToggleContainer,
    } = useStateContext();

    const ChannelPreview = () => (
        <div className="channel-preview">
            <p># {channel?.data?.name || channel?.data?.id}</p>
        </div>
    );

    const DirectMessagePreview = () => {
        const members = Object.values(channel.state.members).filter(
            ({ user }) => user.id !== client.userID
        );

        if (members.length > 1) {
            console.log({ members });
            return (
                <div className="direct-message-preview flex items-center">
                    <div className="">
                        <p>
                            {/* {members[0]?.user.fullName || members[0]?.user?.id} */}
                            {members.map((member, i) => {
                                return (
                                    <span key={i}>
                                        {member?.user?.fullName ||
                                            member?.user?.id}
                                        ,{" "}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="direct-message-preview flex items-center">
                <div>
                    <Avatar
                        // image={members[0]?.user?.image}
                        name={members[0]?.user.fullName || members[0]?.user?.id}
                        size={24}
                    />
                </div>
                <div className="px-2">
                    <p>{members[0]?.user.fullName || members[0]?.user?.id}</p>
                </div>
            </div>
        );
    };
    return (
        <div className="team-channel-preview ">
            <div
                className={`
                    ${
                        channel?.id === activeChannel?.id
                            ? "selected text-white"
                            : " dark:text-grey-400"
                    }
                    px-6 hover:bg-grey-500 py-2 cursor-pointer`}
                onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                    setActiveChannel(channel);
                    if (setToggleContainer) {
                        setToggleContainer((prevState) => !prevState);
                    }
                }}
            >
                {type === "team" ? (
                    <ChannelPreview />
                ) : (
                    <DirectMessagePreview />
                )}
            </div>
        </div>
    );
}
