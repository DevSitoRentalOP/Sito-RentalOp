import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { HeaderNav } from "@/components/header-nav";
import { FooterHome } from "@/components/Home/footer-home";
import { ApartmentHero } from "@/components/apartmentDetail/apartment-hero";
import { ImageGallery } from "@/components/apartmentDetail/image-gallery";
import { ApartmentInfo } from "@/components/apartmentDetail/apartment-info";
import { BookingCard } from "@/components/apartmentDetail/booking-card";
import { ApartmentAmenities, getIconForAmenity } from "@/components/apartmentDetail/apartment-amenities";
import { AvailabilityCalendar } from "@/components/apartmentDetail/availability-calendar";
import { ApartmentRules } from "@/components/apartmentDetail/apartment-rules";
import { ApartmentReviews } from "@/components/apartmentDetail/apartment-reviews";
import { ApartmentLocationMap } from "@/components/apartmentDetail/apartment-location-map";
import { BackButton } from "@/components/back-button";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayData { p: number; s: string; }

interface ApartmentData {
    id: string;
    title: string;
    location: string;
    fullAddress: string;
    lat: number;
    lng: number;
    price: number;
    extraPersonFee: number;
    extraPersonFeeType: string; // 'amount' o 'percent'
    guestsIncluded: number;
    cleaningFee: number;
    ratePlans: any[];
    cancellationPolicy: string;
    description: string;
    detailedDescription: string;
    images: string[];
    rating: number;
    reviews: number;
    reviewsList: any[];
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    amenities: { name: string; icon: string }[];
    checkIn: string;
    checkOut: string;
    houseRules: string[];
    additionalInfo: string[];
}

const ApartmentDetail = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [apartment, setApartment] = useState<ApartmentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [calendarData, setCalendarData] = useState<Record<string, DayData>>({});
    const [bookedDates, setBookedDates] = useState<string[]>([]);

    const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
        const inDate = searchParams.get("checkIn");
        const outDate = searchParams.get("checkOut");
        return inDate && outDate ? { from: new Date(inDate), to: new Date(outDate) } : undefined;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDetail = async () => {
            if (!id) return;
            try {
                const response = await fetch(`/api_listings.php?action=details&id=${id}`);
                const data = await response.json();
                if (data.error) throw new Error(data.error);

                const realReviews = data.realReviews || [];
                let finalRating = Number(data.reviews?.averageOverallRating || 0);
                let finalCount = Number(data.reviews?.count || 0);
                if (finalCount === 0 && realReviews.length > 0) {
                    const sum = realReviews.reduce((acc:number, r:any) => acc + Number(r.rating), 0);
                    finalRating = sum / realReviews.length;
                    finalCount = realReviews.length;
                }

                const mappedData: ApartmentData = {
                    id: data._id,
                    title: data.title || data.nickname,
                    location: data.address?.city || "Posizione non disponibile",
                    fullAddress: data.address?.full || data.address?.city,
                    lat: data.address?.lat ? parseFloat(data.address.lat) : 0,
                    lng: data.address?.lng ? parseFloat(data.address.lng) : 0,
                    price: parseFloat(data.prices?.basePrice || 0),

                    extraPersonFee: parseFloat(data.prices?.extraPersonFee || 0),
                    extraPersonFeeType: data.prices?.extraPersonFeeType || 'amount', // Tipo fee
                    guestsIncluded: parseInt(data.prices?.guestsIncluded || 1),
                    cleaningFee: parseFloat(data.prices?.cleaningFee || 0),
                    ratePlans: data.ratePlans || [],
                    cancellationPolicy: data.terms?.cancellationPolicy || "Standard",

                    description: data.publicDescription?.summary || "",
                    detailedDescription: data.publicDescription?.space || data.publicDescription?.summary || "",
                    images: data.pictures?.map((p: any) => p.original) || ["/placeholder.jpg"],
                    rating: finalRating, reviews: finalCount, reviewsList: realReviews,
                    maxGuests: data.accommodates || 2,
                    bedrooms: data.bedrooms || 1,
                    bathrooms: data.bathrooms || 1,
                    amenities: (data.amenities || []).map((str: string) => ({ name: str, icon: getIconForAmenity(str) })),
                    checkIn: data.defaultCheckInTime || "15:00",
                    checkOut: data.defaultCheckOutTime || "10:00",
                    houseRules: ["No fumo", "No feste"],
                    additionalInfo: ["Check-in autonomo"],
                };
                setApartment(mappedData);

                const calResponse = await fetch(`/api_listings.php?action=calendar&id=${id}`);
                if (calResponse.ok) {
                    const calData = await calResponse.json();
                    if (calData.bookedDates) setBookedDates(calData.bookedDates);
                    if (calData.daysData) setCalendarData(calData.daysData);
                }

            } catch (err: any) { console.error(err); setError("Errore dettagli"); }
            finally { setLoading(false); }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary"/></div>;
    if (error || !apartment) return <div className="min-h-screen flex items-center justify-center">{error}</div>;

    return (
        <div className="min-h-screen bg-background">
            <HeaderNav />
            <main className="container mx-auto pt-24 pb-8">
                <div className="relative flex flex-col md:flex-row w-full gap-8">
                    <div className="md:w-[50%]"><ApartmentHero title={apartment.title} location={apartment.location} description={apartment.description} /></div>
                    <div className="md:w-[50%] relative"><div className="absolute z-10 -top-2 right-0 md:-top-12 md:right-0"><BackButton /></div><ImageGallery images={apartment.images} /></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    <div className="lg:col-span-2 space-y-12">
                        <ApartmentInfo apartment={apartment} />
                        <ApartmentAmenities amenities={apartment.amenities} />
                        <ApartmentRules checkIn={apartment.checkIn} checkOut={apartment.checkOut} houseRules={apartment.houseRules} additionalInfo={apartment.additionalInfo} />
                        <ApartmentLocationMap lat={apartment.lat} lng={apartment.lng} address={apartment.fullAddress} />
                        <AvailabilityCalendar bookedDates={bookedDates} dateRange={dateRange} onDateChange={setDateRange} />
                        <ApartmentReviews reviews={apartment.reviewsList} averageRating={apartment.rating} totalReviews={apartment.reviews} />
                    </div>

                    <div className="lg:col-span-1 order-first lg:order-last">
                        <div className="lg:sticky lg:top-24">
                            <BookingCard
                                price={apartment.price}
                                rating={apartment.rating}
                                reviews={apartment.reviews}
                                apartmentId={apartment.id}

                                // Passaggio dati completi
                                extraPersonFee={apartment.extraPersonFee}
                                extraPersonFeeType={apartment.extraPersonFeeType}
                                guestsIncluded={apartment.guestsIncluded}
                                cleaningFee={apartment.cleaningFee}
                                maxGuests={apartment.maxGuests}
                                ratePlans={apartment.ratePlans}
                                cancellationPolicy={apartment.cancellationPolicy}

                                selectedDateRange={dateRange}
                                onDateChange={setDateRange}
                                calendarData={calendarData}
                                bookedDates={bookedDates}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <FooterHome />
        </div>
    );
};

export default ApartmentDetail;