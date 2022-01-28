import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { BsSearch } from "react-icons/bs";
import ResultsDropdown from "./ResultsDropdown";
import { InputBase } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useStateContext } from "@/context/StateContextProvider";
import Popover from "@mui/material/Popover";
export default function ChannelSearch() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directMessagingChannels, setDirectMessagingChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const { client, setActiveChannel } = useChatContext();
    const { isOpen } = useStateContext();

    const getChannels = async (text) => {
        try {
            // Fetch channels
            const channelResponse = client.queryChannels({
                type: "team",
                name: { $autocomplete: text },
                members: { $in: [client.userID] },
            });

            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text },
            });

            const [channels, { users }] = await Promise.all([
                channelResponse,
                userResponse,
            ]);

            // console.log({ channels });
            // console.log({ users });

            if (channels.length) {
                setTeamChannels(channels);
            }
            if (users.length) {
                setDirectMessagingChannels(users);
            }
            setLoading(false);
        } catch (err) {
            console.log({ err });
            setQuery("");
            setLoading(false);
        }
    };
    const onSearch = (e) => {
        // console.log(e.target.value);
        e.preventDefault();
        setLoading(true);
        setQuery(e.target.value);
        if (e.target.value.length) {
            getChannels(e.target.value);
        }
    };

    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectMessagingChannels([]);
        }
    }, [query]);

    return (
        <div className="channel-search mb-6 relative">
            <div className="flex items-center justify-center mb-6 w-full">
                <div
                    className={`mx-auto flex items-center justify-center text-center dark:text-grey-50 font-semibold ${
                        isOpen
                            ? ""
                            : "rounded-full hover:dark:bg-grey-600 hover:bg-grey-100 cursor-pointer w-12 h-12"
                    }`}
                >
                    <SearchIcon />
                </div>
                {isOpen && (
                    <div className="w-full px-2 lg:px-6">
                        <TextField
                            type="text"
                            value={query}
                            onChange={onSearch}
                            label="Search channels"
                            variant="filled"
                            size="small"
                            className="w-full text-xs dark:bg-grey-100"
                        />
                    </div>
                )}
            </div>
            {query && (
                <Popover
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={open}
                >
                    <ResultsDropdown
                        teamChannels={teamChannels}
                        directMessagingChannels={directMessagingChannels}
                        loading={loading}
                        setQuery={setQuery}
                    />
                </Popover>
            )}
        </div>
    );
}
