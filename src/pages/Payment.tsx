import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderNav } from "@/components/header-nav";
import { FooterHome } from "@/components/Home/footer-home";
import { BookingSummary } from "@/components/PaymentPage/booking-summary";
import { PaymentForm } from "@/components/PaymentPage/payment-form";
import { BackButton } from "@/components/back-button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// STRIPE
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// METTI LA TUA CHIAVE PUBBLICA (pk_test_...)
const stripePromise = loadStripe("pk_test_1234567890...");

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { toast } = useToast();

    const bookingData = location.state;
    const [clientSecret, setClientSecret] = useState("");
    const [apartmentInfo, setApartmentInfo] = useState<any>(null);

    useEffect(() => {
        if (!bookingData) { navigate("/"); return; }

        // 1. Fetch Info Appartamento (per riepilogo)
        fetch(`/api_listings.php?action=details&id=${bookingData.apartmentId}`)
            .then(res => res.json())
            .then(data => {
                if(data && !data.error) setApartmentInfo({
                    title: data.title, location: data.address?.city, image: data.pictures?.[0]?.original
                });
            });

        // 2. Inizializza Pagamento (Chiede il segreto al server)
        fetch("/create_payment_intent.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) setClientSecret(data.clientSecret);
                else toast({ title: "Errore", description: data.error || "Impossibile avviare il pagamento", variant: "destructive" });
            });
    }, [bookingData, navigate]);

    if (!clientSecret || !apartmentInfo) return <div className="h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary"/></div>;

    return (
        <div className="min-h-screen bg-background">
            <HeaderNav />
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
                    <div className="lg:order-1">
                        {/* STRIPE ELEMENTS WRAPPER */}
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                            <PaymentForm bookingData={bookingData} clientSecret={clientSecret} />
                        </Elements>
                    </div>
                    <div className="lg:order-2">
                        <BookingSummary info={apartmentInfo} booking={bookingData} />
                    </div>
                </div>
            </main>
            <FooterHome />
        </div>
    );
};

export default Payment;