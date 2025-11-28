import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderNav } from "@/components/header-nav";
import { FooterHome } from "@/components/Home/footer-home";
import { BookingSummary } from "@/components/PaymentPage/booking-summary";
import { PaymentForm } from "@/components/PaymentPage/payment-form";
import { BackButton } from "@/components/back-button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dati che arrivano dalla BookingCard
interface BookingState {
    apartmentId: string;
    checkIn: Date;
    checkOut: Date;
    guests: string;
    totalPrice: number;
    pricePerNight: number;
    cleaningFee: number;
    nights: number;
    planName?: string;
}

interface ApartmentInfo {
    title: string;
    location: string;
    image: string;
}

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    const bookingData = location.state as BookingState;
    const [apartmentInfo, setApartmentInfo] = useState<ApartmentInfo | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!bookingData) {
            navigate("/");
            return;
        }

        const fetchApartmentInfo = async () => {
            try {
                const response = await fetch(`/api_listings.php?action=details&id=${bookingData.apartmentId}`);
                const data = await response.json();
                if (data && !data.error) {
                    setApartmentInfo({
                        title: data.title || data.nickname,
                        location: data.address?.city || "Posizione non disponibile",
                        image: data.pictures?.[0]?.original || "/placeholder.jpg"
                    });
                }
            } catch (error) {
                console.error("Errore info appartamento:", error);
            }
        };

        fetchApartmentInfo();
    }, [bookingData, navigate]);

    const handlePaymentSubmit = async (customerData: any) => {
        // Se il metodo è "Invia Richiesta" (Bonifico / Preventivo)
        if (customerData.paymentMethod === 'request') {
            try {
                const response = await fetch('/send_booking_request.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        apartmentId: bookingData.apartmentId,
                        apartmentName: apartmentInfo?.title || 'Appartamento',
                        checkIn: new Date(bookingData.checkIn).toLocaleDateString('it-IT'),
                        checkOut: new Date(bookingData.checkOut).toLocaleDateString('it-IT'),
                        guests: bookingData.guests,
                        totalPrice: bookingData.totalPrice,
                        guest: customerData // Nome, Cognome, Email, Tel
                    })
                });

                const result = await response.json();

                if (result.success) {
                    toast({
                        title: "Richiesta Inviata!",
                        description: "Abbiamo ricevuto la tua richiesta. Ti invieremo i dettagli per il pagamento via email.",
                        className: "bg-green-600 text-white border-none"
                    });
                    // Dopo 3 secondi torna alla home
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    throw new Error(result.error || "Errore invio richiesta");
                }

            } catch (error) {
                console.error(error);
                toast({
                    title: "Errore",
                    description: "Impossibile inviare la richiesta. Riprova o contattaci telefonicamente.",
                    variant: "destructive"
                });
            }
        }
        // Se il metodo è "Stripe"
        else if (customerData.paymentMethod === 'stripe') {
            // Qui andrà la logica per creare il Payment Intent di Stripe
            // Per ora mostriamo un alert
            alert("Integrazione Stripe in arrivo! Usa 'Invia Richiesta' per ora.");
        }
    };

    if (!bookingData || !apartmentInfo) {
        return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary"/></div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <HeaderNav />

            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-row place-content-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground font-heading mb-2">
                                Completa la tua prenotazione
                            </h1>
                            <p className="text-muted-foreground">
                                Inserisci i tuoi dati per finalizzare la richiesta.
                            </p>
                        </div>
                        <BackButton/>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="lg:order-1">
                            <PaymentForm onSubmit={handlePaymentSubmit} />
                        </div>

                        <div className="lg:order-2">
                            <div className="lg:sticky lg:top-24">
                                <BookingSummary
                                    info={apartmentInfo}
                                    booking={bookingData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <FooterHome />
        </div>
    );
};

export default Payment;