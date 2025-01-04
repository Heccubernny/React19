import { create } from 'zustand';

type ShowAlertStore = {
    showAlert: boolean;
    toggleAsync: () => Promise<void>;
    toggle: () => void;
    setShowAlert: ( showAlert: boolean ) => void;
};

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