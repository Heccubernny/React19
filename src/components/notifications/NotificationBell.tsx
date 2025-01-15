import { useNavigate } from "react-router";
import { NotificationSchema, useNotificationStore } from "../../utils/store";
import { useState, useEffect } from "react";

const NotificationBell = () => {

    const navigate = useNavigate();

    // const notificationsData = [
    //     { userId: '1', type: 'LOGIN', message: 'User logged in', read: false, timestamp: Date.now() },
    //     { userId: '1', type: 'DELETE', message: 'User deletedd', read: false, timestamp: Date.now() },
    // ];
    const { notifications, unreadCount, markAllAsRead, markAsRead } = useNotificationStore();
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ newNotification, setNewNotification ] = useState( false );


    // Check if any notification is unread for more than 2 minutes;
    const checkUnreadNotifications = () => {
        return notifications.some(
            ( notif ) => !notif.read && Date.now() - notif.timestamp < 2 * 60 * 1000
        );
    };
    console.log( unreadCount );

    // Check if all notifications are read
    const areAllNotificationsRead = () => {
        console.log( unreadCount );
        return unreadCount === 0;
    };
    const handleSeeAllClick = () => {
        navigate( '/notifications' );
        setIsModalOpen( false );
    };

    const handleBellClick = () => {
        setIsModalOpen( !isModalOpen );
    };
    const handleMarkAsRead = ( notif: NotificationSchema ) => {
        markAsRead( notif );
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead();
    };

    useEffect( () => {
        setNewNotification( true );
    }, [ notifications ] );


    // Pulse animation color for new notification
    const getDotColor = () => {
        if ( areAllNotificationsRead() ) {
            return 'bg-gray-400 animate-pulse';  // Gray if all are read
        } else if ( newNotification ) {
            return 'bg-green-500 animate-pulse';  // Green and pulse if new notification
        } else if ( checkUnreadNotifications() ) {
            return 'bg-red-500';  // Red if any unread notification is older than 2 minutes
        } else {
            return 'bg-transparent';  // No dot if no unread notifications
        }
    };

    return (
        <div className="relative">
            {/* Bell Icon */ }
            <button
                onClick={ handleBellClick }
                className="relative p-2 text-gray-800 hover:text-gray-600 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" className="w-6 h-6">
                    <path d="M12 2a7 7 0 0 0-7 7v5h-3v3h3v5a7 7 0 0 0 7 7h0a7 7 0 0 0 7-7v-5h3v-3h-3V9a7 7 0 0 0-7-7z" />
                </svg>
                {/* Notification dot */ }
                <span
                    className={ `absolute top-0 right-0 w-4 h-4 rounded-full ${ getDotColor() }` }
                />
                {/* Unread notification count (red dot) */ }
                { unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                        { unreadCount }
                    </span>
                ) }
            </button>

            {/* Notification Box Modal */ }
            { isModalOpen && (
                <div className="absolute top-14 right-0 mt-2 w-80 p-4 bg-white shadow-lg rounded-lg z-50">
                    <h3 className="text-lg font-semibold mb-4 bg-blue-500 fill-red-500">Notifications</h3>
                    <ul className="space-y-3">
                        { notifications.slice( 0, 5 ).map( ( notif, index ) => (
                            <li key={ index } className="flex justify-between items-center text-sm">
                                <span className={ notif.read ? 'text-gray-500' : 'font-bold' }>{ notif.message }</span>
                                <button
                                    onClick={ () => handleMarkAsRead( notif ) }
                                    className="ml-2 text-blue-500 text-xs"
                                >
                                    { notif.read ? 'Read' : 'Mark as Read' }
                                </button>
                            </li>
                        ) ) }
                    </ul>
                    {/* Button to see all notifications */ }
                    <div className="mt-4 text-right">
                        <button
                            onClick={ handleSeeAllClick }
                            className="text-blue-500 text-sm"
                        >
                            See All
                        </button>
                    </div>
                    <button
                        onClick={ handleMarkAllAsRead }
                        className="mt-4 text-sm text-blue-500 block w-full text-center"
                    >
                        Mark All as Read
                    </button>
                </div>
            ) }
        </div>
    );
};

export default NotificationBell;