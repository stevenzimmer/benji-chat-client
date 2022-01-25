import { useEffect, useState } from "react";

// import { Avatar, useChatChannel } from "stream-chat-react";

import UserListContainer from "./UserListContainer";

import { useChatContext } from "stream-chat-react";
import UserItem from "./UserItem";
// import { useStateContext } from "@/context/StateContextProvider";

export default function UserList() {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [listEmpty, setListEmpty] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (isLoading) return;

            setIsLoading(true);

            try {
                const response = await client.queryUsers(
                    {
                        id: { $ne: client.userID },
                    },
                    { id: 1 },
                    { limit: 8 }
                );

                if (response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            } catch (err) {
                console.log(err);
                setError(true);
            }

            setIsLoading(false);
        };

        if (client) {
            getUsers();
        }
    }, []);

    if (error) {
        return (
            <UserListContainer>
                <div>There has been an error</div>
            </UserListContainer>
        );
    }
    if (listEmpty) {
        return (
            <UserListContainer>
                <div>The user list is empty</div>
            </UserListContainer>
        );
    }
    // console.log("User list", users);
    return (
        <div className="user-list">
            <UserListContainer>
                {isLoading && <div>Loading users...</div>}
                {users?.map((user, i) => (
                    <UserItem key={i} user={user} />
                ))}
            </UserListContainer>
        </div>
    );
}
