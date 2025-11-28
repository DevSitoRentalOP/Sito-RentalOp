import { useEffect, useState } from "react";
import { Star, Heart, ArrowRight, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// AGGIUNTO nickname all'interfaccia
interface GuestyListing {
  _id: string;
  title: string;
  nickname?: string; // <--- NUOVO CAMPO
  address: { city: string };
  prices: { basePrice: number; currency: string };
  reviews: { averageOverallRating: number; count: number };
  pictures: { original: string; url?: string }[];
}

interface PropertyCard {
  id: string;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
}

export const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_URL = "/api_listings.php?action=top5";

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Errore server");

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const formattedData: PropertyCard[] = data.map((item: GuestyListing) => ({
          id: item._id,
          // MODIFICA QUI: Usa nickname se esiste, altrimenti title
          image: item.pictures?.[0]?.original || item.pictures?.[0]?.url || "/placeholder.jpg",
          title: item.nickname || item.title,
          location: item.address?.city || "Posizione non disp.",
          price: item.prices?.basePrice || 0,
          rating: item.reviews?.averageOverallRating || 0,
          reviews: item.reviews?.count || 0
        }));

        setProperties(formattedData);
      } catch (err: any) {
        console.error(err);
        setError("Impossibile caricare");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-foreground">
              I più popolari
            </h2>
            <Link to="/Apartments">
              <Button variant="ghost" className="font-montserrat text-primary hover:text-white">
                Scopri di più <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {loading && <div className="flex justify-center py-10"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property) => (
                    <Link to={`/ApartmentDetail/${property.id}`} key={property.id}>
                      <Card className="group cursor-pointer border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full">
                        <div className="relative aspect-square overflow-hidden rounded-t-lg">
                          <img
                              src={property.image}
                              alt={property.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium font-montserrat">{Number(property.rating).toFixed(1)}</span>
                          </div>
                        </div>
                        {/* ... codice precedente ... */}
                        <div className="p-4">
                          <h3 className="font-semibold text-foreground font-montserrat mb-1 line-clamp-1">{property.title}</h3>
                          <p className="text-muted-foreground text-sm font-montserrat mb-2">{property.location}</p>

                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xs text-muted-foreground font-montserrat">Da</span>
                              <span className="text-lg font-bold text-foreground font-montserrat">
                          €{property.price}
                        </span>
                              <span className="text-xs text-muted-foreground font-montserrat">
                          /notte
                        </span>
                            </div>
                            <div className="text-xs text-muted-foreground font-montserrat">
                              {property.reviews} recensioni
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                ))}
              </div>
          )}
        </div>
      </section>
  );
};