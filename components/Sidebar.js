import React from "react";
import Cookies from "universal-cookie";
import { FaHospitalAlt } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
const cookies = new Cookies();
export default function Sidebar() {
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
        <div className="sidebar h-full bg-blue-50 py-6">
            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 flex justify-center items-center bg-white rounded-full shadow">
                    <FaHospitalAlt />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-12 h-12 flex justify-center items-center bg-white rounded-full shadow">
                    <IoExitOutline onClick={handleClick} />
                </div>
            </div>
        </div>
    );
}
