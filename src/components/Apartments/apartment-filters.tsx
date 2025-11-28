import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar as CalendarIcon, Euro, SlidersHorizontal, Loader2, X } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface FilterValues {
  city: string;
  guests: string;
  minPrice: string;
  maxPrice: string;
  dateRange?: DateRange;
}

interface ApartmentFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  initialCity?: string;
  initialGuests?: string;
  initialDateRange?: DateRange; // Riceve le date dalla Home
}

export const ApartmentFilters = ({
                                   onFilterChange,
                                   initialCity = "",
                                   initialGuests = "",
                                   initialDateRange
                                 }: ApartmentFiltersProps) => {

  const [open, setOpen] = useState(false);

  // Stati
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [guests, setGuests] = useState(initialGuests);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loadingCities, setLoadingCities] = useState(true);

  // Sincronizza se cambiano i props (es. arrivo dalla Home)
  useEffect(() => {
    setSelectedCity(initialCity);
    setGuests(initialGuests);
    if (initialDateRange) setDateRange(initialDateRange);
  }, [initialCity, initialGuests, initialDateRange]);

  // Carica città dal backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api_listings.php?action=cities");
        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) setCities(Object.keys(data));
        }
      } catch (error) { console.error(error); }
      finally { setLoadingCities(false); }
    };
    fetchCities();
  }, []);

  const handleSearch = () => {
    onFilterChange({
      city: selectedCity,
      guests: guests,
      minPrice: minPrice,
      maxPrice: maxPrice,
      dateRange: dateRange
    });
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedCity("");
    setGuests("");
    setMinPrice("");
    setMaxPrice("");
    setDateRange(undefined);
    onFilterChange({ city: "", guests: "", minPrice: "", maxPrice: "", dateRange: undefined });
  };

  return (
      <div className="w-full flex flex-col md:flex-row justify-start mb-6 gap-4">

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4" />
              Filtri Avanzati
              {(selectedCity || guests || dateRange?.from) && <span className="w-2 h-2 rounded-full bg-primary ml-1"/>}
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-[95vw] max-w-5xl p-0 shadow-lg rounded-xl ml-0" side="bottom" sideOffset={8}>
            <Card className="border-0">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4 md:hidden">
                  <h3 className="font-semibold">Filtra Appartamenti</h3>
                  <Button variant="ghost" size="sm" onClick={() => setOpen(false)}><X className="w-4 h-4"/></Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

                  {/* Città */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Città</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger><SelectValue placeholder="Tutte le città" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_cities">Tutte</SelectItem>
                        {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ospiti */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ospiti</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger><SelectValue placeholder="Qualsiasi" /></SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8].map(n => <SelectItem key={n} value={n.toString()}>{n}+ ospiti</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range Picker */}
                  <div className="lg:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Date Soggiorno</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !dateRange && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                              dateRange.to ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}` : format(dateRange.from, "dd/MM/yyyy")
                          ) : <span>Seleziona date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} locale={it} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Azioni */}
                <div className="flex gap-4 mt-6 justify-end">
                  <Button variant="ghost" onClick={handleReset}>Reset</Button>
                  <Button onClick={handleSearch}><Search className="w-4 h-4 mr-2" /> Cerca Disponibilità</Button>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        {/* Badges visuali dei filtri attivi */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
          {selectedCity && <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{selectedCity}</span>}
          {guests && <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{guests} Ospiti</span>}
          {dateRange?.from && <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">{format(dateRange.from, "dd/MM")} - {dateRange.to ? format(dateRange.to, "dd/MM") : "..."}</span>}
        </div>
      </div>
  );
};