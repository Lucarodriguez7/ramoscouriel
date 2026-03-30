import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tokkoService } from '../services/tokkoService';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import PropertyCard from '../components/ui/PropertyCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { 
    MapPin, Maximize, Bath, Bed, Car, Heart, Share2, 
    ArrowLeft, Home, FileText, CheckCircle2, MessageCircle,
    Expand
} from 'lucide-react';
import ImageLightbox from '../components/ui/ImageLightbox';

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await tokkoService.getPropertyById(id);
                setProperty(data);

                // Fetch similar properties
                if (data && data.type?.name) {
                    const similar = await tokkoService.getProperties({ 
                        type: data.type.name, 
                        limit: 4 
                    });
                    // Filter out current property and take exactly 3
                    const filtered = similar.objects.filter(p => p.id !== data.id).slice(0, 3);
                    setSimilarProperties(filtered);
                }

                // Check favorites
                const favs = JSON.parse(localStorage.getItem('rc_favorites') || '[]');
                setIsFavorite(favs.includes(data.id));

            } catch (error) {
                console.error("Error fetching property detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const toggleFavorite = () => {
        const favs = JSON.parse(localStorage.getItem('rc_favorites') || '[]');
        let newFavs;
        if (isFavorite) {
            newFavs = favs.filter(favId => favId !== property.id);
        } else {
            newFavs = [...favs, property.id];
        }
        localStorage.setItem('rc_favorites', JSON.stringify(newFavs));
        setIsFavorite(!isFavorite);
    };

    const openLightbox = (index) => {
        setActivePhotoIndex(index);
        setIsLightboxOpen(true);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Ramos Couriel | ${property.type?.name} en ${property.location?.short_location}`,
                    text: `Mirá esta excelente propiedad que encontré en Ramos Couriel. Ref: ${property.reference_code}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('¡Link copiado al portapapeles!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-navy flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-navy text-white flex flex-col items-center justify-center pt-24">
                <Navbar />
                <h2 className="font-serif text-4xl mb-6">Propiedad no encontrada</h2>
                <Link to="/propiedades" className="text-accent underline tracking-widest font-sans uppercase text-sm">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    const unformattedPrice = property.operations?.[0]?.prices?.[0]?.price;
    const currency = property.operations?.[0]?.prices?.[0]?.currency;
    const priceStr = unformattedPrice ? `${currency} ${unformattedPrice.toLocaleString('es-AR')}` : 'Consultar';
    const tagText = property.operations?.[0]?.operation_type;
    const operationIsSale = tagText === 'Venta';

    const whatsappMessage = encodeURIComponent(`Hola Ramos Couriel! Me interesa la propiedad ${property.type?.name} en ${property.location?.short_location} (Ref: ${property.reference_code}) que vi en su web.`);
    const whatsappLink = `https://wa.me/5491132307600?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24 pb-20">
            <Navbar />

            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                
                {/* Back Link */}
                <Link to="/propiedades" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors font-sans text-[11px] font-bold tracking-[0.2em] mb-6 uppercase">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al catálogo
                </Link>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
                    
                    {/* Left Column: Gallery & Details (Col Span 8) */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* Title & Mobile Header */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm ${operationIsSale ? 'bg-accent/90 text-white' : 'bg-gray-800 border border-white/10 text-white'}`}>
                                    {tagText}
                                </span>
                                <span className="text-gray-400 text-[11px] font-sans tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
                                    REF: {property.reference_code}
                                </span>
                            </div>
                            <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
                                {property.type?.name} en <span className="italic text-accent">{property.location?.short_location}</span>
                            </h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-400 font-sans text-sm tracking-wide">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    {property.address}
                                </div>
                            </div>
                        </div>

                        {/* Gallery Swiper */}
                        <div className="relative rounded-lg overflow-hidden group border border-white/5 shadow-2xl">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: true }}
                                loop={true}
                                className="w-full aspect-video md:aspect-[21/9] bg-navy-light"
                            >
                                {property.photos?.map((photo, index) => (
                                    <SwiperSlide key={index}>
                                        <div 
                                            className="w-full h-full relative cursor-zoom-in group"
                                            onClick={() => openLightbox(index)}
                                        >
                                            <img 
                                                src={photo.image}
                                                alt={`Vista ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transform scale-75 group-hover:scale-100 transition-all duration-500">
                                                    <Expand className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            {/* Gradient for better arrow visibility */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/60 to-transparent pointer-events-none" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Floating Action Butons */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button 
                                    onClick={toggleFavorite}
                                    className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 shadow-xl"
                                    title="Favoritos"
                                >
                                    <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                </button>
                                <button 
                                    onClick={handleShare}
                                    className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 shadow-xl"
                                    title="Compartir"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-y border-white/10">
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-md border border-white/5">
                                <Maximize className="w-5 h-5 text-accent mb-2" />
                                <span className="text-white font-bold font-sans text-sm">{property.total_surface} m²</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Total</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-md border border-white/5">
                                <Home className="w-5 h-5 text-accent mb-2" />
                                <span className="text-white font-bold font-sans text-sm">{property.roofed_surface} m²</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Cubierto</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-md border border-white/5">
                                <Bed className="w-5 h-5 text-accent mb-2" />
                                <span className="text-white font-bold font-sans text-sm">{property.suite_amount}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ambientes</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-md border border-white/5">
                                <Bath className="w-5 h-5 text-accent mb-2" />
                                <span className="text-white font-bold font-sans text-sm">{property.bathroom_amount}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Baños</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-md border border-white/5">
                                <Car className="w-5 h-5 text-accent mb-2" />
                                <span className="text-white font-bold font-sans text-sm">{property.parking_lot_amount || 0}</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Cocheras</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-serif text-2xl mb-6 text-white flex items-center gap-3">
                                <FileText className="w-5 h-5 text-accent" />
                                Descripción de la propiedad
                            </h3>
                            <div className="prose prose-invert prose-p:font-light prose-p:leading-relaxed prose-p:text-gray-300 md:prose-lg max-w-none">
                                <p>{property.description}</p>
                                <p>Ofrecemos asesoramiento integral y personalizado. Contactanos para agendar una visita privada.</p>
                            </div>
                        </div>

                        {/* Map */}
                        {(property.geo_lat && property.geo_long) && (
                            <div className="pt-8 mb-8">
                                <h3 className="font-serif text-2xl mb-6 text-white flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-accent" />
                                    Ubicación Exacta
                                </h3>
                                <div className="rounded-lg overflow-hidden border border-white/10 h-80 bg-navy-light w-full">
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        frameBorder="0" 
                                        style={{ border: 0 }} 
                                        src={`https://maps.google.com/maps?q=${property.geo_lat},${property.geo_long}&z=15&output=embed`} 
                                        allowFullScreen 
                                        title={`Ubicación de ${property.reference_code}`}
                                    ></iframe>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 font-sans tracking-wide">
                                    La ubicación exacta puede variar. Datos provistos por Tokko Broker.
                                </p>
                            </div>
                        )}
                        
                    </div>


                    {/* Right Column: Sticky Panel (Col Span 4) */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="sticky top-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 md:p-8 shadow-2xl">
                            
                            {/* Price Highlights */}
                            <div className="mb-8 border-b border-white/10 pb-8 text-center pt-2">
                                <span className="text-[10px] text-gray-400 font-sans tracking-[0.2em] uppercase mb-2 block">
                                    Valor de la {tagText}
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl text-accent break-words">
                                    {priceStr}
                                </h2>
                                <p className="text-xs text-gray-500 mt-3 font-sans opacity-70">
                                    Gastos y comisiones no incluidos
                                </p>
                            </div>

                            {/* CTAs */}
                            <div className="space-y-4 mb-10">
                                <a 
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] text-white py-4 rounded-sm font-sans font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#1ebd59] transition-colors shadow-lg shadow-[#25D366]/20"
                                >
                                    <MessageCircle className="w-5 h-5 fill-white" />
                                    Consultar por WhatsApp
                                </a>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <h4 className="font-serif text-lg mb-4">Me interesa esta propiedad</h4>
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Formulario enviado (Demo)"); }}>
                                    <input 
                                        type="text" 
                                        placeholder="Nombre completo" 
                                        required
                                        className="w-full bg-navy-light/50 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500 font-sans"
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        required
                                        className="w-full bg-navy-light/50 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500 font-sans"
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Teléfono" 
                                        required
                                        className="w-full bg-navy-light/50 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500 font-sans"
                                    />
                                    <textarea 
                                        rows="3" 
                                        placeholder="Hola Ramos Couriel, me interesa esta propiedad..." 
                                        required
                                        className="w-full bg-navy-light/50 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500 font-sans resize-none"
                                        defaultValue={`Hola Ramos Couriel! Me interesa esta propiedad (Ref: ${property.reference_code}).`}
                                    ></textarea>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-accent text-white py-4 rounded-sm font-sans font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-navy transition-all duration-300"
                                    >
                                        Enviar Consulta
                                    </button>
                                </form>
                                <p className="text-[10px] text-gray-500 text-center mt-4 font-sans tracking-wide flex items-center justify-center gap-1.5 ">
                                    <CheckCircle2 className="w-3 h-3 text-accent" />
                                    Tus datos están protegidos.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-white/5">
                        <div className="text-center mb-12">
                            <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                                Recomendaciones
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl text-white">
                                También te puede interesar
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {similarProperties.map(prop => (
                                <PropertyCard key={prop.id} property={prop} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
            
            <Footer />

            {/* Lightbox Modal */}
            <ImageLightbox 
                images={property.photos || []}
                startIndex={activePhotoIndex}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />
        </div>
    );
}
