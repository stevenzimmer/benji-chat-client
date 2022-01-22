import dynamic from "next/dynamic";

import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";
const DynamicSidebar = dynamic(() => import("./Sidebar"));
import CompanyHeader from "./CompanyHeader";

const customChannelTeamFilter = (channels) =>
    channels.filter((channel) => channel.type === "team");

const customChannelMessagingFilter = (channels) =>
    channels.filter((channel) => channel.type === "messaging");

export default function ChannelListContent() {
    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

    return (
        <div className="flex channel-list-content h-full">
            <div className="lg:w-1/4">
                <DynamicSidebar />
            </div>
            <div className="lg:w-3/4">
                <div className="flex justify-center bg-blue-100 py-6 h-full">
                    <div className="lg:w-11/12">
                        <div>
                            <CompanyHeader />
                            <ChannelSearch />
                            <ChannelList
                                channelRenderFilterFn={customChannelTeamFilter}
                                filters={filters}
                                List={(listProps) => (
                                    <TeamChannelList
                                        type="team"
                                        {...listProps}
                                    />
                                )}
                                Preview={(previewProps) => (
                                    <TeamChannelPreview
                                        type="team"
                                        {...previewProps}
                                    />
                                )}
                            />

                            <ChannelList
                                channelRenderFilterFn={
                                    customChannelMessagingFilter
                                }
                                filters={filters}
                                setActiveChannelOnMount={false}
                                List={(listProps) => (
                                    <TeamChannelList
                                        type="messaging"
                                        {...listProps}
                                    />
                                )}
                                Preview={(previewProps) => (
                                    <TeamChannelPreview
                                        type="messaging"
                                        {...previewProps}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
