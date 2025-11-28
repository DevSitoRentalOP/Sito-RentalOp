import { Icon, LucideProps } from "lucide-react";
import * as Icons from "lucide-react";

interface AmenityProps {
    name: string;
    icon: string;
}

interface ApartmentAmenitiesProps {
    amenities: AmenityProps[];
}

// Funzione Helper per mappare le stringhe di Guesty alle icone Lucide
// Se Guesty dice "Wireless Internet", noi restituiamo l'icona "Wifi"
export const getIconForAmenity = (amenityName: string): string => {
    const lowerName = amenityName.toLowerCase();

    if (lowerName.includes("wifi") || lowerName.includes("internet")) return "Wifi";
    if (lowerName.includes("air") || lowerName.includes("condiz")) return "Snowflake";
    if (lowerName.includes("tv") || lowerName.includes("tele")) return "Tv";
    if (lowerName.includes("kitchen") || lowerName.includes("cucina")) return "ChefHat";
    if (lowerName.includes("wash") || lowerName.includes("lavatrice")) return "WashingMachine";
    if (lowerName.includes("heat") || lowerName.includes("riscaldamento")) return "Thermometer";
    if (lowerName.includes("hair") || lowerName.includes("asciuga")) return "Wind";
    if (lowerName.includes("iron") || lowerName.includes("ferro")) return "Shirt";
    if (lowerName.includes("park") || lowerName.includes("parcheggio")) return "Car";
    if (lowerName.includes("pool") || lowerName.includes("piscina")) return "Waves";
    if (lowerName.includes("work") || lowerName.includes("lavoro")) return "Briefcase";

    return "Check"; // Icona di default se non troviamo corrispondenze
};

export const ApartmentAmenities = ({ amenities }: ApartmentAmenitiesProps) => {
    const getIconComponent = (iconName: string) => {
        // @ts-ignore
        const IconComponent = Icons[iconName];
        return IconComponent || Icons.Check;
    };

    // Se non ci sono servizi, non mostrare nulla
    if (!amenities || amenities.length === 0) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold text-foreground font-heading mb-4">
                Servizi inclusi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => {
                    const IconComponent = getIconComponent(amenity.icon);
                    return (
                        <div key={index} className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5 text-primary" />
                            <span className="text-sm text-foreground">{amenity.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};