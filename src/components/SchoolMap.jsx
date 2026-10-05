import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function SchoolMap({ school, lang }) {

    // REPLACE THESE WITH YOUR SCHOOL'S ACTUAL COORDINATES
    const position = [18.88954668588286, 75.20889509023506];

    return (
        <MapContainer
            center={position}
            zoom={16}
            scrollWheelZoom={true}
            className="absolute inset-0 w-full h-full"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
                <Popup>
                    <div className="text-center">
                        <h4 className="font-bold text-slate-900 text-sm mb-1">
                            {school.name}
                        </h4>

                        <p className="text-slate-500 text-xs mb-3">
                            {lang === 'mr'
                                ? school.address
                                : school.addressEn}
                        </p>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${position[0]},${position[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold"
                        >
                            Get Directions
                        </a>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}