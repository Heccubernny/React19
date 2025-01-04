import { useEffect, useState } from "react";

type GeoLocationProps = {
    loaded: boolean;
    latitude?: number;
    longitude?: number;
    error?: GeolocationPositionError | null;
};

const useGeolocation = () => {

    const [ location, setLocation ] = useState<GeoLocationProps>( {
        loaded: false,
        latitude: 0,
        longitude: 0,
        error: null as GeolocationPositionError | null
    } );

    useEffect( () => {
        if ( !( "geolocation" in navigator ) ) {
            setLocation( ( state ) => ( {
                ...state,
                loaded: true,
                error: {
                    code: 0,
                    message: "Geolocation not supported",
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE: 2,
                    TIMEOUT: 3
                } as GeolocationPositionError,
            } ) );

            onError( {
                code: 0,
                message: "Geolocation not supported",
                PERMISSION_DENIED: 1,
                POSITION_UNAVAILABLE: 2,
                TIMEOUT: 3
            } );
        }

        const geo = navigator.geolocation;

        const watcher = geo.watchPosition( onSuccess, onError );

        return () => geo.clearWatch( watcher );
    }, [] );

    const onSuccess = ( location: GeolocationPosition ) => {
        setLocation( {
            loaded: true,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        } );
    };

    const onError = ( error: GeolocationPositionError ) => {
        setLocation( {
            loaded: true,
            error,
        } );
    };

    navigator.geolocation.getCurrentPosition( onSuccess, onError );

    return location;

};
export default useGeolocation;