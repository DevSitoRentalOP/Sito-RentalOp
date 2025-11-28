"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns" // Assicurati di avere date-fns installato

export const HeroHome = () => {
  const [date, setDate] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState<number>(1)
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [loadingCities, setLoadingCities] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api_listings.php?action=cities")
        if (response.ok) {
          const data = await response.json()
          if (!data.error && data) {
            setCities(Object.keys(data))
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingCities(false)
      }
    }
    fetchCities()
  }, [])

  // GESTIONE RICERCA AVANZATA
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Costruiamo i parametri URL
    const params = new URLSearchParams();

    if (selectedCity) params.set("city", selectedCity);
    if (guests > 1) params.set("guests", guests.toString());

    // Formattiamo le date (YYYY-MM-DD)
    if (date?.from) {
      params.set("checkIn", format(date.from, "yyyy-MM-dd"));
    }
    if (date?.to) {
      params.set("checkOut", format(date.to, "yyyy-MM-dd"));
    }

    // Andiamo alla pagina risultati con tutti i parametri
    navigate(`/Apartments?${params.toString()}`)
  }

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-2">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-foreground mb-6 leading-tight">
            Trova il tuo alloggio perfetto con
            <span className="text-primary"> RentalOp</span>
          </h1>
          <p className="text-xl text-muted-foreground font-montserrat mb-8 max-w-2xl mx-auto">
            Scopri migliaia di appartamenti e case vacanze gestite professionalmente.
            Comfort, sicurezza e servizio di qualità garantiti.
          </p>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all flex items-center divide-x divide-gray-200 overflow-hidden">

              {/* CITTÀ */}
              {/* 1. Aggiunto min-w-0 e ridotto il padding orizzontale a px-3 (su mobile) */}
              <div className="flex-1 px-3 py-2 md:px-6 md:py-3 relative min-w-0">
                <label className="text-xs text-left font-semibold block mb-1">Dove</label>
                {loadingCities ? (
                  <div className="text-sm text-muted-foreground">...</div>
                ) : (
                  <div className="flex items-center">
                    {/* 2. Ridotto l'icona a w-3 h-3 (su mobile) */}
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary mr-2 flex-shrink-0" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      // Aggiunto min-w-0 al select per permettergli di restringersi
                      className="w-full bg-transparent border-none text-sm font-montserrat focus:outline-none appearance-none cursor-pointer text-foreground min-w-0"
                    >
                      <option value="">Tutte le destinazioni</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* DATE */}
              <Popover>
                <PopoverTrigger asChild>
                  {/* 3. Ridotto il padding orizzontale a px-3 (su mobile) */}
                  <button type="button" className="flex-1 px-3 py-2 md:px-6 md:py-3 text-left">
                    <label className="text-xs font-semibold block mb-1">Date</label>
                    <span className="text-sm text-muted-foreground truncate block">
                      {date?.from ? (
                        date.to ?
                          `${format(date.from, "dd/MM")} - ${format(date.to, "dd/MM")}` :
                          format(date.from, "dd/MM")
                      ) : "Aggiungi date"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <CalendarComponent mode="range" selected={date} onSelect={setDate} numberOfMonths={1} />
                </PopoverContent>
              </Popover>

              {/* OSPITI */}
              <Popover>
                <PopoverTrigger asChild>
                  {/* 4. Ridotto il padding orizzontale a px-3 (su mobile) */}
                  <button type="button" className="flex-1 px-3 py-2 md:px-6 md:py-3 text-left">
                    <label className="text-xs font-semibold block mb-1">Chi</label>
                    <span className="text-sm text-muted-foreground block">
                      {guests} ospite{guests > 1 ? 'i' : ''}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="p-4 w-64">

                  <div className="flex justify-between items-center">

                    <span>Ospiti</span>

                    <div className="flex gap-2">

                      <Button type="button" size="sm" variant="outline" onClick={() => setGuests(Math.max(1, guests - 1))}>-</Button>

                      <span>{guests}</span>

                      <Button type="button" size="sm" variant="outline" onClick={() => setGuests(guests + 1)}>+</Button>

                    </div>

                  </div>

                </PopoverContent>
              </Popover>

              {/* BOTTONE RICERCA */}
              {/* 5. Ridotto il padding esterno del bottone e la dimensione del bottone stesso */}
              <div className="px-2 md:px-4">
                <Button type="submit" size="icon" className="rounded-full bg-primary hover:bg-primary/90 w-10 h-10 md:w-12 md:h-12"><Search className="w-5 h-5" /></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}