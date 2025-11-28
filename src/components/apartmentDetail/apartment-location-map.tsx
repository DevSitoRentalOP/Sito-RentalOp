import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ApartmentLocationMapProps {
    lat: number;
    lng: number;
    address: string;
}

export const ApartmentLocationMap = ({ lat, lng, address }: ApartmentLocationMapProps) => {
    // Se non ci sono coordinate valide, nascondi tutto
    if (!lat || !lng) return null;

    const centerPosition: [number, number] = [lat, lng];

    // --- MODIFICA COLORE QUI ---
    // Opzioni di stile per il cerchio (Azzurro/Ciano)
    const circleOptions = {
        color: '#0EA5E9',       // Colore bordo (Azzurro brillante)
        fillColor: '#0EA5E9',   // Colore riempimento
        fillOpacity: 0.3,       // Trasparenza riempimento (0.3 = 30%)
        weight: 2               // Spessore bordo
    };
    // ---------------------------

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground font-heading">
                Dove ti troverai
            </h2>

            {/* Contenitore Mappa */}
            <div className="h-[400px] w-full rounded-xl overflow-hidden border border-border/50 shadow-md z-0 relative isolate">
                <MapContainer
                    center={centerPosition}
                    zoom={15}
                    scrollWheelZoom={false} // Evita lo zoom accidentale con la rotella
                    className="h-full w-full"
                    dragging={true} // Permette di spostarsi nella mappa
                >
                    {/* STILE OPENSTREETMAP (Classico) */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* CERCHIO DELLA ZONA AZZURRO */}
                    {/* radius è in metri. 150m è una buona dimensione per una "zona" approssimativa */}
                    <Circle
                        center={centerPosition}
                        radius={150}
                        pathOptions={circleOptions}
                    >
                        <Popup className="font-montserrat font-medium text-sm">
                            Posizione approssimativa: <br/> {address}
                        </Popup>
                    </Circle>

                </MapContainer>
            </div>
        </div>
    );
};