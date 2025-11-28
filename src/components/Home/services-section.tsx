import { Shield, Globe, Wrench, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Shield,
    title: "Gestione completa dell'immobile",
    description: "Ci occupiamo di tutto: dalle prenotazioni alle pulizie, dalla manutenzione ai rapporti con gli ospiti. Tu ti rilassi e incassi."
  },
  {
    icon: Globe,
    title: "Promozione e visibilità online",
    description: "Il tuo immobile su tutte le principali piattaforme con prezzi ottimizzati e foto professionali per massimizzare le prenotazioni."
  },
  {
    icon: Wrench,
    title: "Manutenzione e cura dell'appartamento",
    description: "Interventi tempestivi, controlli periodici e cura costante per mantenere il tuo immobile sempre in perfette condizioni."
  },
  {
    icon: Headphones,
    title: "Assistenza h24 agli ospiti",
    description: "Supporto continuo agli ospiti per ogni necessità, garantendo un'esperienza di soggiorno impeccabile e recensioni positive."
  }
];

export const ServicesSection = () => {
  return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-foreground mb-4">
              I nostri servizi
            </h2>
            <p className="text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto">
              Soluzioni complete per proprietari e ospiti, con la qualità e professionalità che ci contraddistingue
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
                <Card
                    key={index}
                    className="group cursor-pointer hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-0 shadow-card"
                >
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold font-montserrat text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground font-montserrat text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
  );
};