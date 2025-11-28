import { Clock, Home, Shield, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApartmentRulesProps {
  checkIn: string;
  checkOut: string;
  houseRules: string[];
  additionalInfo?: string[];
}

export const ApartmentRules = ({ checkIn, checkOut, houseRules, additionalInfo }: ApartmentRulesProps) => {
  return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground font-heading">
          Regole della casa e informazioni
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Check-in/Check-out */}
          <Card className="bg-card border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg text-foreground">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Orari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-muted-foreground font-medium">Check-in</span>
                <span className="font-bold text-foreground">{checkIn || "15:00"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground font-medium">Check-out</span>
                <span className="font-bold text-foreground">{checkOut || "10:00"}</span>
              </div>
            </CardContent>
          </Card>

          {/* House Rules */}
          <Card className="bg-card border-border/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg text-foreground">
                <Home className="w-5 h-5 mr-2 text-primary" />
                Regole della casa
              </CardTitle>
            </CardHeader>
            <CardContent>
              {houseRules && houseRules.length > 0 ? (
                  <ul className="space-y-3">
                    {houseRules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground/90 leading-tight">{rule}</span>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Nessuna regola specifica segnalata. Si richiede il rispetto del buon senso e della quiete pubblica.
                  </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        {additionalInfo && additionalInfo.length > 0 && (
            <Card className="bg-card border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg text-foreground">
                  <AlertCircle className="w-5 h-5 mr-2 text-primary" />
                  Informazioni utili
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalInfo.map((info, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{info}</span>
                      </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
        )}
      </div>
  );
};