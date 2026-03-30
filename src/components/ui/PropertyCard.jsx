import { MapPin, Maximize, Bath, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
    // Usamos la fakeImage provista por el mock, en prod sería property.photos[0]?.image
    const imageUrl = property.fakeImage || property.photos?.[0]?.image || 'https://via.placeholder.com/800x600?text=Sin+Imagen';
    const operation = property.operations?.[0];
    const isSale = operation?.operation_type === 'Venta';
    const tagText = operation?.operation_type || 'Exclusivo';
    const price = operation?.prices?.[0] 
        ? `${operation.prices[0].currency} ${operation.prices[0].price.toLocaleString('es-AR')}`
        : 'Consultar';

    return (
        <Link to={`/propiedad/${property.id}`} className="block group relative overflow-hidden bg-navy-light/60 border border-white/[0.06] rounded-md cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_rgba(0,123,255,0.08)]">
            
            {/* Imagen con zoom on hover */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={property.address}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Overlay degradado base */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Tag Operación */}
                <div className="absolute top-4 left-4 z-10">
                    <span className={`backdrop-blur-md text-white text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm ${isSale ? 'bg-accent/90' : 'bg-gray-800/80 border border-white/10'}`}>
                        {tagText}
                    </span>
                </div>
                
                {/* Ref (esquina superior derecha) */}
                <div className="absolute top-4 right-4 z-10">
                    <span className="text-white/60 bg-black/40 backdrop-blur-sm text-[10px] font-sans px-2 py-1 rounded-sm tracking-wider">
                        {property.reference_code || `REF-${property.id}`}
                    </span>
                </div>
            </div>

            {/* Contenido / Info */}
            <div className="p-6 relative z-10 bg-gradient-to-t from-navy to-navy-light/90 -mt-10">
                <div className="flex items-center gap-1.5 text-gray-400/90 text-[11px] font-sans tracking-wide mb-2 uppercase">
                    <MapPin className="w-3 h-3 text-accent" />
                    <span className="truncate">{property.location?.short_location || '-'}, {property.address}</span>
                </div>
                
                {/* Tipo de propiedad */}
                <span className="block text-accent/80 text-[10px] font-sans tracking-[0.2em] uppercase mb-1">
                    {property.type?.name || 'Inmueble'}
                </span>

                {/* Precio destacado en tipografía Serif */}
                <div className="mb-5 flex justify-between items-center border-b border-white/5 pb-4">
                    <h3 className="font-serif text-2xl lg:text-3xl text-white">
                        {price}
                    </h3>
                </div>

                {/* Línea de íconos (m2, baños, amb) */}
                <div className="flex items-center justify-between text-gray-400 text-xs font-sans tracking-wider">
                    <div className="flex items-center gap-1.5" title="Superficie total">
                        <Maximize className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors" />
                        <span>{property.total_surface} m²</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Ambientes/Suites">
                        <Bed className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors" />
                        <span>{property.suite_amount} {property.suite_amount === 1 ? 'Amb' : 'Ambs'}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Baños">
                        <Bath className="w-4 h-4 text-white/50 group-hover:text-accent transition-colors" />
                        <span>{property.bathroom_amount} {property.bathroom_amount === 1 ? 'Baño' : 'Baños'}</span>
                    </div>
                </div>
                
                {/* Hover line base */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </Link>
    );
}
