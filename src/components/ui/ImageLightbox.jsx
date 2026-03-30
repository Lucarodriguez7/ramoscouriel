import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Download } from 'lucide-react';

export default function ImageLightbox({ images, startIndex = 0, isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(startIndex);
            // Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, startIndex]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    }, [isOpen, handleNext, handlePrev, onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-navy/95 backdrop-blur-xl flex flex-col items-center justify-center select-none"
                    onClick={onClose}
                >
                {/* Header / Toolbar */}
                <div className="absolute top-0 inset-x-0 h-20 px-6 flex items-center justify-between z-10 pointer-events-none">
                    <div className="text-white/60 font-sans text-xs tracking-[0.3em] font-bold uppercase pointer-events-auto">
                        {currentIndex + 1} <span className="opacity-40">/</span> {images.length}
                    </div>
                    
                    <div className="flex items-center gap-4 pointer-events-auto">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = images[currentIndex]?.image;
                                link.download = `property-image-${currentIndex + 1}.jpg`;
                                link.target = '_blank';
                                link.click();
                            }}
                            className="p-3 text-white/70 hover:text-accent hover:scale-110 transition-all"
                            title="Descargar"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={onClose}
                            className="p-3 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300 transform group"
                            title="Cerrar"
                        >
                            <X className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-4 md:left-8 z-20 p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-accent hover:bg-white/10 hover:border-accent/40 hover:-translate-x-1 transition-all"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>

                <button 
                    onClick={handleNext}
                    className="absolute right-4 md:right-8 z-20 p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-accent hover:bg-white/10 hover:border-accent/40 hover:translate-x-1 transition-all"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>

                {/* Main Content */}
                <motion.div 
                    key={currentIndex}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    className="w-full max-w-7xl px-4 md:px-12 h-screen max-h-[85vh] flex items-center justify-center p-4 md:p-12"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img 
                        src={images[currentIndex]?.image} 
                        alt={`Property view ${currentIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                    />
                </motion.div>

                {/* Footer Info (Optional) */}
                <div className="absolute bottom-10 inset-x-0 text-center text-white/40 font-sans text-[10px] tracking-widest uppercase px-6">
                    Ramos Couriel | Premium Real Estate Experience
                </div>

            </motion.div>
            )}
        </AnimatePresence>
    );
}
