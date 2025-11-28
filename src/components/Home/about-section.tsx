import { TrendingUp, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"


const stats = [
  {
    icon: TrendingUp,
    number: "25+",
    label: "Immobili gestiti"
  },
  {
    icon: Users,
    number: "3000+",
    label: "Ospiti soddisfatti"
  },
  {
    icon: Award,
    number: "4.8/5",
    label: "Valutazione media"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Supporto continuo"
  }
];

export const AboutSection = () => {
  return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-3xl text-center md:text-4xl md:text-start font-bold font-montserrat text-foreground mb-6">
                La piattaforma leader per affitti brevi di qualità
              </h2>
              <p className="text-lg text-center md:text-start text-muted-foreground font-montserrat mb-6 leading-relaxed">
                RentalOp è nata dalla passione per l'ospitalità e dalla volontà di offrire
                un servizio di eccellenza sia ai proprietari che agli ospiti. La nostra missione
                è trasformare ogni soggiorno in un'esperienza memorabile.
              </p>
              <p className="text-lg text-center md:text-start text-muted-foreground font-montserrat mb-8 leading-relaxed">
                Con anni di esperienza nel settore immobiliare e turistico, abbiamo sviluppato
                un approccio innovativo che combina tecnologia avanzata e servizio personalizzato
                per garantire risultati eccellenti.
              </p>

              <div className="flex gap-4">
                <Link to="/Proprietari">
                  <Button type="button" size="lg" className="font-montserrat">
                    Affida il tuo immobile
                  </Button>
                </Link>

              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                  <div
                      key={index}
                      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group hover:-translate-y-1"
                  >
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold font-montserrat text-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-montserrat text-sm">
                      {stat.label}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};