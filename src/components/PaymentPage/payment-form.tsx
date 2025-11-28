import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CreditCard, Send, Loader2 } from "lucide-react";

interface PaymentFormProps {
  onSubmit: (data: any) => void;
}

export const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "request">("stripe");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuliamo un piccolo ritardo di rete
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit({ ...formData, paymentMethod });
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Guest Information */}
        <Card className="bg-card border border-gray-200 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              I tuoi dati
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="mb-1.5 block">Nome *</Label>
                <Input id="firstName" required value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-1.5 block">Cognome *</Label>
                <Input id="lastName" required value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="mb-1.5 block">Email *</Label>
              <Input id="email" type="email" required value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="nome@esempio.com" />
            </div>

            <div>
              <Label htmlFor="phone" className="mb-1.5 block">Telefono *</Label>
              <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="+39..." />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-card border border-gray-200 rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Metodo di pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">

            <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "stripe" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" name="paymentMethod" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} className="accent-primary h-4 w-4" />
              <div className="flex-1">
                <span className="flex items-center font-bold text-foreground">
                    <CreditCard className="w-4 h-4 mr-2 text-primary" /> Carta di Credito / Debito
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">Transazione sicura con Stripe (Visa, Mastercard, Amex)</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "request" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200 hover:border-gray-300"}`}>
              <input type="radio" name="paymentMethod" value="request" checked={paymentMethod === "request"} onChange={() => setPaymentMethod("request")} className="accent-primary h-4 w-4" />
              <div className="flex-1">
                <span className="flex items-center font-bold text-foreground">
                    <Send className="w-4 h-4 mr-2 text-primary" /> Invia richiesta (Bonifico)
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">Blocca le date e ricevi le istruzioni per il bonifico.</p>
              </div>
            </label>

          </CardContent>
        </Card>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full text-lg py-6 font-bold shadow-md" disabled={isSubmitting}>
          {isSubmitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Elaborazione...</>
          ) : (
              paymentMethod === "stripe" ? "Paga e Prenota" : "Invia Richiesta"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Cliccando confermi di accettare i Termini di Servizio e la Privacy Policy.
        </p>
      </form>
  );
};