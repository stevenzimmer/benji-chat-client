import { useState, createContext } from "react";

import {
    MessageList,
    MessageInput,
    Thread,
    Window,
    useChannelActionContext,
    Avatar,
    useChannelStateContext,
    useChatContext,
} from "stream-chat-react";
import TeamChannelHeader from "./TeamChannelHeader";

export const GiphyContext = createContext();

export default function ChannelInner() {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();

    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent_id,
            parent: message.parent,
            text: message.text,
        };

        if (giphyState) {
            updatedMessage = {
                ...updatedMessage,
                text: `/giphy ${message.text}`,
            };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div className="flex w-full ">
                <Window>
                    <TeamChannelHeader />
                    <MessageList />
                    <MessageInput
                        overrideSubmitHandler={overrideSubmitHandler}
                    />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    );
}
