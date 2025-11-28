import { useEffect, useState } from "react";
import { MapPin, Building2 } from "lucide-react"; // Aggiunta icona Building
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CityData {
  name: string;
  count: number;
}

export const LocationsSection = () => {
  const [locations, setLocations] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chiede al PHP di contare le case per città
    const API_URL = "/api_listings.php?action=cities";

    const fetchCities = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) return;

        const data = await response.json();
        if (data.error || !data) return;

        // Convertiamo i dati JSON {"Novara": 15} in array
        const locationsArray = Object.entries(data)
            .map(([name, count]) => ({
              name,
              count: Number(count) // Questo è il NUMERO REALE
            }))
            .slice(0, 6); // Mostriamo max 6 città

        setLocations(locationsArray);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCityImageName = (cityName: string) => {
    if (!cityName) return "";
    const cleanName = cityName.trim().toLowerCase().replace(/\s+/g, '');
    return `/${cleanName}.webp`;
  };

  if (loading) return null;
  if (locations.length === 0) return null;

  return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-start mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-foreground mb-4">
              Scegli per località
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {locations.map((loc, index) => {
              const imagePath = getCityImageName(loc.name);
              // Nasconde il 6° elemento su Desktop per mantenere la riga da 5 pulita
              const hideClass = index === 5 ? "block lg:hidden" : "block";

              return (
                  <Link
                      key={loc.name}
                      to={`/Apartments?city=${loc.name}`}
                      className={hideClass}
                  >
                    <Card
                        className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0 shadow-card overflow-hidden h-full relative"
                    >
                      <div className="relative aspect-square overflow-hidden">

                        {/* Immagine Città */}
                        <img
                            src={imagePath}
                            alt={loc.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            // Se manca la foto, usa placeholder
                            onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                        />

                        {/* Sfumatura scura per leggere meglio il testo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">

                          {/* Nome Città */}
                          <div className="flex items-center mb-1.5">
                            <MapPin className="w-4 h-4 mr-1.5 text-primary-foreground" />
                            <h3 className="font-bold font-montserrat text-lg tracking-wide">
                              {loc.name}
                            </h3>
                          </div>

                          {/* Conteggio Reale */}
                          <div className="flex items-center text-white/90 text-xs font-montserrat font-medium bg-black/30 w-fit px-2 py-1 rounded-md backdrop-blur-sm">
                            <Building2 className="w-3 h-3 mr-1.5" />
                            {loc.count} {loc.count === 1 ? 'alloggio' : 'alloggi'}
                          </div>

                        </div>
                      </div>
                    </Card>
                  </Link>
              );
            })}
          </div>
        </div>
      </section>
  );
};