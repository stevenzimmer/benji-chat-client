import { useState } from "react";
import { useStateContext } from "@/context/StateContextProvider";
import ChannelListContent from "@/components/ChannelListContent";
export default function ChannelListContainer() {
    const {
        setCreateType,
        setIsCreating,
        setIsEditing,
        toggleContainer,
        setToggleContainer,
    } = useStateContext();
    return (
        <>
            <div className="channel-list-container hidden lg:block">
                <ChannelListContent />
            </div>
            <div
                className={`channel-list-container-mobile lg:hidden bg-grey-100 ${
                    toggleContainer ? "left-0" : "-left-3/4"
                }`}
                
            >
                <div className={} onClick={(e) => setToggleContainer((prevToggle) => !prevToggle)}></div>
                <ChannelListContent />
            </div>
        </>
    );
}
