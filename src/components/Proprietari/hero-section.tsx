import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const HeroSection = () => {
  const videoRef = useRef(null);

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-hero-gradient text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          
          {/* Testo e bottone */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold font-montserrat leading-tight">
              Affida il tuo immobile a{" "}
              <span className="text-white/90">RentalOp</span> e aumenta i guadagni
            </h1>

            <p className="text-xl text-white/90 font-montserrat leading-relaxed max-w-lg">
              Gestione professionale, più prenotazioni, pagamenti garantiti. Trasforma il tuo appartamento in una fonte di reddito sicura e costante.
            </p>

            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-xl font-semibold font-montserrat shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Affida ora il tuo immobile
            </Button>
          </div>

          {/* Video */}
          <div className="relative">
            <video
              ref={videoRef}
              src="./RentalOpGestione.mp4"
              poster=""
              controls
              className="rounded-2xl shadow-2xl object-cover w-full h-[280px] lg:h-[380px]"
            >
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
