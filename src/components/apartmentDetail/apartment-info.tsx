import { Users, Bed, Bath } from "lucide-react";

interface ApartmentInfoProps {
  apartment: {
    detailedDescription: string; // Usiamo la descrizione lunga qui
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
  };
}

export const ApartmentInfo = ({ apartment }: ApartmentInfoProps) => {
  return (
      <div className="space-y-6">

        {/* Statistiche Rapide */}
        <div className="flex flex-wrap gap-6 py-6 border-y border-border">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium">Fino a {apartment.maxGuests} ospiti</span>
          </div>
          <div className="flex items-center">
            <Bed className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium">{apartment.bedrooms} camere</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium">{apartment.bathrooms} bagni</span>
          </div>
        </div>

        {/* Descrizione Completa */}
        <div>
          <h2 className="text-xl font-semibold text-foreground font-heading mb-4">
            Descrizione
          </h2>
          {/* whitespace-pre-line mantiene la formattazione dei paragrafi di Guesty */}
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
            {apartment.detailedDescription || "Nessuna descrizione dettagliata disponibile."}
          </p>
        </div>
      </div>
  );
};