import * as React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationTabs } from "@/components/NavigationTabs";

export const HeaderNav = () => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 relative flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo_rentalop.webp" alt="RentalOp Logo" className="w-24 h-24 mr-2" />
        </div>

        {/* NavigationTabs centrato su md+ */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationTabs />
        </div>

        {/* Right Side: Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Menu className="w-5 h-5" />
              Menu
            </Button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-48 p-2">
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/proprietari" className="block px-3 py-2 rounded hover:bg-gray-100">
                  Proprietari
                </Link>
              </li>
              <li>
                <Link to="/Apartments" className="block px-3 py-2 rounded hover:bg-gray-100">
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
