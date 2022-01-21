import React from "react";
import Cookies from "universal-cookie";
import { FaHospitalAlt } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

export default function Sidebar() {
    const cookies = new Cookies();
    const handleClick = (e) => {
        cookies.remove("token");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("userId");

        cookies.remove("phoneNumber");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");

        window.location.reload();
    };
    return (
        <div className="sidebar">
            <FaHospitalAlt />
            <IoExitOutline onClick={handleClick} />
        </div>
    );
}
