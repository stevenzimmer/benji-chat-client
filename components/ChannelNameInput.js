import kebabCase from "kebab-case";
import { useStateContext } from "@/context/StateContextProvider";
export default function ChannelNameInput() {
    const { channelName, setChannelName } = useStateContext();
    const handleChange = (e) => {
        e.preventDefault();
        setChannelName(kebabCase(e.target.value));
    };

    return (
        <div className="channel-name-input">
            <div className="flex mb-4">
                <div>
                    <p>Name</p>
                </div>
                <div className="px-2">
                    <input
                        type="text"
                        value={channelName}
                        onChange={handleChange}
                        placeholder="channel-name (No spaces)"
                        className="border"
                    />
                </div>
            </div>
        </div>
    );
}
