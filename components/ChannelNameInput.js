import kebabCase from "kebab-case";
import { useStateContext } from "@/context/StateContextProvider";

import TextField from "@mui/material/TextField";
export default function ChannelNameInput() {
    const { setChannelName, channelName } = useStateContext();
    // console.log({ channelName });
    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    };

    return (
        <div className="channel-name-input__wrapper mb-12">
            <TextField
                value={channelName}
                onChange={handleChange}
                type="text"
                label="Channel name"
                variant="filled"
                size="small"
                className="w-full text-xs dark:bg-grey-100"
            />
        </div>
    );
}
