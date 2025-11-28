import { useState } from "react";
import { Star, MessageSquare, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Review {
    id: string;
    guestName: string;
    rating: number;
    comment: string;
    date: string;
    source?: string;
}

interface ApartmentReviewsProps {
    reviews?: Review[];
    averageRating: number;
    totalReviews: number;
}

export const ApartmentReviews = ({ reviews = [], averageRating = 0, totalReviews = 0 }: ApartmentReviewsProps) => {

    // Stato per gestire quante recensioni mostrare (inizialmente 6)
    const [visibleCount, setVisibleCount] = useState(6);

    // 1. FILTRO: Teniamo solo le recensioni che hanno un commento scritto
    const validReviews = reviews.filter(r => r.comment && r.comment.trim().length > 0);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-3 h-3 ${
                    index < Math.round(rating) ? "text-yellow-400 fill-current" : "text-muted-foreground/30"
                }`}
            />
        ));
    };

    const getSourceBadge = (source: string = "") => {
        const s = source.toLowerCase();
        if (s.includes("airbnb")) return <span className="text-[10px] bg-[#FF5A5F]/10 text-[#FF5A5F] px-2 py-0.5 rounded-full font-bold border border-[#FF5A5F]/20">Airbnb</span>;
        if (s.includes("booking")) return <span className="text-[10px] bg-[#003580]/10 text-[#003580] px-2 py-0.5 rounded-full font-bold border border-[#003580]/20">Booking.com</span>;
        return null;
    };

    const displayRating = Number(averageRating).toFixed(1);

    // Funzione per caricare altri commenti
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground font-heading">
                    Recensioni degli ospiti
                </h2>
                {totalReviews > 0 && (
                    <div className="flex items-center bg-secondary/30 px-3 py-1 rounded-full">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                        <span className="text-lg font-bold text-foreground mr-1">
              {displayRating}
            </span>
                        <span className="text-sm text-muted-foreground">
              ({totalReviews} totali)
            </span>
                    </div>
                )}
            </div>

            {/* Lista Recensioni Filtrata e Tagliata */}
            {validReviews.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {/* 2. MOSTRIAMO SOLO LE PRIME 'visibleCount' RECENSIONI */}
                    {validReviews.slice(0, visibleCount).map((review) => (
                        <Card key={review.id} className="bg-card border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                            <CardContent className="p-5 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                                            {review.guestName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-foreground text-sm">{review.guestName}</h4>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <div className="flex">{renderStars(review.rating)}</div>
                                                {getSourceBadge(review.source)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground/60 whitespace-nowrap">
                                        {review.date ? new Date(review.date).toLocaleDateString('it-IT') : ""}
                                    </p>
                                </div>

                                {/* Qui mostriamo solo il commento, dato che abbiamo filtrato quelli vuoti */}
                                <p className="text-muted-foreground text-sm leading-relaxed italic line-clamp-6 flex-grow">
                                    "{review.comment}"
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                // Messaggio se non ci sono commenti scritti (ma magari ci sono voti)
                <div className="text-center py-10 bg-secondary/10 rounded-xl border border-border/50">
                    <div className="flex flex-col items-center gap-2">
                        <MessageSquare className="w-8 h-8 text-muted-foreground mb-1" />
                        <p className="text-foreground font-medium">
                            Eccellenza confermata dai voti
                        </p>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Questo alloggio ha un punteggio di <strong>{displayRating}/5</strong> su <strong>{totalReviews}</strong> recensioni verificate, anche se gli ospiti non hanno lasciato commenti scritti recenti.
                        </p>
                    </div>
                </div>
            )}

            {/* 3. BOTTONE CARICA ALTRO */}
            {/* Appare solo se ci sono più recensioni valide di quelle che stiamo mostrando */}
            {visibleCount < validReviews.length && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        className="flex items-center gap-2 px-8"
                    >
                        Mostra altre recensioni <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};