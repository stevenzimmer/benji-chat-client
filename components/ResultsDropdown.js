import { useChatContext } from "stream-chat-react";
import SearchResult from "./SearchResult";
export default function ResultsDropdown({
    focusedId,
    teamChannels,
    directMessagingChannels,
    loading,
    setQuery,
}) {
    const { setActiveChannel } = useChatContext();
    const setChannel = (channel) => {
        setQuery("");
        setActiveChannel(channel);
    };
    return (
        <div className="results-dropwdown">
            <p>Channels</p>
            {loading && !teamChannels.length && <p>Loading Channels...</p>}
            {!loading && !teamChannels.length ? (
                <p>No Channels found...</p>
            ) : (
                teamChannels?.map((channel, i) => (
                    <SearchResult
                        channel={channel}
                        focusedId={focusedId}
                        key={i}
                        setChannel={setChannel}
                        type="channel"
                    />
                ))
            )}

            <p>Users</p>
            {loading && !directMessagingChannels.length && (
                <p>Loading Users...</p>
            )}
            {!loading && !directMessagingChannels.length ? (
                <p>No Direct messages found...</p>
            ) : (
                directMessagingChannels?.map((channel, i) => (
                    <SearchResult
                        channel={channel}
                        focusedId={focusedId}
                        key={i}
                        setChannel={setChannel}
                        type="user"
                    />
                ))
            )}
        </div>
    );
}
