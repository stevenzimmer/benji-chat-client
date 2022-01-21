import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";
import Sidebar from "./Sidebar";
import CompanyHeader from "./CompanyHeader";
// import { useStateContext } from "@/context/StateContextProvider";

const customChannelTeamFilter = (channels) => {
    console.log({ channels });
    return channels.filter((channel) => {
        console.log({ channel });
        return channel.type === "team";
    });
};

const customChannelMessagingFilter = (channels) => {
    console.log({ channels });
    return channels.filter((channel) => {
        console.log({ channel });
        return channel.type === "messaging";
    });
};
export default function ChannelListContent() {
    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

    console.log({ filters });

    return (
        <>
            <div className="flex channel-list-content">
                <div className="lg:w-1/4">
                    <Sidebar />
                </div>
                <div className="lg:w-3/4">
                    <CompanyHeader />
                    <ChannelSearch />
                    <ChannelList
                        channelRenderFilterFn={customChannelTeamFilter}
                        filters={filters}
                        List={(listProps) => {
                            return (
                                <TeamChannelList type="team" {...listProps} />
                            );
                        }}
                        Preview={(previewProps) => {
                            console.log({ previewProps });
                            return (
                                <TeamChannelPreview
                                    type="team"
                                    {...previewProps}
                                />
                            );
                        }}
                    />

                    <ChannelList
                        channelRenderFilterFn={customChannelMessagingFilter}
                        filters={filters}
                        List={(listProps) => {
                            return (
                                <TeamChannelList
                                    type="messaging"
                                    {...listProps}
                                />
                            );
                        }}
                        Preview={(previewProps) => {
                            console.log({ previewProps });
                            return (
                                <TeamChannelPreview
                                    type="messaging"
                                    {...previewProps}
                                />
                            );
                        }}
                    />
                </div>
            </div>
        </>
    );
}
