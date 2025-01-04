import { useRef } from "react";
import MapContain from "../components/leafletmap/MapContain";
import useGeolocation from "../hooks/useGeolocation";
import leaflet from 'leaflet';
const Map1 = () => {
    // const map = useMap();
    const map = useRef<leaflet.Map | null>( null );


    const location = useGeolocation();

    const showMyLocation = () => {
        if ( location && !location.error ) {
            // if ( map ) {
            map.current = leaflet.map( "map" ).flyTo( [ location.latitude ?? 0, location.longitude ?? 0 ], 13, { animate: true } );
            // }
        } else {
            alert( location.error?.message );
        }
    };

    return (
        <>
            <MapContain />
            <button onClick={ showMyLocation }>Show my location</button>

        </>
    );
};
export default Map1;