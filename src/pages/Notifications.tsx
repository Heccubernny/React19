import NotificationBell from '../components/notifications/NotificationBell';
import { NotificationSchema, useNotificationStore } from '../utils/store';

const Notifications = () => {
    const { notifications, markAsRead } = useNotificationStore();

    const handleMarkAsRead = ( notification: NotificationSchema ) => {
        markAsRead( notification );
    };

    return (
        <div className="p-6">
            <NotificationBell />
            <h1 className="text-2xl font-semibold mb-4">All Notifications</h1>
            <ul>
                { notifications.map( ( notif, index ) => (
                    <li key={ index } className="py-3 border-b">
                        <span>{ notif.message }</span>
                        { !notif.read && (
                            <button onClick={ () => handleMarkAsRead( notif ) } className="ml-2 text-blue-500">Mark as Read</button>
                        ) }
                    </li>
                ) ) }
            </ul>
        </div>
    );
};

export default Notifications;
