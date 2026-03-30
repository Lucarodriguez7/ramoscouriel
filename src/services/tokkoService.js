const API_KEY = null;
const BASE_URL = 'https://api.tokkobroker.com/v1/property/';

// Generar mock data extendida (más de 30 para probar paginación)
const generateMockProperties = () => {
    const types = ['Departamento', 'Casa', 'Terreno', 'Local'];
    const neighborhoods = ['Palermo', 'Recoleta', 'Puerto Madero', 'Belgrano', 'Nordelta', 'San Isidro'];
    const operations = ['Venta', 'Alquiler', 'Alquiler Temporal'];
    
    const mock = [];
    for (let i = 1; i <= 45; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const opType = operations[Math.floor(Math.random() * operations.length)];
        const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
        const isSale = opType === 'Venta';
        
        const price = isSale ? Math.floor(Math.random() * 900000 + 100000) : Math.floor(Math.random() * 3000 + 500);
        const currency = isSale ? 'USD' : (Math.random() > 0.5 ? 'USD' : 'ARS');
        
        mock.push({
            id: i,
            reference_code: `RC-${1000 + i}`,
            address: `Av. ${neighborhood} ${Math.floor(Math.random() * 5000)}`,
            description: `Exclusiva propiedad en ${neighborhood} con diseño de vanguardia y terminaciones de máxima categoría. Espacios luminosos, amplios ventanales y excelentemente distribuida. Ideal para quienes buscan confort, seguridad y estilo de vida premium en Buenos Aires. Posibilidad de financiación. Consultá por visitas personalizadas con nuestros asesores de Ramos Couriel.`,
            geo_lat: -34.583 + (Math.random() * 0.05 - 0.025), // Coordenadas aproximadas
            geo_long: -58.416 + (Math.random() * 0.05 - 0.025),
            location: {
                short_location: neighborhood
            },
            type: {
                name: type
            },
            total_surface: Math.floor(Math.random() * 200 + 50),
            roofed_surface: Math.floor(Math.random() * 150 + 40),
            suite_amount: Math.floor(Math.random() * 4 + 1),
            bathroom_amount: Math.floor(Math.random() * 3 + 1),
            parking_lot_amount: Math.floor(Math.random() * 2),
            operations: [
                {
                    operation_type: opType,
                    prices: [{ currency: currency, price: price }]
                }
            ],
            photos: [
                { image: `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800` },
                { image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' },
                { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800' },
                { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800' }
            ],
            // Usamos imagenes reales para la presentacion
            fakeImage: `https://images.unsplash.com/photo-${[
                '1600596542815-ffad4c1539a9', '1600585154340-be6161a56a0c', '1600607687939-ce8a6c25118c', 
                '1613490493576-7fde63acd811', '1512917774080-9991f1c4c750', '1564013799919-ab600027ffc6'
            ][i % 6]}?q=80&w=800`
        });
    }
    return mock;
};

const MOCK_PROPERTIES = generateMockProperties();

export const tokkoService = {
    getPropertyById: async (id) => {
        if (!API_KEY) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const found = MOCK_PROPERTIES.find(p => p.id === parseInt(id));
            if (found) {
                // Generamos un arreglo de fotos basándose en la fakeImage para el swiper
                const detailPhotos = [
                    { image: found.fakeImage },
                    ...found.photos.slice(1)
                ];
                return { ...found, photos: detailPhotos };
            }
            return null;
        }

        // Lógica real
        // const response = await fetch(`${BASE_URL}${id}/?key=${API_KEY}`);
        // return response.json();
    },

    getProperties: async (params = {}) => {
        const { limit = 30, offset = 0, search, type, operation, minPrice, maxPrice, rooms } = params;
        
        if (!API_KEY) {
            console.log('Using Mock Data - Tokko API_KEY is null');
            // Simulamos delay de red
            await new Promise(resolve => setTimeout(resolve, 500));
            
            let filtered = [...MOCK_PROPERTIES];
            
            if (search) {
                const searchLower = search.toLowerCase();
                filtered = filtered.filter(p => 
                    p.location.short_location.toLowerCase().includes(searchLower) ||
                    p.address.toLowerCase().includes(searchLower) ||
                    p.reference_code.toLowerCase().includes(searchLower)
                );
            }
            if (type) {
                filtered = filtered.filter(p => p.type.name.toLowerCase() === type.toLowerCase());
            }
            if (operation) {
                filtered = filtered.filter(p => p.operations.some(op => op.operation_type.toLowerCase() === operation.toLowerCase()));
            }
            if (minPrice) {
                filtered = filtered.filter(p => p.operations[0].prices[0].price >= parseInt(minPrice));
            }
            if (maxPrice) {
                filtered = filtered.filter(p => p.operations[0].prices[0].price <= parseInt(maxPrice));
            }
            if (rooms) {
                const roomCount = parseInt(rooms);
                if (roomCount >= 4) {
                    filtered = filtered.filter(p => p.suite_amount >= 4);
                } else {
                    filtered = filtered.filter(p => p.suite_amount === roomCount);
                }
            }

            const paginated = filtered.slice(offset, offset + limit);
            
            return {
                objects: paginated,
                meta: {
                    limit,
                    offset,
                    total_count: filtered.length
                }
            };
        }

        // Lógica real
        // const response = await fetch(`${BASE_URL}?key=${API_KEY}&limit=${limit}&offset=${offset}...`);
        // return response.json();
    },

    submitTasacion: async (data) => {
        // Mappeo para la metadata que Tokko acepta en el endpoint de Inquiries
        const payload = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            text: `Solicitud de Tasación:
Tipo: ${data.propertyType}
Dirección: ${data.address}
Metros Cuadrados: ${data.m2}
Ambientes: ${data.rooms}
Mensaje Adicional: ${data.message || 'Sin mensaje adicional'}`,
            // property_id se enviaría nulo si es una tasación genérica, 
            // aunque tokko permite pasarlo si la inquiry es por una propiedad en particular
        };

        if (!API_KEY) {
            console.log('Using Mock Data - Tokko API_KEY is null, Payload:', payload);
            // Simulamos delay de red y respuesta exitosa
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { success: true, message: 'Tasación mock enviada exitosamente.' };
        }

        // Lógica real hacia Tokko
        // try {
        //     const response = await fetch(`https://api.tokkobroker.com/v1/inquiry/?key=${API_KEY}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(payload)
        //     });
        //     return response.json();
        // } catch (error) {
        //     console.error("Error al enviar solicitud a Tokko", error);
        //     throw error;
        // }
    },

    submitContact: async (data) => {
        // Mappeo para la metadata genérica de Inquiries
        const payload = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            text: `Formulario de Contacto Web:
Asunto: ${data.subject}
Mensaje: ${data.message}`,
        };

        if (!API_KEY) {
            console.log('Using Mock Data - Tokko Contact payload:', payload);
            await new Promise(resolve => setTimeout(resolve, 1500));
            return { success: true, message: 'Mensaje mock enviado exitosamente a Ramos Couriel.' };
        }

        // Lógica real hacia Tokko
        // try {
        //     const response = await fetch(`https://api.tokkobroker.com/v1/inquiry/?key=${API_KEY}`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(payload)
        //     });
        //     return response.json();
        // } catch (error) {
        //     console.error("Error al enviar mensaje a Tokko", error);
        //     throw error;
        // }
    }
};
