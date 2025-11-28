import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

interface ApartmentCardProps {
  apartment: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    calculatedTotal?: number;
  };
}

export const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  const [searchParams] = useSearchParams();
  const detailLink = `/ApartmentDetail/${apartment.id}?${searchParams.toString()}`;

  return (
      <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-300 bg-card h-full flex flex-col md:flex-row">
        <div className="md:w-80 md:flex-shrink-0 relative">
          <img src={apartment.image} alt={apartment.title} loading="lazy" className="h-48 w-full md:h-full object-cover" />
        </div>
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground font-heading mb-2 line-clamp-2">{apartment.title}</h3>
            <div className="flex items-center text-muted-foreground mb-4"><MapPin className="w-4 h-4 mr-2 flex-shrink-0" /><span className="text-sm line-clamp-1">{apartment.location}</span></div>
            <div className="flex items-center mb-4"><Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /><span className="text-sm font-medium text-foreground mr-2">{Number(apartment.rating).toFixed(1)}</span><span className="text-sm text-muted-foreground">({apartment.reviews} recensioni)</span></div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
            <div>
              {apartment.calculatedTotal ? (
                  <div className="flex flex-col"><span className="text-xs text-muted-foreground font-montserrat mb-0.5">Totale soggiorno</span><span className="text-2xl font-bold text-primary font-montserrat">€{apartment.calculatedTotal}</span></div>
              ) : (
                  <div className="flex items-baseline gap-1"><span className="text-xs text-muted-foreground font-montserrat">Da</span><span className="text-2xl font-bold text-primary font-montserrat">€{apartment.price}</span><span className="text-muted-foreground text-sm ml-0.5 font-montserrat">/notte</span></div>
              )}
            </div>
            <Link to={detailLink}><Button>Dettagli</Button></Link>
          </div>
        </CardContent>
      </Card>
  );
};