import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallback?: string; // opzionale: se non c'è history, torna a questa pagina
}

export const BackButton = ({ fallback = "/" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // torna indietro nella history
    } else {
      navigate(fallback); // fallback (es. home)
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#029DD9] transition"
    >
      <ArrowLeft className="w-4 h-4" />
      Torna indietro
    </button>
  );
};
