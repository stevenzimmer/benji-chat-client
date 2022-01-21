import { useState, useEffect } from "react";

import { Avatar } from "stream-chat-react";
import { FcInvite } from "react-icons/fc";
import { useStateContext } from "@/context/StateContextProvider";
export default function UserItem({ user }) {
    const { selectedUsers, setSelectedUsers } = useStateContext();

    const [selected, setSelected] = useState(false);

    const handleSelect = (e) => {
        if (selected) {
            setSelectedUsers((prevUsers) =>
                prevUsers.filter((prevUser) => prevUser !== user.id)
            );
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
        }
        setSelected((prevSelected) => !prevSelected);
    };

    useEffect(() => {
        setSelectedUsers([user.id]);
    }, []);
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
