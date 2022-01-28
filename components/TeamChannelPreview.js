import { useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import TagIcon from "@mui/icons-material/Tag";
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
    console.log({ channel });
    console.log({ type });
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
        <div className="channel-preview flex items-center">
            <div className="">
                <TagIcon fontSize="small" />
            </div>
            <div className="px-2">
                <p className="lg:text-base text-xs">
                    {channel?.data?.name || channel?.data?.id}
                </p>
            </div>
        </div>
    );

    const DirectMessagePreview = () => {
        const members = Object.values(channel.state.members).filter(
            ({ user }) => user.id !== client.userID
        );
        console.log(members[0].user.online);
        if (members.length > 1) {
            return (
                <div className="direct-message-preview flex items-center">
                    <div className="">
                        <p className="lg:text-base text-xs">
                            {members.map((member, i) => {
                                console.log({ member });
                                return (
                                    <span key={i}>
                                        {member?.user?.fullName ||
                                            member?.user?.name}
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
            <div className="direct-message-preview flex items-center ">
                <div>
                    <Avatar
                        shape="rounded"
                        name={members[0]?.user.fullName || members[0]?.user?.id}
                        size={20}
                    />
                </div>
                <div className="px-2">
                    <p className="lg:text-base text-xs">
                        {members[0]?.user.fullName || members[0]?.user?.id}
                    </p>
                </div>
                {members[0].user.online ? (
                    <div className="w-2 h-2 rounded-full border dark:border-green-400 bg-green-400"></div>
                ) : (
                    <div className="w-2 h-2 rounded-full border dark:border-grey-50 border-grey-500"></div>
                )}
            </div>
        );
    };
    return (
        <div className="team-channel-preview lg:px-6">
            <div
                className={`
                    ${
                        channel?.id === activeChannel?.id
                            ? "selected dark:text-grey-50 "
                            : " text-grey-400"
                    }
                    px-6 hover:dark:bg-grey-600 hover:bg-grey-100 py-2 cursor-pointer rounded-lg `}
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
