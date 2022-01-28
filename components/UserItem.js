import { useState, useEffect } from "react";

import { Avatar } from "stream-chat-react";
import { FcInvite } from "react-icons/fc";
import { useStateContext } from "@/context/StateContextProvider";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
export default function UserItem({ user }) {
    // console.log("user item", user);
    const { selectedUsers, setSelectedUsers } = useStateContext();

    const [selected, setSelected] = useState(false);

    const handleSelect = (e) => {
        if (selected) {
            console.log("removed a selected");
            setSelectedUsers((prevUsers) =>
                prevUsers.filter((prevUser) => prevUser !== user.id)
            );
        } else {
            console.log("added a selected");

            setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
        }
        setSelected((prevSelected) => !prevSelected);
    };

    useEffect(() => {
        if (selectedUsers) {
            setSelected(selectedUsers.includes(user.id));
        }
    }, [selected]);
    return (
        <div className="user-item py-2" onClick={handleSelect}>
            <div className="flex items-center">
                <div className="flex items-center">
                    <div className="">
                        <Avatar
                            shape="rounded"
                            name={user.fullName || user.id}
                            size={32}
                        />
                    </div>
                    <div className="px-2">
                        <p>{user.fullName || user.id}</p>
                    </div>
                </div>

                <div className="px-6 cursor-pointer">
                    {selected ? (
                        <AddIcon color="success" />
                    ) : (
                        <PersonRemoveIcon color="error" />
                    )}
                </div>
            </div>
        </div>
    );
}
