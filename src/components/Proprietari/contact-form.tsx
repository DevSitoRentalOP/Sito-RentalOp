import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Loader2, User, Home, Building, CheckCircle2 } from "lucide-react";

export const ContactForm = () => {
  // Stato aggiornato con tutti i nuovi campi richiesti
  const [formData, setFormData] = useState({
    // Dati Personali
    name: "",
    email: "",
    phone: "",

    // Dati Base
    city: "",
    address: "",
    sqm: "",

    // Dettagli Specifici
    bedrooms: "",
    bathrooms: "",
    floor: "",
    elevator: "",
    garden: "",
    parking: "",

    // Stato e Storia
    condition: "",
    rentalHistory: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = "/send_email.php";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || "Errore nell'invio");

      toast({
        title: "Richiesta inviata con successo!",
        description: "Grazie per le informazioni dettagliate. Ti contatteremo entro 24 ore.",
        className: "bg-green-600 text-white border-none"
      });

      // Reset form totale
      setFormData({
        name: "", email: "", phone: "", city: "", address: "", sqm: "",
        bedrooms: "", bathrooms: "", floor: "", elevator: "", garden: "", parking: "",
        condition: "", rentalHistory: "", description: ""
      });

    } catch (error) {
      console.error("Errore invio:", error);
      toast({
        title: "Errore invio",
        description: "Si è verificato un problema. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section id="contact-form" className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-4">
                Valutiamo il tuo immobile gratuitamente
              </h2>
              <p className="text-lg text-white/90 font-montserrat max-w-2xl mx-auto">
                Compila il modulo con i dettagli specifici. Più informazioni ci dai, più precisa sarà la nostra stima di guadagno.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Sidebar Contatti */}
              <div className="bg-white/10 rounded-xl p-8 backdrop-blur-md text-center lg:text-left h-fit border border-white/20">
                <h3 className="text-xl font-semibold font-montserrat text-white mb-6">
                  Contatti Diretti
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 text-white/90">
                    <div className="p-2 bg-white/20 rounded-full"><Mail className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs text-white/60 uppercase font-bold">Email</p>
                      <span className="font-montserrat text-sm break-all">office@rentalop.it</span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-3 text-white/90">
                    <div className="p-2 bg-white/20 rounded-full"><Phone className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs text-white/60 uppercase font-bold">Telefono</p>
                      <span className="font-montserrat text-sm">+39 338 480 8427</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Completo */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8 shadow-2xl w-full">

                  {/* 1. DATI PERSONALI */}
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground font-montserrat">I tuoi dati</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Nome e Cognome *</label>
                        <Input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Mario Rossi" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Telefono *</label>
                        <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder="+39..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="mario@email.com" />
                      </div>
                    </div>
                  </div>

                  {/* 2. CARATTERISTICHE IMMOBILE */}
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Home className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground font-montserrat">L'Immobile</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Città *</label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} required placeholder="Es. Milano" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Indirizzo (Via e Civico)</label>
                        <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Via Roma 1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Mq</label>
                        <Input name="sqm" type="number" value={formData.sqm} onChange={handleInputChange} placeholder="Es. 75" />
                      </div>

                      {/* Camere da Letto */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Camere da Letto</label>
                        <Select onValueChange={(val) => handleSelectChange("bedrooms", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4+">4 +</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Bagni */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Bagni</label>
                        <Select onValueChange={(val) => handleSelectChange("bathrooms", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 bagno">1 bagno</SelectItem>
                            <SelectItem value="2 bagni">2 bagni</SelectItem>
                            <SelectItem value="3 bagni">3 bagni</SelectItem>
                            <SelectItem value="4+ bagni">4+ bagni</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Piano */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Piano</label>
                        <Select onValueChange={(val) => handleSelectChange("floor", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Piano terra">Piano terra</SelectItem>
                            <SelectItem value="1 piano">1 piano</SelectItem>
                            <SelectItem value="2 piano">2 piano</SelectItem>
                            <SelectItem value="3+ piano">3+ piano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Ascensore */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Ascensore</label>
                        <Select onValueChange={(val) => handleSelectChange("elevator", val)}>
                          <SelectTrigger><SelectValue placeholder="Sì / No" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sì">Sì</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Giardino */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Giardino</label>
                        <Select onValueChange={(val) => handleSelectChange("garden", val)}>
                          <SelectTrigger><SelectValue placeholder="Sì / No" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sì">Sì</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* 3. DETTAGLI E STATO */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Building className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground font-montserrat">Dettagli & Stato</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      {/* Posto Auto */}
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="text-sm font-medium text-foreground mb-1 block">Posto Auto</label>
                        <Select onValueChange={(val) => handleSelectChange("parking", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona opzione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Non presente">Non presente</SelectItem>
                            <SelectItem value="Su strada pubblica gratuito">Su strada pubblica gratuito</SelectItem>
                            <SelectItem value="Su strada pubblica a pagamento">Su strada pubblica a pagamento</SelectItem>
                            <SelectItem value="Posto privato">Posto privato</SelectItem>
                            <SelectItem value="Box auto privato">Box auto privato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Stato Immobile */}
                      <div className="md:col-span-2 lg:col-span-1">
                        <label className="text-sm font-medium text-foreground mb-1 block">Stato dell’immobile</label>
                        <Select onValueChange={(val) => handleSelectChange("condition", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona stato" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Da ristrutturare">Da ristrutturare</SelectItem>
                            <SelectItem value="Parzialmente ristrutturato">Parzialmente ristrutturato</SelectItem>
                            <SelectItem value="Ristrutturato">Ristrutturato</SelectItem>
                            <SelectItem value="Nuova Costruzione">Nuova Costruzione</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Storia Affitti */}
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-foreground mb-1 block">Hai mai affittato l’immobile?</label>
                        <Select onValueChange={(val) => handleSelectChange("rentalHistory", val)}>
                          <SelectTrigger><SelectValue placeholder="Seleziona opzione" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="No, mai">No, mai</SelectItem>
                            <SelectItem value="Si, contratti standard">Si, con contratti di locazione standard</SelectItem>
                            <SelectItem value="Si, affitti brevi">Si, già in affitto breve (Airbnb, Booking, ecc.)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Note aggiuntive (Opzionale)</label>
                      <Textarea name="description" value={formData.description} onChange={handleInputChange} className="h-20" placeholder="Altre info utili..." />
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full font-bold text-lg py-6 shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary-hover">
                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Invio richiesta...</> : <><CheckCircle2 className="mr-2 h-5 w-5" /> Invia Richiesta Valutazione</>}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    I tuoi dati sono al sicuro. Compilando accetti la Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};