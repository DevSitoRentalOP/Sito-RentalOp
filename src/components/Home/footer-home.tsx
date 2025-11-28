import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export const FooterHome = () => {
  return (
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold font-montserrat mb-4">RentalOp</h3>
              <p className="text-background/80 font-montserrat mb-6 leading-relaxed">
                La piattaforma leader per la gestione professionale di immobili in affitto breve.
                Qualità, sicurezza e servizio di eccellenza per proprietari e ospiti.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/rentalop/" target="_blank" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold font-montserrat mb-4">Link utili</h4>
              <ul className="space-y-3">
                <li><a href="" className="text-background/80 hover:text-background font-montserrat transition-colors">Home</a></li>
                <li><a href="./Apartments" className="text-background/80 hover:text-background font-montserrat transition-colors">Cerca alloggi</a></li>
                <li><a href="./Proprietari" className="text-background/80 hover:text-background font-montserrat transition-colors">Per proprietari</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold font-montserrat mb-4">Contatti</h4>
              <div className="space-y-4">
                <div className="flex items-center text-background/80">
                  <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">office@rentalop.it</span>
                </div>
                <div className="flex items-center text-background/80">
                  <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">+39 338 480 8427</span>
                </div>
                <div className="flex items-start text-background/80">
                  <MapPin className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="font-montserrat">
                    <div>C.so Torino 10K, Novara 28100</div>
                    <div>Sede legale: Via Monte Napoleone 8, Milano 20121 </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 font-montserrat text-sm mb-4 md:mb-0">
              © 2024 RentalOp. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background font-montserrat transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/60 hover:text-background font-montserrat transition-colors">
                Termini di Servizio
              </a>
              <a href="#" className="text-background/60 hover:text-background font-montserrat transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};