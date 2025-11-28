import { Shield, TrendingUp, Users, Calendar } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Zero stress nella gestione",
    description: "Ci occupiamo di tutto: dalla pulizia agli ospiti, dalle manutenzioni ai check-in. Tu rilassati e incassi."
  },
  {
    icon: TrendingUp,
    title: "Più visibilità, più prenotazioni",
    description: "Il tuo immobile su Airbnb, Booking.com e tutte le principali piattaforme con prezzi ottimizzati per massimizzare i guadagni."
  },
  {
    icon: Users,
    title: "Pagamenti sicuri e puntuali",
    description: "Ricevi i tuoi guadagni ogni mese, puntualmente. Gestione trasparente con report dettagliati delle performance."
  },
  {
    icon: Calendar,
    title: "Sincronizzazione automatica",
    description: "Calendario unificato su tutte le piattaforme, nessuna doppia prenotazione. Tecnologia avanzata per la gestione ottimale."
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-foreground mb-6">
            Perché scegliere RentalOp per il tuo immobile
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-3xl mx-auto">
            Affidati alla nostra esperienza e tecnologia per trasformare il tuo appartamento in una vera macchina da soldi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-montserrat text-card-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};