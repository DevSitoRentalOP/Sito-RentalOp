import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Ottiene l'oggetto location da react-router-dom
  const { pathname } = useLocation();

  useEffect(() => {
    // Ogni volta che 'pathname' (l'URL) cambia,
    // esegue lo scorrimento all'inizio della pagina.
    window.scrollTo(0, 0);
  }, [pathname]); // Dipendenza da pathname

  // Questo componente non renderizza nulla
  return null;
};

export default ScrollToTop;