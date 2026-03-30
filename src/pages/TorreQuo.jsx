import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';
import { 
    Dumbbell, Waves, Users, Music, Sun, 
    MessageCircle, FileText, ChevronLeft, ChevronRight, X 
} from 'lucide-react';

export default function TorreQuo() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, []);

    const whatsappText = encodeURIComponent("Hola Ramos Couriel! Me interesa obtener más información sobre Torre Quo.");
    const whatsappLink = `https://wa.me/5491132307600?text=${whatsappText}`;

    const amenitiesImages = [
        'https://imgur.com/rjTjoN3.jpg', 
        'https://imgur.com/EnYBWrV.jpg', 
        'https://imgur.com/rL8XzdE.jpg', 
        'https://imgur.com/IcbCdag.jpg', 
        'https://imgur.com/WjyCthT.jpg', 
        'https://imgur.com/He9nhf8.jpg', 
        'https://imgur.com/jbkzVRa.jpg', 
        'https://imgur.com/uhsVZVO.jpg', 
        'https://imgur.com/SRHa1Ol.jpg'
    ];

    const overviewImages = [
        'https://imgur.com/tUEeZvY.jpg', 
        'https://imgur.com/UG8X5uU.jpg', 
        'https://imgur.com/bJ7F8Uy.jpg', 
        'https://imgur.com/DwIv8ii.jpg', 
        'https://imgur.com/PrvG4Fj.jpg', 
        'https://imgur.com/vfkZJFn.jpg', 
        'https://imgur.com/rgXP9h6.jpg', 
        'https://imgur.com/hOW6OMA.jpg', 
        'https://imgur.com/MbC7uEK.jpg'
    ];

    const amenities = [
        { icon: Dumbbell, text: "Gimnasio (con Spinning, musculación y yoga)" },
        { icon: Waves, text: "Pileta cubierta semiolímpica (wellness)" },
        { icon: Users, text: "Bar & Co-working" },
        { icon: Music, text: "Sala de ensayo" },
        { icon: Users, text: "Kids Club y Teens Club" },
        { icon: Sun, text: "Pileta con solarium y vista panorámica" }
    ];

    // Lightbox State
    const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

    const openLightbox = (imagesArray, idx) => {
        document.body.style.overflow = 'hidden';
        setLightbox({ isOpen: true, images: imagesArray, index: idx });
    };

    const closeLightbox = () => {
        document.body.style.overflow = 'unset';
        setLightbox({ ...lightbox, isOpen: false });
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
    };

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-0 overflow-x-hidden">
            <style>
                {`
                    @keyframes fade-in-up {
                        0% { opacity: 0; transform: translateY(30px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in-up {
                        animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .delay-300 { animation-delay: 0.3s; }
                    .delay-500 { animation-delay: 0.5s; }
                `}
            </style>
            
            <Navbar />

            <main>
                {/* Hero Torre QUO */}
                <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={overviewImages[2]} // Using an overview image as hero bg
                            alt="Torre QUO" 
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-navy/80 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                    </div>

                    <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in-up">
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none mb-6 text-white drop-shadow-2xl">
                            Torre <span className="italic text-accent">QUO</span>
                        </h1>
                        <p className="text-xl font-light text-gray-300 max-w-2xl mx-auto drop-shadow-md">
                            Un ícono de altura en Buenos Aires.
                        </p>
                    </div>
                </section>

                {/* EL PROYECTO (Overview) */}
                <section className="py-24 md:py-32 relative z-10 container mx-auto max-w-7xl px-6">
                    <div className="mb-16 text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">
                            EL PROYECTO
                        </h2>
                        <div className="w-12 h-px bg-accent mb-8 mx-auto"></div>
                        <p className="text-gray-400 font-sans font-light text-base md:text-lg leading-relaxed">
                            Un ícono de altura emplazado en el punto norte de la ciudad de Buenos Aires, sobre las calles Vilela y Comodoro Rivadavia. Un proyecto joven, moderno y contemporáneo que es resultado de la experiencia y el diseño de Brodyfriedman.
                        </p>
                    </div>

                    {/* Overview Gallery */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-aos="fade-up" data-aos-delay="200">
                        {overviewImages.map((imgSrc, idx) => (
                            <div 
                                key={`overview-${idx}`}
                                onClick={() => openLightbox(overviewImages, idx)}
                                className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group bg-navy-light/50"
                            >
                                <img 
                                    src={imgSrc} 
                                    alt={`Overview ${idx + 1}`} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white text-xs uppercase tracking-widest font-bold font-sans border border-white/30 px-4 py-2 rounded-sm backdrop-blur-sm">Ver Imagen</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AMENITIES */}
                <section className="bg-navy-light relative border-t border-b border-white/5 py-24 md:py-32">
                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        
                        <div className="text-center mb-16" data-aos="fade-up">
                            <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                                Exclusividad 360°
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">
                                AMENITIES <br/>
                                <span className="italic font-light text-2xl md:text-4xl text-gray-300">para vivir una vida bien arriba</span>
                            </h2>
                            <p className="text-gray-400 font-light text-base max-w-2xl mx-auto">
                                Torre QUO da lugar a cada necesidad.
                            </p>
                        </div>

                        {/* Icons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24" data-aos="fade-up" data-aos-delay="200">
                            {amenities.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-8 bg-navy border border-white/5 rounded-sm hover:border-accent/30 hover:bg-white/5 transition-all duration-500 group">
                                    <div className="w-16 h-16 rounded-full bg-navy-light border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                                        <item.icon className="w-6 h-6 text-accent" />
                                    </div>
                                    <p className="text-white font-sans font-light text-sm leading-relaxed max-w-[200px]">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Amenities Gallery */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-aos="fade-up">
                            {amenitiesImages.map((imgSrc, idx) => (
                                <div 
                                    key={`amenity-${idx}`}
                                    onClick={() => openLightbox(amenitiesImages, idx)}
                                    className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group bg-navy-light/50"
                                >
                                    <img 
                                        src={imgSrc} 
                                        alt={`Amenity ${idx + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="text-white text-xs uppercase tracking-widest font-bold font-sans border border-white/30 px-4 py-2 rounded-sm backdrop-blur-sm">Ver Imagen</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-24" data-aos="fade-up">
                            <h3 className="font-serif text-3xl md:text-5xl text-accent italic">
                                "Podes tener todo. <br className="md:hidden" /> Y podes tenerlo ahora."
                            </h3>
                        </div>
                    </div>
                </section>

                {/* CTAs Finales */}
                <section className="bg-white/5 border-t border-white/10 py-24 relative overflow-hidden">
                    <div className="container mx-auto px-6 text-center max-w-4xl relative z-10" data-aos="fade-in">
                        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Asegurá tu lugar en la cima</h2>
                        <p className="text-gray-400 font-sans font-light text-sm md:text-base mb-12 max-w-2xl mx-auto">
                            Comunicate directamente con nuestros asesores comerciales para conocer el stock disponible, planos detallados y cotizaciones a medida.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto bg-[#25D366] text-white px-8 py-5 font-sans font-bold text-xs tracking-widest uppercase hover:bg-[#1ebd59] transition-all duration-300 rounded-sm shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3"
                            >
                                <MessageCircle className="w-4 h-4 fill-white" />
                                Consultar Disponibilidad
                            </a>
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-5 font-sans font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-navy hover:border-white transition-all duration-300 rounded-sm flex items-center justify-center gap-3"
                            >
                                <FileText className="w-4 h-4" />
                                Solicitar Brochure
                            </a>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
            <WhatsappButton />

            {/* LIGHTBOX MODAL PREMIUM */}
            {lightbox.isOpen && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center transition-opacity duration-300" onClick={closeLightbox}>
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                    >
                        <X className="w-10 h-10" />
                    </button>
                    
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 md:left-10 text-white/50 hover:text-white hover:scale-110 transition-all z-[110]"
                    >
                        <ChevronLeft className="w-12 h-12" />
                    </button>

                    <div className="relative w-full max-w-5xl max-h-[85vh] px-16 flex items-center justify-center outline-none" onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={lightbox.images[lightbox.index]} 
                            alt="Galería" 
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-fade-in-up" 
                            style={{ animationDuration: '0.4s' }}
                        />
                        {/* Indicador Numérico */}
                        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/50 font-sans tracking-widest text-xs">
                            {lightbox.index + 1} / {lightbox.images.length}
                        </div>
                    </div>

                    <button 
                        onClick={nextImage}
                        className="absolute right-4 md:right-10 text-white/50 hover:text-white hover:scale-110 transition-all z-[110]"
                    >
                        <ChevronRight className="w-12 h-12" />
                    </button>
                </div>
            )}
        </div>
    );
}
