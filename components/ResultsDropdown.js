import { useChatContext } from "stream-chat-react";
import SearchResult from "./SearchResult";
import Skeleton from "@mui/material/Skeleton";
import TagIcon from "@mui/icons-material/Tag";
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
        <div className="results-dropwdown px-6">
            <p>Channels</p>
            {loading && !teamChannels.length && (
                <div className="flex">
                    <div className="w-12">
                        <TagIcon />
                    </div>
                    <div className="w-full px-2">
                        <Skeleton variant="text" />
                    </div>
                </div>
            )}
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
                <div className="flex items-center">
                    <div>
                        <Skeleton
                            variant="rectangular"
                            className="rounded-lg"
                            width={24}
                            height={24}
                        />
                    </div>
                    <div className="w-full px-2">
                        <Skeleton variant="text" />
                    </div>
                </div>
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
