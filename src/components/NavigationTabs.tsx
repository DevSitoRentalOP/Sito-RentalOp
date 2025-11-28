// src/components/NavigationTabs.tsx
import { Link, useLocation } from "react-router-dom"

export function NavigationTabs() {
  const location = useLocation()

  return (
    <div className="hidden md:flex items-center space-x-1 bg-muted rounded-full p-1">
      <Link to="/">
        <button
          className={`px-6 py-2 rounded-full font-medium font-montserrat transition-all ${
            location.pathname === "/"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground bg-transparent"
          }`}
        >
          Alloggi
        </button>
      </Link>

      <Link to="/Proprietari">
        <button
          className={`px-6 py-2 rounded-full font-medium font-montserrat transition-all ${
            location.pathname === "/Proprietari"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground bg-transparent"
          }`}
        >
          Proprietari
        </button>
      </Link>
    </div>
  )
}
