import { Button } from "@/components/ui/button";
import { useRef, useEffect } from 'react';
import { MessageCircle, Search, TrendingUp, ArrowRight, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Ci contatti",
    description:
      "Compila il form o chiamaci. Analizziamo il tuo immobile e ti proponiamo la strategia migliore per massimizzare i guadagni.",
  },
  {
    icon: Search,
    number: "02",
    title: "Valutiamo e pubblichiamo",
    description:
      "Valutiamo il potenziale del tuo immobile, creiamo annunci professionali e lo pubblichiamo su tutte le piattaforme principali.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Gestiamo tutto, tu incassi",
    description:
      "Ci occupiamo di prenotazioni, ospiti, pulizie e manutenzioni. Tu ricevi i tuoi guadagni ogni mese senza alcun pensiero.",
  },
];

export const HowItWorksSection = () => {
    const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/50 to-background">
      <div className="container mx-auto px-4">
        {/* Titolo */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-foreground mb-6">
            Come funziona con RentalOp
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Tre semplici passaggi per iniziare a guadagnare di più dal tuo immobile
          </p>
        </div>

        {/* Step */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center max-w-sm transform transition duration-300 hover:scale-105"
            >
              {/* Icona */}
              <div className="relative mb-6">
                <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mb-4 shadow-lg transition duration-300 group-hover:scale-110">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Testo */}
              <h3 className="text-xl font-semibold font-montserrat text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground font-montserrat leading-relaxed">
                {step.description}
              </p>

               {/* Freccia DESKTOP (destra) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 right-[-20px] transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                </div>
              )}

              {/* Freccia MOBILE (sotto) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-6">
                  <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={scrollToForm}
          >
            Inizia ora
          </Button>
        </div>
      </div>
    </section>
  );
};
