import { useState, useEffect } from "react";

import { Avatar } from "stream-chat-react";
import { FcInvite } from "react-icons/fc";
import { useStateContext } from "@/context/StateContextProvider";
export default function UserItem({ user }) {
    // console.log("user item", user);
    const { selectedUsers, setSelectedUsers } = useStateContext();
    // console.log("user item selected users", selectedUsers);

    const [selected, setSelected] = useState(false);
    const [notSelected, setNotSelected] = useState([]);

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
        console.log({ selectedUsers });
        if (selectedUsers) {
            setSelected(selectedUsers.includes(user.id));
        }
    }, [selected]);
    return (
        <div className="user-item py-2" onClick={handleSelect}>
            <div className="flex items-center">
                <div>
                    <Avatar name={user.fullName || user.id} size={32} />
                </div>
                <div>
                    <p>{user.fullName || user.id}</p>
                </div>
                <div className="px-2">
                    {selected ? (
                        <FcInvite />
                    ) : (
                        <div className="w-4 h-4 rounded-full border"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
