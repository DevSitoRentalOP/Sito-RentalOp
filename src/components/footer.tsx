import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-montserrat mb-4">RentalOp</h3>
            <p className="text-background/80 font-montserrat mb-4">
              La piattaforma leader per la gestione professionale di immobili in affitto breve. Massimizza i tuoi guadagni senza stress.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-4">Contatti</h4>
            <div className="space-y-3">
              <div className="flex items-center text-background/80">
                <Mail className="w-4 h-4 mr-3" />
                <span className="font-montserrat">Office@rentalop.it</span>
              </div>
              <div className="flex items-center text-background/80">
                <Phone className="w-4 h-4 mr-3" />
                <span className="font-montserrat"> +39 338 480 8427</span>
              </div>
              <div className="flex items-center text-background/80">
                <MapPin className="w-4 h-4 mr-3" />
                <span className="font-montserrat">C.so Torino 10K, Novara 28100</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-montserrat mb-4">Servizi</h4>
            <ul className="space-y-2 text-background/80 font-montserrat">
              <li>Gestione prenotazioni</li>
              <li>Ottimizzazione prezzi</li>
              <li>Gestione ospiti</li>
              <li>Pulizie professionali</li>
              <li>Manutenzioni</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 font-montserrat">
            © 2024 RentalOp. Tutti i diritti riservati. | Privacy Policy | Termini di Servizio
          </p>
        </div>
      </div>
    </footer>
  );
};