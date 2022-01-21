import { useEffect, useState } from "react";

import { Avatar, useChatContext } from "stream-chat-react";

export default function UserListContainer({ children }) {
    return (
        <div className="user-list-container">
            <div className="flex">
                <div>
                    {" "}
                    <p>User</p>
                </div>
                <div className="px-2">
                    <p>Invite</p>
                </div>
            </div>
            {children}
        </div>
    );
}
