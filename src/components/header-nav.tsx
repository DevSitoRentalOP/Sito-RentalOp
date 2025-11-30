import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Menu, Home, KeyRound, Building } from "lucide-react"; // Importate le nuove icone
import { Link } from "react-router-dom";
import { NavigationTabs } from "@/components/NavigationTabs";

export const HeaderNav = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 relative flex items-center justify-between">
        
        {/* Logo Cliccabile con Animazione */}
        {/* Usiamo Link per reindirizzare alla homepage */}
        <Link to="/" className="flex items-center group"> 
          <img 
            src="/logo_rentalop.webp" 
            alt="RentalOp Logo" 
            className="
              w-24 h-24 mr-2 
              transition-transform duration-300 ease-in-out 
              hover:scale-[1.05] 
              hover:rotate-1 
              cursor-pointer
            " 
          />
        </Link>

        {/* NavigationTabs centrato su md+ */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationTabs />
        </div>

        {/* Right Side: Menu (Nuovo Stile) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="
                flex items-center gap-2 
                py-2 px-4 
                rounded-full 
                font-semibold 
                transition-all duration-300 
                hover:bg-gray-50 
                hover:bg-primary 
                active:scale-[0.98]
              "
            >
              <Menu className="w-5 h-5 transition-transform duration-300" />
              Menu
            </Button>
          </PopoverTrigger>

          <PopoverContent 
            align="end" 
            className="
              w-52 
              p-1.5 
              rounded-xl 
              shadow-2xl 
              border-gray-200
            "
          >
            <ul className="flex flex-col gap-0.5">
              
              {/* Item: Home */}
              <li>
                <Link 
                  to="/" 
                  className="
                    flex items-center gap-3 
                    px-4 py-2 
                    rounded-lg 
                    text-base font-medium 
                    text-gray-700 
                    transition-all duration-200
                    hover:bg-primary/10 
                    hover:text-primary 
                    hover:shadow-sm
                    active:bg-primary/20
                  "
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </li>
              
              {/* Item: Proprietari */}
              <li>
                <Link 
                  to="/proprietari" 
                  className="
                    flex items-center gap-3 
                    px-4 py-2 
                    rounded-lg 
                    text-base font-medium 
                    text-gray-700 
                    transition-all duration-200
                    hover:bg-primary/10 
                    hover:text-primary
                    hover:shadow-sm
                    active:bg-primary/20
                  "
                >
                  <KeyRound className="w-4 h-4" />
                  Proprietari
                </Link>
              </li>
              
              {/* Item: Appartamenti */}
              <li>
                <Link 
                  to="/Apartments" 
                  className="
                    flex items-center gap-3 
                    px-4 py-2 
                    rounded-lg 
                    text-base font-medium 
                    text-gray-700 
                    transition-all duration-200
                    hover:bg-primary/10 
                    hover:text-primary
                    hover:shadow-sm
                    active:bg-primary/20
                  "
                >
                  <Building className="w-4 h-4" />
                  Appartamenti
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

      </div>
    </header>
  );
};