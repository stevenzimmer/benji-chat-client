import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { BsSearch } from "react-icons/bs";
import ResultsDropdown from "./ResultsDropdown";
export default function ChannelSearch() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directMessagingChannels, setDirectMessagingChannels] = useState([]);
    const { client, setActiveChannel } = useChatContext();

    const getChannels = async () => {
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

            const [channels, { users }] = await Promise.all({
                channelResponse,
                userResponse,
            });

            if (channels.length) {
                setTeamChannels(channels);
            }
            if (users.length) {
                setDirectMessagingChannels(users);
            }
        } catch (err) {
            setQuery("");
        }
    };
    const onSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setQuery(e.target.value);
        getChannels(e.target.value);
    };

    useEffect(() => {
        if (!query) {
            setTeamChannels([]);
            setDirectMessagingChannels([]);
        }
    }, [query]);

    return (
        <div className="channel-search">
            <div className="flex items-center">
                <div>
                    <BsSearch />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="search"
                        value={query}
                        onChange={onSearch}
                    />
                </div>
            </div>
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directMessagingChannels={directMessagingChannels}
                    loading={loading}
                    setQuery={setQuery}
                />
            )}
        </div>
    );
}
