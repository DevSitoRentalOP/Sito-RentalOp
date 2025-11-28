import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- FIX PER LE ICONE DI LEAFLET (Bug noto di React) ---
// Senza questo pezzo, i pin della mappa non appaiono o sono rotti.
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;
// -------------------------------------------------------

interface Apartment {
    id: string;
    title: string;
    price: number;
    image: string;
    lat: number;
    lng: number;
}

interface ApartmentMapProps {
    apartments: Apartment[];
}

// Componente invisibile che sposta la telecamera della mappa
const MapUpdater = ({ apartments }: { apartments: Apartment[] }) => {
    const map = useMap();

    useEffect(() => {
        if (apartments.length > 0) {
            // Calcola i confini (il rettangolo che contiene tutti i pin)
            const bounds = L.latLngBounds(apartments.map((a) => [a.lat, a.lng]));
            // Sposta la mappa lì con un po' di margine (padding)
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        }
    }, [apartments, map]);

    return null;
};

export const ApartmentMap = ({ apartments }: ApartmentMapProps) => {
    // Mostriamo solo case che hanno coordinate valide (diverse da 0,0)
    const validApartments = apartments.filter((a) => a.lat && a.lng && (a.lat !== 0 || a.lng !== 0));

    // Centro di default (Italia) se non ci sono risultati
    const defaultCenter: [number, number] = [41.8719, 12.5674];

    return (
        <div className="h-full w-full rounded-xl overflow-hidden border border-border/50 shadow-inner z-0 isolate">
            <MapContainer
                center={defaultCenter}
                zoom={6}
                scrollWheelZoom={false} // Evita che la pagina scorra mentre si scrolla la mappa
                className="h-full w-full"
                style={{ height: "100%", minHeight: "400px", width: "100%" }}
            >
                {/* Skin della mappa (OpenStreetMap Standard) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Auto-Zoom */}
                <MapUpdater apartments={validApartments} />

                {/* Disegna i Pin */}
                {validApartments.map((apt) => (
                    <Marker key={apt.id} position={[apt.lat, apt.lng]}>
                        <Popup className="font-montserrat">
                            <div className="w-48">
                                <div className="aspect-video overflow-hidden rounded-md mb-2">
                                    <img
                                        src={apt.image}
                                        alt={apt.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-bold text-sm line-clamp-1 mb-1">{apt.title}</h3>
                                <p className="text-primary font-bold text-base mb-2">
                                    €{apt.price}<span className="text-xs text-muted-foreground font-normal">/notte</span>
                                </p>
                                <Link to={`/ApartmentDetail/${apt.id}`}>
                                    <Button size="sm" className="w-full h-8 text-xs">Vedi Dettagli</Button>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};