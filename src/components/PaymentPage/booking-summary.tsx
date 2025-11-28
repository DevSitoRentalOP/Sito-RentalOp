import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Info } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface BookingSummaryProps {
  info: {
    title: string;
    location: string;
    image: string;
  };
  booking: {
    checkIn: Date;
    checkOut: Date;
    guests: string;
    totalPrice: number;
    nights: number;
    cleaningFee: number;
    pricePerNight: number; // Prezzo base indicativo
    planName?: string; // Nome piano tariffario scelto
  };
}

export const BookingSummary = ({ info, booking }: BookingSummaryProps) => {

  // Calcoliamo il costo del soggiorno puro (Totale - Pulizie)
  const stayCost = booking.totalPrice - booking.cleaningFee;

  return (
      <Card className="bg-card shadow-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Riepilogo prenotazione</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Apartment Info */}
          <div className="flex gap-4">
            <img
                src={info.image}
                alt={info.title}
                className="w-24 h-20 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                {info.title}
              </h3>
              <p className="text-muted-foreground text-xs">
                {info.location}
              </p>
              {booking.planName && (
                  <span className="inline-block mt-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {booking.planName}
                </span>
              )}
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-sm text-foreground">Date</span>
              </div>
              <span className="text-sm font-medium text-foreground">
              {format(new Date(booking.checkIn), "dd MMM", { locale: it })} - {format(new Date(booking.checkOut), "dd MMM yyyy", { locale: it })}
            </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-muted-foreground mr-2" />
                <span className="text-sm text-foreground">Ospiti</span>
              </div>
              <span className="text-sm font-medium text-foreground">
              {booking.guests} {parseInt(booking.guests) === 1 ? 'ospite' : 'ospiti'}
            </span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Soggiorno x {booking.nights} notti
            </span>
              <span className="text-sm text-foreground font-medium">
              €{stayCost.toFixed(2)}
            </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                Pulizia finale <Info className="w-3 h-3 ml-1 opacity-50"/>
              </div>
              <span className="text-sm text-foreground font-medium">€{booking.cleaningFee}</span>
            </div>

            {/* Costi servizio finti per ora o inclusi */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tasse e servizi</span>
              <span className="text-sm text-green-600 font-medium">Inclusi</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t border-border font-bold">
            <span className="text-lg text-foreground">Totale da pagare</span>
            <span className="text-2xl text-primary">€{booking.totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
  );
};