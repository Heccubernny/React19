import { MapContainer, Marker, Popup, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapContain.css";
import { Icon } from "leaflet";
import { gps } from "../../assets";
import { useGeolocation } from "@uidotdev/usehooks";
const MapContain = () => {

    const markers = [
        {
            geocode: [ 55.5192, 23.2128 ] as [ number, number ],
            popUp: "Kaunas",
        },
        {
            geocode: [ 55.4978, 23.394 ] as [ number, number ],
            popUp: "Londonff",
        },
        {
            geocode: [ 55.5178, 23.394 ] as [ number, number ],
            popUp: "Stop here",
        },
    ];

    // const mapRef = useRef<typeof MapContainer>( null );



    const location = useGeolocation();


    const customIcon = new Icon( {
        iconUrl: gps || "https://cdn-icons-png.flaticon.com/512/1828/1828665.png",
        iconSize: [ 80, 80 ],
    } );





    // const createCustomClusterIcon = ( cluster: { getChildCount: () => number; } ) => {
    //     return new DivIcon( {
    //         html: `<span class="cluster-icon">${ cluster.getChildCount() }</span>`,
    //         className: "marker-cluster-custom",
    //         iconSize: point( 40, 40, true ),
    //     } );
    // };

    // console.log( location );


    return (
        <div className="map-container">

            <MapContainer center={ [
                8.124097707907284, 5.08703026750295 ] } zoom={ 13 }>
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'> OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />
                {/* <TileLayer attribution="Stamen Watercolor"
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            /> */}

                { location && !location.error && <CircleMarker center={ [ location.latitude ?? 0, location.longitude ?? 0 ] } pathOptions={ { color: "blue" } } radius={ 100 }> <Marker position={ [ location.latitude ?? 0, location.longitude ?? 0 ] } icon={ customIcon }> </Marker></CircleMarker> }
                { markers.map( ( marker ) => (
                    <CircleMarker center={ marker.geocode } key={ marker.popUp } pathOptions={ { color: "blue" } } radius={ 100 }>

                        <Marker position={ marker.geocode } key={ marker.popUp } icon={ customIcon }>
                            <Popup>
                                <h4 style={ { color: "red" } }>Current location is: { marker.popUp }</h4>
                            </Popup>
                        </Marker>
                    </CircleMarker>

                ) )
                }

            </MapContainer >
        </div>


    );
};
export default MapContain;