import io from "socket.io-client";
import { NotificationSchema, useNotificationStore } from "../utils/store";
import { useEffect } from "react";

const socket = io( "http://localhost:5000" );

const useSocket = ( userId: string ) => {
    const notification = useNotificationStore();

    useEffect( () => {
        socket.emit( "join", userId );
        socket.on( "new-notification", ( data: NotificationSchema ) => {
            notification.addNotification( data );
        } );

        return () => {
            socket.off( "notification" );
            socket.disconnect();
        };
    }, [ userId, notification ] );
};

export default useSocket;