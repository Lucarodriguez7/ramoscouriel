import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tokkoService } from '../services/tokkoService';
import Filters from '../components/sections/Filters';
import PropertyCard from '../components/ui/PropertyCard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';
import WhatsappButton from '../components/ui/WhatsappButton';

const LIMIT_PER_PAGE = 30;

export default function Propiedades() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const currentPage = parseInt(searchParams.get('page')) || 1;

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                // Leer filtros de la URL
                const params = {
                    search: searchParams.get('search'),
                    type: searchParams.get('type'),
                    operation: searchParams.get('operation'),
                    minPrice: searchParams.get('minPrice'),
                    maxPrice: searchParams.get('maxPrice'),
                    currency: searchParams.get('currency'),
                    rooms: searchParams.get('rooms'),
                    limit: LIMIT_PER_PAGE,
                    offset: (currentPage - 1) * LIMIT_PER_PAGE
                };

                const data = await tokkoService.getProperties(params);
                setProperties(data.objects);
                setTotalCount(data.meta.total_count);
            } catch (error) {
                console.error("Error fetching properties", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchParams, currentPage]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
    };

    const totalPages = Math.ceil(totalCount / LIMIT_PER_PAGE);

    return (
        <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white pt-24">
            <Navbar />
            
            <main className="pb-20">
                {/* Header de la seccion */}
                <div className="container mx-auto px-6 py-12 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                            Catálogo
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                            Nuestras <span className="italic text-accent">Propiedades</span>
                        </h1>
                        <p className="text-gray-400 text-sm font-light">
                            Encontrá la propiedad ideal en Buenos Aires con nuestros filtros avanzados.
                        </p>
                    </div>

                    {/* Componente de Filtros (Glassmorphism) */}
                    <Filters />
                </div>

                <div className="container mx-auto px-6 mt-8">
                    {/* Resultados / Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="text-center py-20 border border-white/10 rounded-lg bg-navy-light/30">
                            <p className="text-gray-400 font-sans tracking-wide">
                                No se encontraron propiedades con esos filtros.
                            </p>
                            <button 
                                onClick={() => setSearchParams(new URLSearchParams())}
                                className="mt-4 text-accent text-xs font-bold uppercase tracking-widest hover:underline"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-[11px] text-gray-500 font-sans tracking-[0.1em] uppercase mb-6">
                                Mostrando {properties.length} de {totalCount} resultados
                            </div>
                            
                            {/* Grilla de Propiedades */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {properties.map((prop) => (
                                    <PropertyCard key={prop.id} property={prop} />
                                ))}
                            </div>

                            {/* Paginación */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-16">
                                    <button 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    
                                    <div className="flex gap-1 mx-2">
                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-sm text-xs font-bold transition-colors ${
                                                    currentPage === i + 1 
                                                    ? 'bg-accent text-white border border-accent' 
                                                    : 'bg-transparent border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <Footer />
            <WhatsappButton />
        </div>
    );
}
