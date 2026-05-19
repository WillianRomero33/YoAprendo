// src/app/models/course.model.ts

export interface Course {
  id: number;
  cat: 'agro' | 'oficio' | 'gastro';
  emoji: string;
  bg: string;
  title: string;
  dur: string;
  level: string;
  youtubeUrl: string;
  description: string;
  whatYouLearn: string[];
  firstStep: string;
}

export const COURSES: Course[] = [
  {
    id: 0, cat: 'agro', emoji: '🌱', bg: '#0a2a1a',
    title: 'Miniinvernaderos con materiales reciclados',
    dur: '12 min', level: 'Básico',
    // ← REEMPLAZA con el link real de YouTube
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_0',
    description: 'Aprende a construir un miniinvernadero funcional usando botellas plásticas, maderas y materiales que ya tienes en casa. Una solución económica y sostenible para cultivar tus propias plantas.',
    whatYouLearn: ['Selección de materiales reciclados adecuados', 'Construcción paso a paso del invernadero', 'Control de temperatura y humedad básico', 'Qué plantas son ideales para comenzar'],
    firstStep: 'Reúne 20 botellas plásticas de 2 litros y una estructura de madera de al menos 60×40 cm.',
  },
  {
    id: 1, cat: 'agro', emoji: '🪴', bg: '#0a2a1a',
    title: 'Cuidado y comercialización de plantas',
    dur: '8 min', level: 'Básico',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_1',
    description: 'Descubre cómo cuidar plantas ornamentales y medicinales para venderlas en tu comunidad.',
    whatYouLearn: ['Riego, abono y poda básica', 'Cómo reproducir plantas por esquejes', 'Empaque y presentación para la venta', 'Precios de referencia en mercados locales'],
    firstStep: 'Elige 3 tipos de plantas fáciles: sábila, menta y pothos.',
  },
  {
    id: 2, cat: 'agro', emoji: '🌿', bg: '#0a2a1a',
    title: 'Huertos verticales en casa',
    dur: '10 min', level: 'Básico',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_2',
    description: 'Transforma cualquier pared o espacio pequeño en un huerto productivo.',
    whatYouLearn: ['Estructuras verticales con palets y botellas', 'Sustratos económicos', 'Cultivo de lechugas, hierbas y tomates cherry', 'Cosecha y rotación de cultivos'],
    firstStep: 'Consigue un palet de madera usado y 6 bolsas de tierra negra.',
  },
  {
    id: 3, cat: 'oficio', emoji: '🪚', bg: '#1a1500',
    title: 'Carpintería básica para el hogar',
    dur: '15 min', level: 'Intermedio',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_3',
    description: 'Aprende a fabricar muebles y objetos de madera simples que puedes vender o usar en tu hogar.',
    whatYouLearn: ['Herramientas básicas y seguridad', 'Medición, corte y ensamble de madera', 'Fabricación de estantes y mesas pequeñas', 'Acabados y presentación del producto'],
    firstStep: 'Invierte en un serrucho, martillo, clavos y 3 tablas de madera de pino.',
  },
  {
    id: 4, cat: 'oficio', emoji: '💎', bg: '#1a0a2a',
    title: 'Bisutería artesanal: primeros pasos',
    dur: '10 min', level: 'Básico',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_4',
    description: 'Crea aretes, pulseras y collares artesanales con materiales accesibles.',
    whatYouLearn: ['Materiales básicos: hilo, mostacilla, alambres', 'Técnicas de anudado y tejido', 'Diseños populares y tendencias', 'Fotografía de producto para redes sociales'],
    firstStep: 'Compra un kit básico de mostacilla y hilo elástico. Comienza haciendo 5 pulseras.',
  },
  {
    id: 5, cat: 'oficio', emoji: '🧵', bg: '#1a0a14',
    title: 'Costura y confección básica',
    dur: '14 min', level: 'Básico',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_5',
    description: 'Desde reparaciones básicas hasta confección de prendas sencillas.',
    whatYouLearn: ['Uso de aguja, hilo e instrumentos básicos', 'Reparaciones: dobladillos, botones, cierres', 'Confección de bolsas de tela', 'Cómo ofrecer el servicio en tu comunidad'],
    firstStep: 'Practica cosiendo a mano 20 min al día. Repara 3 prendas de ropa en desuso.',
  },
  {
    id: 6, cat: 'gastro', emoji: '🍲', bg: '#2a0f00',
    title: 'Gastronomía emprendedora: vender comida casera',
    dur: '18 min', level: 'Básico',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_6',
    description: 'Convierte tu talento culinario en un negocio sostenible.',
    whatYouLearn: ['Normas básicas de higiene alimentaria', 'Recetas económicas con alta demanda', 'Cálculo de costos y precio de venta', 'Empaque, entrega y fidelización de clientes'],
    firstStep: 'Elige un platillo que domines. Prepara 10 porciones y ofrécelas a vecinos para validar el precio.',
  },
  {
    id: 7, cat: 'gastro', emoji: '🫙', bg: '#2a0f00',
    title: 'Conservas y mermeladas artesanales',
    dur: '12 min', level: 'Intermedio',
    youtubeUrl: 'https://www.youtube.com/watch?v=EJEMPLO_VIDEO_ID_7',
    description: 'Las conservas y mermeladas artesanales tienen alta demanda y larga vida útil.',
    whatYouLearn: ['Proceso de esterilización y conservación', 'Recetas de mermeladas de frutas locales', 'Etiquetado y presentación atractiva', 'Canales de venta: mercados, pedidos y ferias'],
    firstStep: 'Compra 1 kg de frutas de temporada. Proporción básica: 1 parte fruta, 0.7 azúcar.',
  },
];