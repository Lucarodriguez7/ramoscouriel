import { Newspaper, ArrowRight, Clock } from 'lucide-react';

const articles = [
    {
        image: 'https://imgur.com/keJ7SjT.jpg',
        title: 'Ochentosos y con estilo: los 5 chalets más caros y lujosos que se venden en Buenos Aires',
        source: 'Infobae',
        date: '15 oct 2022',
        excerpt: '“Muchos de estos chalets, tras reformas, ofrecen a los compradores la posibilidad de adquirir no solo una vivienda, sino también un hogar con piscina, quincho y parrilla, agregando un toque adicional de comodidad y lujo a la experiencia de vivir en estos inmuebles”, dijo a Infobae Leonardo Ramos Couriel, de Ramos Couriel Real Estate.',
        url: 'https://www.infobae.com/economia/2025/01/20/por-que-nueva-york-atrae-a-inversores-argentinos-y-de-america-latina-un-recorrido-por-propiedades-que-rondan-el-millon-de-dolares/',
    },
    {
        image: 'https://imgur.com/keJ7SjT.jpg',
        title: 'Boulevard de moda: el barrio porteño que sorprende con inversiones en 800 viviendas y gastronomía',
        source: 'Infobae',
        date: '26 oct 2023',
        excerpt: 'Leonardo Ramos Couriel, de Ramos Couriel Real Estate, señaló a Infobae: “Saavedra se ha convertido en uno de los barrios más buscados y de moda, un fenómeno que se debe principalmente a sus extensos espacios verdes, altamente valorados durante la pandemia. Su paisaje, caracterizado por construcciones bajas como casas, PH y edificios de poca altura, crea un entorno con abundante luz y áreas verdes, lo que atrae a aquellos que buscan espacios amplios y luminosos con una conexión visual con la naturaleza”.',
        url: 'https://www.infobae.com/economia/2023/10/26/boulevard-de-moda-el-barrio-porteno-que-sorprende-con-inversiones-en-800-viviendas-y-gastronomia/',
    },
    {
        image: 'https://imgur.com/keJ7SjT.jpg',
        title: 'Cómo el rediseño interior y la iluminación mejoran el confort y el precio de la vivienda',
        source: 'Infobae',
        date: '1 oct 2023',
        excerpt: 'Leonardo Ramos Couriel, de Ramos Couriel Real Estate, contó a Infobae que “una vivienda puede perder valor si su decoración es demasiado excéntrica y no se ajusta al gusto general. Los departamentos sencillos y actualizados, especialmente en áreas como baños y cocinas, suelen ser más atractivos. Hay compradores que valoran estos detalles, aunque también existe un segmento que prefiere personalizar la propiedad a su gusto”.',
        url: 'https://www.infobae.com/economia/2023/10/02/como-el-rediseno-interior-y-la-iluminacion-mejoran-el-confort-y-el-precio-de-la-vivienda/',
    },
];

export default function MediaPress() {
    return (
        <section id="medios" className="relative bg-navy py-28 md:py-32">
            {/* Top divider */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Section Header */}
            <div className="container mx-auto px-6 mb-16">
                <div className="text-center max-w-2xl mx-auto">
                    <span className="text-accent text-[11px] font-sans font-bold tracking-[0.3em] uppercase mb-4 block">
                        Prensa
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                        Ramos Couriel en <br />
                        <span className="italic text-accent">los Medios</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                        Nuestra visión del mercado inmobiliario en los principales medios del país.
                    </p>
                </div>
            </div>

            {/* Article Cards */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map(({ image, title, source, date, excerpt, url }) => (
                        <a
                            key={title}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-navy-light/60 border border-white/[0.06] rounded-lg overflow-hidden
                                transition-all duration-500 ease-out
                                hover:-translate-y-2 hover:border-accent/30
                                hover:shadow-[0_20px_60px_rgba(0,123,255,0.08)]"
                        >
                            {/* Image */}
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-transparent to-transparent" />
                                {/* Source badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-sans font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm">
                                        <Newspaper className="w-3 h-3" />
                                        {source}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-7 md:p-8">
                                <div className="flex items-center gap-2 text-gray-500 text-[11px] font-sans tracking-wider mb-4">
                                    <Clock className="w-3 h-3" />
                                    <span>{date}</span>
                                </div>

                                <h3 className="font-serif text-xl text-white mb-4 leading-snug group-hover:text-accent transition-colors duration-500">
                                    {title}
                                </h3>

                                <p className="text-gray-400/80 text-sm leading-relaxed font-light mb-6">
                                    {excerpt}
                                </p>

                                <span className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.2em] uppercase text-white/50 group-hover:text-accent transition-colors duration-500">
                                    Leer Artículo
                                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
