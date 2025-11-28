import { useState, useEffect } from "react";

interface ImageGalleryProps {
    images: string[];
}

// Numero massimo di puntini da visualizzare contemporaneamente
const MAX_VISIBLE_INDICATORS = 5;

export const ImageGallery = ({ images }: ImageGalleryProps) => {
    const [mainImageIndex, setMainImageIndex] = useState(0); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    // Stato che definisce il primo indice dei 5 puntini da mostrare
    const [startIndex, setStartIndex] = useState(0); 

    // Protezione: Se non ci sono immagini, usiamo un placeholder
    const safeImages = images && images.length > 0 ? images : ["/placeholder.jpg"];
    const totalImages = safeImages.length;

    // Resetta l'immagine principale e lo startIndex se cambiano le immagini
    useEffect(() => {
        setMainImageIndex(0);
        setStartIndex(0);
    }, [images]);

    // Funzione per aggiornare l'indice e lo scorrimento dei puntini
    const updateImageIndex = (newIndex: number) => {
        setMainImageIndex(newIndex);
        
        // --- LOGICA DI SLIDE DEI PUNTINI ---
        
        // 1. Controlla se il nuovo indice è fuori dal range visibile a destra
        // Se newIndex >= startIndex + 5, sposta la finestra in avanti
        if (newIndex >= startIndex + MAX_VISIBLE_INDICATORS) {
            // Aggiorna startIndex per far entrare il nuovo indice
            setStartIndex(newIndex - MAX_VISIBLE_INDICATORS + 1);
        } 
        
        // 2. Controlla se il nuovo indice è fuori dal range visibile a sinistra
        // Se newIndex < startIndex, sposta la finestra all'indietro
        else if (newIndex < startIndex) {
            setStartIndex(newIndex);
        }
        
        // 3. Assicurati che startIndex non vada mai sotto zero
        if (newIndex < startIndex) {
            setStartIndex(Math.max(0, newIndex));
        }
    };
    
    // Funzioni per la navigazione (usano updateImageIndex)
    const nextImage = () => {
        const newIndex = (mainImageIndex + 1) % totalImages;
        updateImageIndex(newIndex);
    };

    const prevImage = () => {
        const newIndex = (mainImageIndex - 1 + totalImages) % totalImages;
        updateImageIndex(newIndex);
    };
    
    // Slice: Mostra solo l'array di puntini che inizia da startIndex e ne prende MAX_VISIBLE_INDICATORS
    const visibleIndicators = safeImages.slice(startIndex, startIndex + MAX_VISIBLE_INDICATORS);

    // Gestione della tastiera per lo scorrimento (nel modale)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isModalOpen) {
                if (event.key === "ArrowRight") {
                    nextImage();
                } else if (event.key === "ArrowLeft") {
                    prevImage();
                } else if (event.key === "Escape") {
                    setIsModalOpen(false);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen, totalImages, nextImage, prevImage]); 

    return (
        <div className="space-y-4">
            {/* 1. Immagine Principale (Preview) con Frecce */}
            <div 
                className="relative aspect-video overflow-hidden rounded-xl shadow-md bg-muted" 
            >
                {/* Immagine */}
                <img
                    src={safeImages[mainImageIndex]}
                    alt="Vista principale appartamento"
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105 cursor-pointer"
                    onClick={() => setIsModalOpen(true)} 
                    onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                />

                {/* Freccia Indietro (Preview) */}
                {totalImages > 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition z-10"
                        aria-label="Immagine precedente"
                    >
                        &#10094; 
                    </button>
                )}

                {/* Freccia Avanti (Preview) */}
                {totalImages > 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl p-1 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 transition z-10"
                        aria-label="Immagine successiva"
                    >
                        &#10095; 
                    </button>
                )}
            </div>

            {/* 2. Indicatori di Navigazione (Puntini, 5 Max) */}
            {totalImages > 1 && (
                <div className="flex justify-center space-x-2">
                    {/* Iteriamo solo sugli indicatori VSIBILE */}
                    {visibleIndicators.map((_, index) => {
                        // L'indice reale è startIndex + index
                        const realIndex = startIndex + index;
                        
                        return (
                            <button
                                key={realIndex}
                                onClick={() => updateImageIndex(realIndex)}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300 
                                    ${realIndex === mainImageIndex ? "bg-primary w-6" : "bg-gray-400 hover:bg-primary/70"}
                                `}
                                aria-label={`Vai all'immagine ${realIndex + 1}`}
                            />
                        );
                    })}
                </div>
            )}

            {/* 3. Modale/Lightbox per la Visualizzazione a Schermo Intero (NON MODIFICATO) */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
                    onClick={() => setIsModalOpen(false)} 
                >
                    <div 
                        className="relative h-full w-full max-w-screen-xl max-h-screen-xl"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Immagine a Schermo Intero */}
                        <img
                            src={safeImages[mainImageIndex]}
                            alt={`Immagine ${mainImageIndex + 1} di ${totalImages}`}
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                        />

                        {/* Controlli del Modale... */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-white text-3xl p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition"
                            aria-label="Chiudi galleria"
                        >
                            &times;
                        </button>

                        {/* Freccia Indietro Modale */}
                        {totalImages > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition z-50"
                                aria-label="Immagine precedente"
                            >
                                &#10094; 
                            </button>
                        )}

                        {/* Freccia Avanti Modale */}
                        {totalImages > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition z-50"
                                aria-label="Immagine successiva"
                            >
                                &#10095; 
                            </button>
                        )}
                        
                        {/* Indicatore Immagine Corrente Modale */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white p-2 rounded-lg bg-gray-800 bg-opacity-50">
                            {mainImageIndex + 1} / {totalImages}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};