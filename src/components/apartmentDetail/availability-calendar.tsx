import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { it } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface AvailabilityCalendarProps {
  bookedDates: string[]; // Array di stringhe "2024-10-25"
  dateRange: DateRange | undefined;
  onDateChange: (range: DateRange | undefined) => void;
}

export const AvailabilityCalendar = ({ bookedDates, dateRange, onDateChange }: AvailabilityCalendarProps) => {

  // Convertiamo le stringhe "YYYY-MM-DD" in oggetti Date
  const disabledDates = bookedDates.map(dateStr => new Date(dateStr));

  return (
      <Card className="bg-card border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg text-foreground">
            <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
            Disponibilità
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* CALENDARIO RANGE */}
            <div className="border rounded-lg p-4 bg-background mx-auto md:mx-0">
              <Calendar
                  mode="range" // <--- Importante: Modalità Range
                  selected={dateRange}
                  onSelect={onDateChange}
                  locale={it}
                  className="rounded-md"
                  // Disabilita: date passate E date prenotate
                  disabled={[
                    { before: new Date() }, // Ieri e prima
                    ...disabledDates        // Date occupate da Guesty
                  ]}
                  // Stile specifico per i giorni disabilitati (grigio)
                  modifiersClassNames={{
                    disabled: "text-muted-foreground opacity-50 bg-muted/30 line-through decoration-red-500/30"
                  }}
              />
            </div>

            {/* Legenda */}
            <div className="flex-1 space-y-4 pt-2">
              <h4 className="font-semibold text-foreground">Verifica le date</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Seleziona le date di Check-in e Check-out. I giorni in grigio non sono disponibili.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-primary mr-3" />
                  <span>Selezionato</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 rounded-full bg-muted mr-3 opacity-50" />
                  <span>Non disponibile</span>
                </div>
              </div>

              {dateRange?.from && dateRange?.to && (
                  <div className="bg-primary/10 p-3 rounded-md mt-4 border border-primary/20">
                    <p className="text-sm font-medium text-primary">
                      Dal {dateRange.from.toLocaleDateString()} al {dateRange.to.toLocaleDateString()}
                    </p>
                  </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
  );
};