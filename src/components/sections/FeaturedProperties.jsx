import { useState, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tokkoService } from '../../services/tokkoService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const premiumImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200'
];

// Fallback Properties en caso de error o sin API Key
const fallbackData = [
    {
        id: 'torre-quo',
        isEmprendimiento: true,
        photos: [{ image: 'https://imgur.com/bJ7F8Uy.jpg' }],
        publication_title: 'Torre Quo - Emprendimiento Premium',
        address: 'Comodoro Rivadavia, Núñez',
        operations: [{ prices: [{ currency: 'USD', price: 1500000 }] }]
    },
    {
        id: 102,
        photos: [{ image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200' }],
        publication_title: 'Residencia en Palermo Chico',
        address: 'Palermo Chico, CABA',
        operations: [{ prices: [{ currency: 'USD', price: 1250000 }] }]
    },
    {
        id: 103,
        photos: [{ image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800' }],
        publication_title: 'Departamento Vista Río',
        address: 'Puerto Madero, CABA',
        operations: [{ prices: [{ currency: 'USD', price: 950000 }] }]
    },
    {
        id: 104,
        photos: [{ image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800' }],
        publication_title: 'Casa Bosque',
        address: 'Nordelta, Tigre',
        operations: [{ prices: [{ currency: 'USD', price: 850000 }] }]
    },
    {
        id: 105,
        photos: [{ image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200' }],
        publication_title: 'Penthouse Exclusivo',
        address: 'Belgrano, CABA',
        operations: [{ prices: [{ currency: 'USD', price: 780000 }] }]
    }
];

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await tokkoService.getProperties({ limit: 15, operation: 'Venta' });
                if (response && response.objects && response.objects.length > 0) {
                    // Ordenar por precio descendente
                    const sorted = [...response.objects].sort((a, b) => {
                        const priceA = a.operations?.[0]?.prices?.[0]?.price || 0;
                        const priceB = b.operations?.[0]?.prices?.[0]?.price || 0;
                        return priceB - priceA;
                    });
                    setProperties(sorted.slice(0, 5));
                } else {
                    setProperties(fallbackData);
                }
            } catch (error) {
                console.error("Error fetching Top 5 properties:", error);
                setProperties(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const formatPrice = (operations) => {
        if (!operations || operations.length === 0) return 'Consultar';
        const priceObj = operations[0].prices?.[0];
        if (!priceObj || !priceObj.price) return 'Consultar';
        return `${priceObj.currency} ${priceObj.price.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".")}`;
    };

    const getLayoutSpan = (idx) => {
        if (idx === 0) return 'col-span-2 row-span-2 aspect-auto';
        return 'col-span-1 row-span-1 aspect-[4/3] md:aspect-auto';
    };

    const getBadge = (idx) => {
        if (idx === 0) return 'DESTACADA';
        if (idx === 1) return 'EXCLUSIVA';
        return null;
    };

    return (
        <section id="propiedades" className="relative bg-navy py-28 md:py-32 overflow-hidden">
            {/* Ambient Shadow glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" data-aos="fade-up">
                    <div>
                        <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                            Portfolio
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                            Vitrina <br className="hidden md:block" />
                            <span className="italic text-accent">Premium</span>
                        </h2>
                    </div>
                    <Link
                        to="/propiedades"
                        className="inline-flex items-center gap-3 text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/60 hover:text-accent transition-colors duration-500 self-start md:self-auto"
                    >
                        Ver Catálogo Completo
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {loading ? (
                    <div className="h-[600px] flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Desktop Bento Grid */}
                        <div className="hidden md:grid grid-cols-4 auto-rows-[280px] gap-4" data-aos="fade-up" data-aos-delay="200">
                            {properties.map((prop, idx) => (
                                <PropertyCard
                                    key={prop.id}
                                    property={prop}
                                    priceFormatted={formatPrice(prop.operations)}
                                    tag={getBadge(idx)}
                                    className={getLayoutSpan(idx)}
                                    unsplashImg={premiumImages[idx % premiumImages.length]}
                                />
                            ))}
                        </div>

                        {/* Mobile Swiper (Super Premium deslizar) */}
                        <div className="md:hidden mt-8 -mx-6 px-6" data-aos="fade-up" data-aos-delay="200">
                            <Swiper
                                slidesPerView={1.15}
                                spaceBetween={16}
                                freeMode={true}
                                modules={[FreeMode]}
                                slidesOffsetBefore={24}
                                slidesOffsetAfter={24}
                                className="w-full pb-8"
                                style={{ overflow: 'visible' }}
                            >
                                {properties.map((prop, idx) => (
                                    <SwiperSlide key={prop.id}>
                                        <PropertyCard
                                            property={prop}
                                            priceFormatted={formatPrice(prop.operations)}
                                            tag={getBadge(idx)}
                                            className="aspect-[4/5] w-full"
                                            unsplashImg={premiumImages[idx % premiumImages.length]}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

function PropertyCard({ property, priceFormatted, tag, className = '', unsplashImg }) {
    const imageUrl = unsplashImg || property.photos?.[0]?.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800';
    const linkPath = property.isEmprendimiento ? '/emprendimientos/torre-quo' : `/propiedad/${property.id}`;
    
    return (
        <Link
            to={linkPath}
            className={`group relative overflow-hidden cursor-pointer rounded-lg bg-white/5
                border border-white/5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                hover:border-accent/40 hover:shadow-[0_0_40px_rgba(0,123,255,0.15)] hover:-translate-y-1 block
                ${className}`}
        >
            <img
                src={imageUrl}
                alt={property.publication_title || 'Propiedad de Lujo'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            {/* Overlay Dinámico Dark Premium */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Badges Exclusivos */}
            {tag && (
                <div className="absolute top-5 left-5 z-10">
                    <span className="bg-accent/80 backdrop-blur-md border border-accent text-white text-[9px] font-sans font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-sm shadow-xl">
                        {tag}
                    </span>
                </div>
            )}

            {/* Info inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-0 translate-y-2">
                    <div className="flex items-center gap-1.5 text-gray-300 text-[10px] sm:text-[11px] font-sans tracking-wide mb-2 uppercase opacity-80">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="truncate">{property.address || 'Buenos Aires, Argentina'}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl sm:text-2xl text-white mb-3 leading-snug truncate">
                        {property.publication_title || 'Residencia Exclusiva'}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                        <span className="font-serif italic text-accent text-lg tracking-wide">
                            {priceFormatted}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
