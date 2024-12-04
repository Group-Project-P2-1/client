import React from "react";
import { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const useRoom = () => {
    return useContext(RoomContext)
};

export const RoomProvider = ({children}) => {
    const [roomId, setRoomId] = useState(null);

    return (
        <RoomContext.Provider value={{roomId, setRoomId}}>
        {children}
        </RoomContext.Provider>
    )
}