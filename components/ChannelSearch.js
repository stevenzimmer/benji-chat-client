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
        <div className="channel-search mb-12">
            <div className="flex items-center mb-6">
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
