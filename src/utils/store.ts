import { create } from 'zustand';

type ShowAlertStore = {
    showAlert: boolean;
    toggleAsync: () => Promise<void>;
    toggle: () => void;
    setShowAlert: ( showAlert: boolean ) => void;
};

// notification Schema
// userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true; },
// type: { type: String, required: true; }, // event type, e.g., 'LOGIN', 'DELETE', 'MESSAGE'
// message: { type: String, required: true; }, // the actual notification message
// read: { type: Boolean, default: false; },
// timestamp: { type: Date, default: Date.now; },

export type NotificationSchema = {
    userId: string;
    type: string;
    message: string;
    read: boolean;
    timestamp: number;
};

const notifications = [
    { userId: '1', type: 'LOGIN', message: 'User logged in', read: false, timestamp: Date.now() },
    { userId: '1', type: 'DELETE', message: 'User deletedd', read: false, timestamp: Date.now() },
];

type NotificationStore = {
    notifications: NotificationSchema[];
    unreadCount: number;
    markAsRead: ( notification: NotificationSchema ) => void;
    addNotification: ( notification: NotificationSchema ) => void;
    removeNotification: ( notification: NotificationSchema ) => void;
    markAllAsRead: () => void;
};

export const useNotificationStore = create<NotificationStore>( ( set, get ) => {
    return {
        notifications: notifications,
        unreadCount: 0,
        markAsRead: ( notification ) => {
            set( state => {
                const index = state.notifications.findIndex( n => n.message === notification.message );
                state.notifications[ index ].read = true;
                return { notifications: state.notifications };
            } );
        },

        addNotification: ( notification: NotificationSchema ) => {

            set( state => ( {
                notifications: [ ...state.notifications, notification ]

            } ) );
        }
        ,
        removeNotification: ( notification ) => {
            set( state => ( { notifications: state.notifications.filter( n => n.message !== notification.message ) } ) );
        },
        markAllAsRead: () => {
            set( state => {
                state.notifications.forEach( n => ( n.read = true ) );
                return { notifications: state.notifications };
            } );
        }
    };
} );

export const useShowAlertStore = create<ShowAlertStore>( ( set, get ) => {
    return {
        showAlert: !navigator.onLine,
        // toggle: () => {
        //     set( { showAlert: !get().showAlert } );
        // },
        toggleAsync: async () => {
            await new Promise( resolve => setTimeout( resolve, 5000 ) );
            set( state => ( { showAlert: !state.showAlert } ) );
        },
        toggle: () => {
            set( state => ( { showAlert: !state.showAlert } ) );
        },
        setShowAlert: ( showAlert ) => {
            set( { showAlert } );
        },


    };
} );

type NetworkStatusStore = {
    isOnline: boolean;
    setIsOnline: ( isOnline: boolean ) => void;
};

export const useNetworkStatusStore = create<NetworkStatusStore>( () => {
    return {
        isOnline: navigator.onLine,
        setIsOnline: () => null,
    };
} );


type User = {
    id: number;
    name: string;
};

type GetUsersFilters = {
    limit: number;
    page: number;
};

export async function getUsers( filters?: GetUsersFilters ) {
    await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );
    return [ { id: 1, name: 'Dayoh' } ] as User[];
}