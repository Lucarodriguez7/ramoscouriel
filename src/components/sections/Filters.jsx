import { Search, Filter, Home, DollarSign, Building, RotateCcw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Filters() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Estado local para los filtros antes de aplicar
    const [localFilters, setLocalFilters] = useState({
        search: searchParams.get('search') || '',
        type: searchParams.get('type') || '',
        operation: searchParams.get('operation') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        currency: searchParams.get('currency') || 'USD',
        rooms: searchParams.get('rooms') || ''
    });

    // Actualizar un filtro local
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({ ...prev, [name]: value }));
    };

    // Aplicar filtros a la URL y volver a la página 1
    const applyFilters = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams();
        
        Object.keys(localFilters).forEach(key => {
            if (localFilters[key]) {
                newParams.set(key, localFilters[key]);
            }
        });
        
    // Siempre volver a la página 1 al aplicar filtros
        newParams.set('page', '1');
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setLocalFilters({
            search: '',
            type: '',
            operation: '',
            minPrice: '',
            maxPrice: '',
            currency: 'USD',
            rooms: ''
        });
        setSearchParams(new URLSearchParams({ page: '1' }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Sincronizar estado local si cambia la URL por fuera
    useEffect(() => {
        setLocalFilters({
            search: searchParams.get('search') || '',
            type: searchParams.get('type') || '',
            operation: searchParams.get('operation') || '',
            minPrice: searchParams.get('minPrice') || '',
            maxPrice: searchParams.get('maxPrice') || '',
            currency: searchParams.get('currency') || 'USD',
            rooms: searchParams.get('rooms') || ''
        });
    }, [searchParams]);

    return (
        <form onSubmit={applyFilters} className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-8 rounded-lg shadow-2xl relative z-20 mx-4 md:mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
                
                {/* Buscador de texto */}
                <div className="md:col-span-2 lg:col-span-2">
                    <label className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.15em] font-bold mb-2 block flex items-center gap-1.5"><Search className="w-3 h-3"/> Buscar</label>
                    <input 
                        type="text" 
                        name="search"
                        value={localFilters.search}
                        onChange={handleChange}
                        placeholder="Barrio, calle, palabra clave..." 
                        className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500"
                    />
                </div>

                {/* Tipo de Propiedad */}
                <div>
                    <label className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.15em] font-bold mb-2 block flex items-center gap-1.5"><Building className="w-3 h-3"/> Tipo</label>
                    <select 
                        name="type" 
                        value={localFilters.type}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                        <option value="" className="text-black">Todos</option>
                        <option value="Departamento" className="text-black">Departamento</option>
                        <option value="Casa" className="text-black">Casa</option>
                        <option value="Local" className="text-black">Local</option>
                        <option value="Terreno" className="text-black">Lote/Terreno</option>
                    </select>
                </div>

                {/* Operación */}
                <div>
                    <label className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.15em] font-bold mb-2 block flex items-center gap-1.5"><Home className="w-3 h-3"/> Operación</label>
                    <select 
                        name="operation" 
                        value={localFilters.operation}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                        <option value="" className="text-black">Cualquiera</option>
                        <option value="Venta" className="text-black">Venta</option>
                        <option value="Alquiler" className="text-black">Alquiler</option>
                        <option value="Alquiler Temporal" className="text-black">Alquiler Temporal</option>
                    </select>
                </div>

                {/* Rango de Precio */}
                <div className="md:col-span-2 lg:col-span-1">
                    <label className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.15em] font-bold mb-2 block flex items-center gap-1.5"><DollarSign className="w-3 h-3"/> Precio (Min - Max)</label>
                    <div className="flex gap-2">
                        <select 
                            name="currency" 
                            value={localFilters.currency}
                            onChange={handleChange}
                            className="bg-white/10 border border-white/20 text-white p-3 rounded-sm text-xs outline-none focus:border-accent transition-colors appearance-none cursor-pointer w-20"
                        >
                            <option value="USD" className="text-black">U$D</option>
                            <option value="ARS" className="text-black">$ ARS</option>
                        </select>
                        <input 
                            type="number" 
                            name="minPrice" 
                            value={localFilters.minPrice}
                            onChange={handleChange}
                            placeholder="Min" 
                            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500"
                        />
                        <input 
                            type="number" 
                            name="maxPrice" 
                            value={localFilters.maxPrice}
                            onChange={handleChange}
                            placeholder="Max" 
                            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Ambientes */}
                <div>
                    <label className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.15em] font-bold mb-2 block flex items-center gap-1.5"><Building className="w-3 h-3"/> Ambientes</label>
                    <select 
                        name="rooms" 
                        value={localFilters.rooms}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-sm text-sm outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                    >
                        <option value="" className="text-black">Indistinto</option>
                        <option value="1" className="text-black">1 Ambiente</option>
                        <option value="2" className="text-black">2 Ambientes</option>
                        <option value="3" className="text-black">3 Ambientes</option>
                        <option value="4" className="text-black">4+ Ambientes</option>
                    </select>
                </div>

                {/* Botones de Acción */}
                <div className="md:col-span-4 lg:col-span-6 flex flex-wrap justify-end gap-3 mt-4 lg:mt-6">
                    <button 
                        type="button"
                        onClick={clearFilters}
                        className="bg-white/10 text-white/70 border border-white/10 px-8 py-3.5 font-bold tracking-widest text-[10px] uppercase hover:bg-white/20 hover:text-white transition-all duration-500 rounded-sm flex items-center gap-2"
                    >
                        <RotateCcw className="w-3.5 h-3.5"/> Limpiar Filtros
                    </button>
                    <button 
                        type="submit" 
                        className="bg-accent text-white px-8 py-3.5 font-bold tracking-widest text-[10px] uppercase hover:bg-white hover:text-navy transition-all duration-500 shadow-xl shadow-accent/20 rounded-sm flex items-center gap-2"
                    >
                        <Filter className="w-4 h-4"/> Aplicar Filtros
                    </button>
                </div>

            </div>
        </form>
    );
}
