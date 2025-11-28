import { MapPin } from "lucide-react";

interface ApartmentHeroProps {
  title: string;
  location: string;
  description: string;
}

export const ApartmentHero = ({ title, location, description }: ApartmentHeroProps) => {
  return (
      <div className="relative">
        <div className="space-y-4">
          <div>
            {/* Titolo con break-words per evitare che parole lunghe rompano il layout su mobile */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-3 break-words">
              {title}
            </h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-lg">{location}</span>
            </div>
          </div>

          {/* whitespace-pre-line permette di mantenere gli 'a capo' della descrizione originale */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
  );
};