import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const MapPlaceholder = () => {
  return (
    <Card className="h-full bg-card">
      <div className="h-full flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg">
        <MapPin className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Mappa Interattiva
        </h3>
        <p className="text-muted-foreground text-center text-sm">
          Qui verrà integrata la mappa di Google Maps che mostrerà la posizione di tutti gli appartamenti disponibili
        </p>
        <div className="mt-4 p-3 bg-primary/10 rounded-md">
          <p className="text-xs text-primary font-medium">
            Integrazione Google Maps API in preparazione
          </p>
        </div>
      </div>
    </Card>
  );
};