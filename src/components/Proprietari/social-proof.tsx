import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco R.",
    location: "Milano",
    text: "Da quando ho affidato il mio bilocale a RentalOp, i miei guadagni sono aumentati del 40%. Zero stress, tutto gestito alla perfezione.",
    rating: 5
  },
  {
    name: "Giulia S.",
    location: "Roma",
    text: "Professionali e affidabili. Il mio appartamento è sempre pieno e ricevo i pagamenti puntualmente ogni mese. Consigliatissimi!",
    rating: 5
  },
  {
    name: "Alessandro T.",
    location: "Firenze",
    text: "Finalmente posso godermi le mie vacanze senza preoccuparmi degli ospiti. RentalOp gestisce tutto e i risultati si vedono subito.",
    rating: 5
  }
];

const stats = [
  {
    number: "25+",
    label: "Immobili gestiti"
  },
  {
    number: "90%",
    label: "Tasso occupazione medio"
  },
  {
    number: "€200k+",
    label: "Guadagni generati per i proprietari"
  },
  {
    number: "4.8/5",
    label: "Valutazione media"
  }
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-montserrat text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-montserrat">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-foreground mb-6">
            Cosa dicono i nostri proprietari
          </h2>
          <p className="text-xl text-muted-foreground font-montserrat">
            La soddisfazione dei nostri clienti è la nostra priorità
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-card-foreground font-montserrat mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-semibold text-primary font-montserrat">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-card-foreground font-montserrat">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};