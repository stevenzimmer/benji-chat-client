import { Avatar, useChatContext } from "stream-chat-react";
import { useStateContext } from "@/context/StateContextProvider";
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
        <div className="team-channel-preview">
            <div
                className={channel?.id === activeChannel?.id ? "selected" : ""}
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
