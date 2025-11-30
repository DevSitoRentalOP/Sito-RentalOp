import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Calendar as CalendarIcon, Loader2, Info, ShieldCheck, Tag } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, differenceInDays } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// --- PIANI TARIFFARI ---
const MY_RATE_PLANS = [
    {
        id: 'standard',
        name: 'Standard',
        policy: 'Cancellazione Flessibile',
        modifier: 0,
        minNights: 1
    },
    {
        id: 'flexible',
        name: 'Flessibile',
        policy: 'Cancellazione Gratuita',
        modifier: 0.16,
        minNights: 1
    },
    {
        id: 'non_refundable',
        name: 'Non Rimborsabile',
        policy: 'Nessun rimborso (Super Strict)',
        modifier: -0.10,
        minNights: 1
    },
    {
        id: 'weekly_flex',
        name: 'Weekly Flex',
        policy: 'Cancellazione Gratuita',
        modifier: 0.16,
        minNights: 7
    },
    {
        id: 'weekly_rate',
        name: 'Weekly Standard',
        policy: 'Semi-flessibile',
        modifier: -0.08,
        minNights: 7
    },
    {
        id: 'weekly_no_ref',
        name: 'Weekly No Ref',
        policy: 'Nessun rimborso (Super Strict)',
        modifier: -0.12,
        minNights: 7
    }
];

interface DayData { p: number; s: string; }

interface BookingCardProps {
    price: number;
    rating: number;
    reviews: number;
    apartmentId: string;
    selectedDateRange?: DateRange;
    onDateChange: (range: DateRange | undefined) => void;
    calendarData: Record<string, DayData>;
    bookedDates: string[];
    extraPersonFee?: number;
    extraPersonFeeType?: string;
    guestsIncluded?: number;
    cleaningFee?: number;
    maxGuests?: number;
    ratePlans?: any[];
}

export const BookingCard = ({
                                price: basePrice, rating, reviews, apartmentId,
                                selectedDateRange, onDateChange, calendarData, bookedDates,
                                extraPersonFee = 0, extraPersonFeeType = 'amount', guestsIncluded = 2, cleaningFee = 0, maxGuests = 6
                            }: BookingCardProps) => {

    const navigate = useNavigate();
    const { toast } = useToast();
    const [guests, setGuests] = useState("1");
    const [totalPrice, setTotalPrice] = useState(0);
    const [baseStayCost, setBaseStayCost] = useState(0);

    // Stato Piani (ordinati per prezzo)
    const [sortedPlans, setSortedPlans] = useState<any[]>(MY_RATE_PLANS);
    const [selectedPlanId, setSelectedPlanId] = useState(""); // Iniziamo vuoto, lo settiamo nel useEffect

    const [isCalculating, setIsCalculating] = useState(false);
    const today = new Date();
    const bookedDatesObj = bookedDates.map(d => new Date(d));

    const isDateBooked = (date: Date) => {
        const dateStr = format(date, "yyyy-MM-dd");
        return bookedDates.includes(dateStr);
    };

    // --- FUNZIONE PER TESTI POLICY DINAMICI ---
    const getDynamicPolicy = (planId: string, checkIn?: Date) => {
        if (!checkIn) {
            if (planId?.includes('non_refundable') || planId?.includes('no_ref')) return "Nessun rimborso in caso di cancellazione.";
            if (planId === 'flexible' || planId === 'weekly_flex') return "Cancellazione gratuita fino al giorno dell'arrivo.";
            return "Cancellazione gratuita fino al giorno prima dell'arrivo.";
        }

        const dateStr = (d: Date) => format(d, "d MMM", { locale: it });

        if (planId?.includes('non_refundable') || planId?.includes('no_ref')) {
            return "Non rimborsabile";
        }

        if (planId === 'flexible' || planId === 'weekly_flex') {
            return `Cancellazione gratuita entro le 15:00 del ${dateStr(checkIn)}`;
        }

        const dayBefore = addDays(checkIn, -1);
        return `Cancellazione gratuita entro le 15:00 del ${dateStr(dayBefore)}`;
    };

    // CALENDARIO
    const handleDateSelect = (range: DateRange | undefined) => {
        if (!range) { onDateChange(undefined); return; }
        const { from, to } = range;

        if (from && !to && isDateBooked(from)) {
            toast({ variant: "destructive", title: "Non disponibile", description: "Data di arrivo non valida." });
            return;
        }

        if (from && to) {
            let curr = new Date(from);
            let valid = true;
            while (curr < to) {
                if (isDateBooked(curr)) { valid = false; break; }
                curr = addDays(curr, 1);
            }
            if (!valid) {
                toast({ variant: "destructive", title: "Non disponibile", description: "Date intermedie occupate." });
                onDateChange({ from });
            } else {
                onDateChange(range);
            }
        } else {
            onDateChange(range);
        }
    };

    // --- LOGICA CALCOLO E ORDINAMENTO PREZZI ---
    useEffect(() => {
        // 1. Se non ci sono date, resetta tutto e usa un ordinamento base (per modifier)
        if (!selectedDateRange?.from || !selectedDateRange?.to) {
            setTotalPrice(0);
            setBaseStayCost(0);
            // Ordina per modifier crescente (il più negativo/scontato per primo)
            const basicSort = [...MY_RATE_PLANS].sort((a, b) => a.modifier - b.modifier);
            setSortedPlans(basicSort);
            // Se non abbiamo ancora un piano selezionato, prendiamo il primo
            if (!selectedPlanId) setSelectedPlanId(basicSort[0].id);
            return;
        }

        setIsCalculating(true);
        
        // 2. Calcolo Costo Base Soggiorno
        let totalStay = 0;
        let currentDate = new Date(selectedDateRange.from);
        const endDate = new Date(selectedDateRange.to);
        const numNights = differenceInDays(selectedDateRange.to, selectedDateRange.from);

        while (currentDate < endDate) {
            const d = format(currentDate, "yyyy-MM-dd");
            totalStay += (calendarData[d] ? calendarData[d].p : basePrice);
            currentDate = addDays(currentDate, 1);
        }

        const nGuests = parseInt(guests);
        const effIncluded = Math.max(2, guestsIncluded || 2);
        let extraGuestCost = 0;

        if (nGuests > effIncluded && extraPersonFee > 0) {
            const extraP = nGuests - effIncluded;
            if (extraPersonFee < 1 || extraPersonFeeType === 'percent') {
                const perc = extraPersonFee > 1 ? extraPersonFee/100 : extraPersonFee;
                extraGuestCost = totalStay * perc * extraP;
            } else {
                extraGuestCost = extraPersonFee * extraP * numNights;
            }
        }

        const rawCost = totalStay + extraGuestCost;
        setBaseStayCost(rawCost);

        // 3. GENERAZIONE LISTA ORDINATA (Ordinamento Dinamico)
        // Filtriamo i piani validi per durata
        let validPlans = MY_RATE_PLANS.filter(p => numNights >= p.minNights);

        // Calcoliamo il prezzo finale per ogni piano per poterli ordinare
        const plansWithPrice = validPlans.map(plan => {
            const finalCost = Math.round(rawCost * (1 + plan.modifier) + cleaningFee);
            return { ...plan, calculatedPrice: finalCost };
        });

        // ORDINAMENTO: Dal prezzo più basso al più alto
        plansWithPrice.sort((a, b) => a.calculatedPrice - b.calculatedPrice);

        setSortedPlans(plansWithPrice);

        // 4. SELEZIONE AUTOMATICA MIGLIORE OFFERTA
        // Se il piano selezionato non esiste più nella nuova lista, resetta al migliore (primo)
        // Oppure se vuoi forzare sempre il migliore al cambio date, togli il controllo currentStillValid
        const currentStillValid = plansWithPrice.find(p => p.id === selectedPlanId);
        const bestPlan = plansWithPrice[0];
        const activePlan = currentStillValid || bestPlan;

        if (activePlan.id !== selectedPlanId) {
            setSelectedPlanId(activePlan.id);
        }

        // Imposta il totale da mostrare in basso
        setTotalPrice(activePlan.calculatedPrice);
        setIsCalculating(false);

    }, [selectedDateRange, guests, extraPersonFee, extraPersonFeeType, guestsIncluded, cleaningFee, calendarData, basePrice]);


    // Quando cambio manualmente il piano nel menu a tendina
    const handlePlanChange = (planId: string) => {
        setSelectedPlanId(planId);
        // Ricalcola solo il totale visualizzato (senza rieseguire tutto l'effect pesante)
        const plan = sortedPlans.find(p => p.id === planId);
        if (plan && baseStayCost > 0) {
            const final = Math.round(baseStayCost * (1 + plan.modifier) + cleaningFee);
            setTotalPrice(final);
        }
    };

    const handleBooking = () => {
        const plan = sortedPlans.find(p => p.id === selectedPlanId);
        navigate('/Payment', { state: { apartmentId, checkIn: selectedDateRange?.from, checkOut: selectedDateRange?.to, guests, totalPrice, cleaningFee, pricePerNight: basePrice, planName: plan?.name } });
    };

    // Trova il piano attivo per l'UI
    const activePlanData = sortedPlans.find(p => p.id === selectedPlanId) || sortedPlans[0];
    const policyText = getDynamicPolicy(activePlanData?.id, selectedDateRange?.from);

    return (
        <Card className="bg-card shadow-lg border-border/50 sticky top-24">
            <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex justify-between items-center">
                    <div><span className="text-sm text-muted-foreground">Da </span><span className="text-3xl font-bold text-primary">€{basePrice}</span><span className="text-sm text-muted-foreground">/notte</span></div>
                    <div className="flex items-center bg-secondary/20 px-2 py-1 rounded-md"><Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /><span className="font-bold">{Number(rating).toFixed(1)}</span><span className="text-xs ml-1">({reviews})</span></div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-6">
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Popover>
                            <PopoverTrigger asChild><Button variant="outline" className="justify-start text-left px-3">{selectedDateRange?.from ? format(selectedDateRange.from, "dd/MM") : "Check-in"}</Button></PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="range" selected={selectedDateRange} onSelect={handleDateSelect} disabled={[{before: today}]} modifiers={{booked:bookedDatesObj}} modifiersClassNames={{booked:"text-gray-300 line-through decoration-gray-400 opacity-50 pointer-events-none"}} locale={it} /></PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild><Button variant="outline" className="justify-start text-left px-3">{selectedDateRange?.to ? format(selectedDateRange.to, "dd/MM") : "Check-out"}</Button></PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="range" selected={selectedDateRange} onSelect={handleDateSelect} disabled={[{before: today}]} modifiers={{booked:bookedDatesObj}} modifiersClassNames={{booked:"text-gray-300 line-through decoration-gray-400 opacity-50"}} locale={it} /></PopoverContent>
                        </Popover>
                    </div>

                    <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{Array.from({length:maxGuests},(_,i)=>i+1).map(n=><SelectItem key={n} value={n.toString()}>{n} Ospiti</SelectItem>)}</SelectContent>
                    </Select>

                    {/* MENU TARIFFE DINAMICO */}
                    {selectedDateRange?.to && (
                        <div className="space-y-2 pt-1 animate-in slide-in-from-top-2">
                            <Label className="text-xs font-bold text-foreground uppercase tracking-wide block">
                                {differenceInDays(selectedDateRange.to, selectedDateRange.from) >= 7 ? "Tariffe Settimanali" : "Tariffa"}
                            </Label>
                            
                            <Select value={selectedPlanId} onValueChange={handlePlanChange}>
                                <SelectTrigger className="w-full h-auto py-3 px-3 text-left flex flex-col items-start gap-1 border-primary/50 bg-primary/5">
                                    <div className="flex w-full items-center justify-between">
                                        <span className="font-bold text-sm">{activePlanData?.name}</span>
                                        {/* Badge Miglior Prezzo - Controlliamo se è il primo della lista ordinata */}
                                        {activePlanData?.id === sortedPlans[0].id && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                                                Miglior Prezzo
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground font-normal truncate w-full leading-tight">
                                        {policyText}
                                    </span>
                                </SelectTrigger>

                                <SelectContent className="max-h-[300px]">
                                    {sortedPlans.map((plan, index) => {
                                        const cost = plan.calculatedPrice || 0;
                                        // Policy specifica per l'opzione nella lista
                                        const optPolicy = getDynamicPolicy(plan.id, selectedDateRange?.from);
                                        
                                        return (
                                            <SelectItem key={plan.id} value={plan.id} className="py-3 border-b last:border-0 border-border/50 focus:bg-accent/50">
                                                <div className="flex flex-col gap-1 w-full pr-2">
                                                    <div className="flex items-center justify-between w-full gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-sm">{plan.name}</span>
                                                            {/* Il primo della lista è sempre il più conveniente */}
                                                            {index === 0 && <Tag className="w-3 h-3 text-green-600" />}
                                                        </div>
                                                        <span className="font-bold text-sm text-primary">€{cost}</span>
                                                    </div>
                                                    
                                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                        <ShieldCheck className="w-3 h-3 opacity-70 flex-shrink-0" />
                                                        <span className="line-clamp-1">{optPolicy}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {selectedDateRange?.from && selectedDateRange?.to && (
                    <div className="bg-secondary/10 p-4 rounded-lg border border-border/50 animate-in fade-in">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>Soggiorno {activePlanData?.modifier !== 0 ? (activePlanData?.modifier! > 0 ? "(Flex)" : "(Scontato)") : ""}</span>
                            <span>€{Math.round(baseStayCost * (1 + activePlanData.modifier))}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-1"><span>Pulizia</span><span>€{cleaningFee}</span></div>
                        <div className="flex justify-between font-bold text-2xl mt-2 pt-2 border-t border-border/50 text-primary"><span>Totale</span><span>{isCalculating ? <Loader2 className="w-5 h-5 animate-spin"/> : `€${totalPrice}`}</span></div>
                    </div>
                )}

                <Button onClick={handleBooking} disabled={!selectedDateRange?.to} className="w-full text-lg py-6 font-bold shadow-md">Prenota</Button>
            </CardContent>
        </Card>
    );
};