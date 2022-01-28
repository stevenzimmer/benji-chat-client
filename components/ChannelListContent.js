import { ChannelList, useChatContext, Avatar } from "stream-chat-react";
import Cookies from "universal-cookie";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";

import CompanyHeader from "./CompanyHeader";
import { AnimatePresence } from "framer-motion";

const customChannelTeamFilter = (channels) =>
    channels.filter((channel) => channel.type === "team");

const customChannelMessagingFilter = (channels) =>
    channels.filter((channel) => channel.type === "messaging");

const cookies = new Cookies();

import ForumIcon from "@mui/icons-material/Forum";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

import Switch from "@mui/material/Switch";

import { useStateContext } from "@/context/StateContextProvider";

const sidebarLinks = [
    {
        icon: () => <ForumIcon />,
        text: "Channels",
        type: "team",
        filter: customChannelTeamFilter,
    },
    {
        icon: () => <ChatIcon />,
        text: "Direct Messages",
        type: "messaging",
        filter: customChannelMessagingFilter,
    },
];
export default function ChannelListContent({ isDark, setIsDark }) {
    const { client } = useChatContext();

    const filters = { members: { $in: [client.userID] } };

    const { isOpen, setIsOpen } = useStateContext();

    const handleLogout = () => {
        console.log("Logout button");
        cookies.remove("token");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("userId");

        cookies.remove("phoneNumber");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");

        window.location.reload();
    };

    return (
        <div
            className={`flex channel-list-content h-full fixed top-0 left-0 dark:bg-grey-700 bg-grey-50 ${
                isOpen ? "md:w-56 lg:w-96" : "w-24"
            }`}
        >
            <div className="w-full relative">
                <div className="lg:px-6 py-6 px-2">
                    <CompanyHeader />
                    <div
                        className={`flex items-center mb-6 ${
                            isOpen ? "justify-between" : "justify-center"
                        }`}
                    >
                        <div className="w-12 ">
                            <Avatar
                                shape="rounded"
                                className="text-center"
                                name={
                                    cookies.get("fullName") ||
                                    cookies.get("username")
                                }
                                size={32}
                            />
                        </div>
                        {isOpen && (
                            <div className="w-full px-2 lg:px-4">
                                <p className="dark:text-grey-50">
                                    {cookies.get("fullName")}
                                </p>
                            </div>
                        )}
                    </div>
                    <ChannelSearch />

                    {sidebarLinks.map((link, i) => {
                        return (
                            <ChannelList
                                key={i}
                                channelRenderFilterFn={link.filter}
                                filters={filters}
                                List={(listProps) => (
                                    <TeamChannelList
                                        link={link}
                                        {...listProps}
                                    />
                                )}
                                Preview={(previewProps) => (
                                    <TeamChannelPreview
                                        type={link.type}
                                        {...previewProps}
                                    />
                                )}
                            />
                        );
                    })}
                </div>
                <div className="px-6 absolute bottom-3 w-full border-t dark:border-grey-600 border-grey-200 ">
                    <div
                        className={`py-3 cursor-pointer hover:dark:bg-grey-600 hover:bg-grey-100 ${
                            isOpen ? "rounded-lg" : "rounded-full"
                        }`}
                        onClick={handleLogout}
                    >
                        <div
                            className={`flex  items-center ${
                                isOpen ? "" : "justify-center"
                            }`}
                        >
                            <div>
                                <div className="flex items-center dark:text-grey-50 text-grey-600">
                                    <div className="px-2 w-12 text-center">
                                        <LogoutIcon />
                                    </div>
                                    {isOpen && (
                                        <div className="px-6 lg:text-base text-sm">
                                            Logout
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-12">
                            <Switch
                                defaultChecked={isDark ? true : false}
                                onChange={(e) =>
                                    setIsDark((prevState) => !prevState)
                                }
                                size="small"
                                inputProps={{ "aria-label": "Switch demo" }}
                            />
                        </div>
                        {isOpen && (
                            <div className="px-6 dark:text-grey-50">
                                <p className="lg:text-base text-sm">
                                    {isDark ? "Dark mode" : "Light mode"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
