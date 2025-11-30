import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const PaymentForm = ({ bookingData }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    // 1. Conferma Pagamento Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Importante: non reindirizzare se non serve (es. carta vs bonifico)
    });

    if (error) {
      toast({ title: "Pagamento fallito", description: error.message, variant: "destructive" });
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {

      // 2. PAGAMENTO OK -> REGISTRA SU GUESTY
      try {
        const res = await fetch("/confirm_booking.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            listingId: bookingData.apartmentId,
            guest: guestInfo,
            dates: { checkIn: bookingData.checkIn, checkOut: bookingData.checkOut },
            amount: bookingData.totalPrice,
            guests: bookingData.guests,
            planName: bookingData.planName
          })
        });

        const result = await res.json();

        if (result.success) {
          toast({ title: "Prenotazione Confermata!", description: "Riceverai una mail di conferma.", className: "bg-green-600 text-white" });
          setTimeout(() => navigate("/Success"), 2000); // Crea una pagina di successo
        } else {
          throw new Error("Errore registrazione Guesty");
        }

      } catch (err) {
        toast({ title: "Attenzione", description: "Pagamento ricevuto ma errore su Guesty. Contattaci.", variant: "destructive" });
      }

      setIsProcessing(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader><CardTitle>I tuoi dati</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Nome</Label><Input required onChange={e=>setGuestInfo({...guestInfo, firstName:e.target.value})}/></div>
              <div><Label>Cognome</Label><Input required onChange={e=>setGuestInfo({...guestInfo, lastName:e.target.value})}/></div>
            </div>
            <div><Label>Email</Label><Input type="email" required onChange={e=>setGuestInfo({...guestInfo, email:e.target.value})}/></div>
            <div><Label>Telefono</Label><Input type="tel" required onChange={e=>setGuestInfo({...guestInfo, phone:e.target.value})}/></div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader><CardTitle>Pagamento sicuro</CardTitle></CardHeader>
          <CardContent>
            {/* QUESTO COMPONENTE MOSTRA CARTA, KLARNA, GOOGLE PAY AUTOMATICAMENTE */}
            <PaymentElement />

            <Button type="submit" disabled={!stripe || isProcessing} className="w-full mt-6 text-lg py-6 font-bold">
              {isProcessing ? <Loader2 className="animate-spin"/> : `Paga €${bookingData.totalPrice}`}
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3"/> Pagamento criptato SSL a 256-bit
            </p>
          </CardContent>
        </Card>
      </form>
  );
};