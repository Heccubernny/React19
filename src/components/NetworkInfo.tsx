import { Icon } from "@iconify/react";
import styled from "styled-components";
import { useEffect, useDebugValue, useSyncExternalStore } from "react";
import { useShowAlertStore } from "../utils/store";

const useNetworkStatus = () => {
    const isOnline = useSyncExternalStore( subscribe, () => navigator.onLine, () => true );

    useDebugValue( isOnline ? "Online" : "Offline" );

    function subscribe( updateNetworkStatus: () => void ) {
        window.addEventListener( 'online', updateNetworkStatus );
        window.addEventListener( 'offline', updateNetworkStatus );

        return () => {
            window.removeEventListener( 'online', updateNetworkStatus );
            window.removeEventListener( 'offline', updateNetworkStatus );
        };
    }

    return isOnline;
};

const logAlert = () => {
    const alert = useShowAlertStore.getState().showAlert;
    console.log( "Alert has been toggled. Current state: ", alert );
};

const setAlert = () => {
    useShowAlertStore.getState().setShowAlert( true );
};

export const NetworkInfo = () => {
    const isOnline = useNetworkStatus();
    // const [ showAlert, setShowAlert ] = useState( !navigator.onLine );
    const showAlert = useShowAlertStore( state => state.showAlert );
    const setShowAlert = useShowAlertStore( state => state.setShowAlert );

    const toggle = useShowAlertStore( state => state.toggle );
    const toggleAsync = useShowAlertStore( state => state.toggleAsync );

    useDebugValue( isOnline ? "Online" : "Offline" );

    useEffect( () => {
        logAlert();
        setAlert();
    }, [ showAlert ] );


    useEffect( () => {
        if ( isOnline ) {
            const timer = setTimeout( () => {
                setShowAlert( false );
            }, 10000 );
            return () => clearTimeout( timer );
        } else {
            setShowAlert( true );
        }
    }, [ isOnline ] );

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleClose = () => {
        setShowAlert( false );
    };

    return (
        <div>
            { <p>{ isOnline ? "Online" : "Offline" }</p> }
            { toggle && <button onClick={ toggle }>Toggle Alert</button> }
            { toggleAsync && <button onClick={ toggleAsync }>Toggle Async Alert</button> }

            { showAlert && (
                <AlertBox style={ { backgroundColor: isOnline ? "green" : "red", color: "white", borderColor: isOnline ? "green" : "red" } }>
                    <div style={ { display: "flex", alignItems: "center", gap: "10px" } }>
                        <Icon icon={ isOnline ? "svg-spinners:wifi-fade" : "mynaui:wifi-x" } width={ 20 } height={ 20 } color={ "white" } />
                        <AlertText>{ isOnline ? "✅ You are currently online." : "❎ You are currently offline." }</AlertText>
                        { isOnline ? (
                            <Icon icon={ "carbon:close-filled" } width={ 20 } height={ 20 } color={ "white" } onClick={ handleClose } />
                        ) : (
                            <button onClick={ handleRefresh }>Refresh</button>
                        ) }
                    </div>
                </AlertBox>
            ) }
        </div>
    );
};

const AlertBox = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    display: flex;
    align-items: center;
`;

const AlertText = styled.span`
    margin-right: 10px;
    font-weight: bold;
    text-align: center;
    color: rgb(233, 227, 233);
`;