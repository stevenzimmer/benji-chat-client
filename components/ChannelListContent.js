import dynamic from "next/dynamic";
import { useState } from "react";

import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";
import Sidebar from "@/components/Sidebar";

import CompanyHeader from "./CompanyHeader";
import { AnimatePresence } from "framer-motion";

const customChannelTeamFilter = (channels) =>
    channels.filter((channel) => channel.type === "team");

const customChannelMessagingFilter = (channels) =>
    channels.filter((channel) => channel.type === "messaging");

export default function ChannelListContent() {
    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

    // console.log({ client });
    // console.log("user", client._user.name);

    return (
        <div className={`flex channel-list-content h-full `}>
            <div className="lg:w-1/4">
                <Sidebar />
            </div>
            <div className="lg:w-3/4">
                <div className="flex justify-center bg-blue-100 dark:bg-grey-900 dark:text-white py-6 h-full">
                    <div className="lg:w-full">
                        <div>
                            <CompanyHeader />
                            {/* <ChannelSearch /> */}
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
