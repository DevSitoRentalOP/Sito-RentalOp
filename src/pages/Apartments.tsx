import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { HeaderNav } from "@/components/header-nav";
import { FooterHome } from "@/components/Home/footer-home";
import { ApartmentCard } from "@/components/Apartments/apartment-card";
import { ApartmentFilters, FilterValues } from "@/components/Apartments/apartment-filters";
import { ApartmentMap } from "@/components/Apartments/apartment-map";
import { BackButton } from "@/components/back-button";
import { Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

interface Apartment {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    maxGuests: number;
    lat: number;
    lng: number;
    calculatedTotal?: number;
}

const Apartments = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialCity = searchParams.get("city") || "";
    const initialGuests = searchParams.get("guests") || "1";
    const initialCheckIn = searchParams.get("checkIn");
    const initialCheckOut = searchParams.get("checkOut");

    const initialDateRange: DateRange | undefined = initialCheckIn && initialCheckOut ? {
        from: new Date(initialCheckIn),
        to: new Date(initialCheckOut)
    } : undefined;

    const [allApartments, setAllApartments] = useState<Apartment[]>([]);
    const [filteredApartments, setFilteredApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const respList = await fetch("/api_listings.php?action=all");
                const dataList = await respList.json();
                if (dataList.error) throw new Error(dataList.error);

                const formatted: Apartment[] = dataList.map((item: any) => ({
                    id: item._id,
                    title: item.nickname || item.title,
                    location: item.address?.city || "Posizione non disponibile",
                    price: parseFloat(item.prices?.basePrice || 0),
                    image: item.pictures?.[0]?.original || "/placeholder.jpg",
                    rating: item.reviews?.averageOverallRating || 0,
                    reviews: item.reviews?.count || 0,
                    maxGuests: item.accommodates || 2,
                    lat: item.address?.lat ? parseFloat(item.address.lat) : 0,
                    lng: item.address?.lng ? parseFloat(item.address.lng) : 0
                }));

                const uniqueApts = Array.from(new Map(formatted.map(item => [item.id, item])).values());
                let result = uniqueApts;

                // Check Availability
                if (initialCheckIn && initialCheckOut) {
                    const respAvail = await fetch(`/api_listings.php?action=check_availability&checkIn=${initialCheckIn}&checkOut=${initialCheckOut}&guests=${initialGuests}`);
                    if (respAvail.ok) {
                        const availMap = await respAvail.json();
                        // Filtra e inietta prezzo totale
                        result = result.filter(apt => availMap[apt.id]).map(apt => ({
                            ...apt,
                            calculatedTotal: availMap[apt.id].totalPrice
                        }));
                    }
                }

                // Filtri Locali
                if (initialCity && initialCity !== "all_cities") {
                    result = result.filter(apt => apt.location.toLowerCase().includes(initialCity.toLowerCase()));
                }
                if (initialGuests) {
                    result = result.filter(apt => apt.maxGuests >= parseInt(initialGuests));
                }

                setAllApartments(uniqueApts);
                setFilteredApartments(result);

            } catch (e: any) { console.error(e); setError(e.message); }
            finally { setLoading(false); }
        };
        fetchData();
    }, [initialCity, initialCheckIn, initialCheckOut, initialGuests]);

    const handleFilterChange = (filters: FilterValues) => {
        const newParams = new URLSearchParams();
        if (filters.city) newParams.set("city", filters.city);
        if (filters.guests) newParams.set("guests", filters.guests);
        if (filters.dateRange?.from) newParams.set("checkIn", filters.dateRange.from.toISOString());
        if (filters.dateRange?.to) newParams.set("checkOut", filters.dateRange.to.toISOString());
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen bg-background">
            <HeaderNav />
            <main className="container mx-auto px-4 pt-24 pb-8">
                <div className="relative flex flex-row gap-6 md:place-content-between">
                    <div className="mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-2">
                            {initialCity ? `Soggiorni a ${initialCity}` : "Tutti gli appartamenti"}
                        </h1>
                        <p className="text-muted-foreground">{loading ? "Caricamento..." : `${filteredApartments.length} alloggi disponibili`}</p>
                    </div>
                    <div className="absolute -top-10 right-3"><BackButton /></div>
                </div>

                <ApartmentFilters onFilterChange={handleFilterChange} initialCity={initialCity} initialGuests={initialGuests} initialDateRange={initialDateRange} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div className="order-1 lg:order-2 h-96 lg:h-[calc(100vh-150px)] lg:sticky lg:top-24">
                        <ApartmentMap apartments={filteredApartments} />
                    </div>
                    <div className="order-2 lg:order-1 space-y-6">
                        {loading && <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-primary"/></div>}
                        {!loading && !error && filteredApartments.length === 0 && <div className="text-center py-10 bg-secondary/10 rounded-lg"><p>Nessun alloggio trovato.</p></div>}
                        {!loading && <div className="grid gap-6">{filteredApartments.map(apt => <ApartmentCard key={apt.id} apartment={apt} />)}</div>}
                    </div>
                </div>
            </main>
            <FooterHome />
        </div>
    );
};

export default Apartments;