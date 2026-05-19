// src/app/services/ai.service.ts
import { Injectable } from '@angular/core';

const IKIGAI_TIPS = [
  { keywords: ['cocin', 'comer', 'gastronomí', 'aliment', 'comida', 'pupus', 'tamale'],
    ideas: ['🍽️ Venta de almuerzos o comida rápida por WhatsApp desde casa.', '🫙 Mermeladas, tortillas, tamales o conservas artesanales.', '🎂 Repostería y pasteles por encargo para eventos familiares.'] },
  { keywords: ['plant', 'jardín', 'cultiv', 'agro', 'hierba', 'natural', 'semilla'],
    ideas: ['🌱 Vivero casero: plantas ornamentales y medicinales.', '🥬 Huerto orgánico para venta de verduras frescas.', '🫙 Productos naturales: tés, ungüentos o jabones de hierbas.'] },
  { keywords: ['costur', 'ropa', 'tela', 'bordad', 'tejid', 'moda'],
    ideas: ['🧵 Servicio de reparación y arreglo de ropa.', '👜 Confección de bolsas, accesorios y uniformes escolares.', '🎨 Manualidades y decoraciones para eventos y fiestas.'] },
  { keywords: ['carpinter', 'madera', 'mueble', 'construc', 'herramienta'],
    ideas: ['🪑 Fabricación de muebles sencillos: estantes, mesas y sillas.', '🔨 Reparaciones del hogar: puertas, ventanas y estructuras básicas.', '🎁 Souvenirs y artículos decorativos en madera para ferias.'] },
  { keywords: ['niño', 'enseñ', 'educar', 'cuidar', 'personas', 'salud'],
    ideas: ['👶 Servicio de cuido de niños o adultos mayores.', '📚 Clases de refuerzo escolar a domicilio para niños.', '🎒 Materiales educativos y útiles escolares artesanales.'] },
  { keywords: ['tecnolog', 'computador', 'celular', 'digital', 'diseño', 'redes'],
    ideas: ['📱 Diseño de contenido para redes sociales de negocios locales.', '💻 Clases básicas de tecnología para adultos y emprendedores.', '📸 Fotografía de productos para venta online.'] },
];

const PRICING_ADVICE = [
  'Compara tu precio con productos similares en el mercado local antes de decidirte.',
  'Ofrece paquetes o combos para aumentar el valor percibido sin subir el costo.',
  'Da muestras gratis al inicio para ganar clientes fieles rápidamente.',
  'Usa WhatsApp y redes sociales para promocionar sin gastar en publicidad.',
  'Mantén un registro simple de gastos y ventas en un cuaderno o en el celular.',
  'El precio justo cubre costos, paga tu tiempo y deja algo para reinvertir.',
  'No bajes el precio solo para competir; mejor mejora la calidad y el servicio.',
  'Si tu producto tiene alta demanda, sube el precio gradualmente.',
  'Revisa tus costos cada mes: los precios de insumos cambian constantemente.',
  'Cobra desde el primer cliente. Regalar tu trabajo desvaloriza tu esfuerzo.',
];

const CANVAS_FEEDBACK: string[][] = [
  ['✅ Tu propuesta de valor es el corazón del negocio. Asegúrate de que resuelva un problema real.', '💡 Hazla más específica: ¿por qué un cliente te elegiría a ti y no a otro?'],
  ['✅ Conocer bien a tu cliente te ahorra tiempo y dinero.', '💡 Describe a tu cliente ideal: edad, zona, problema que tiene.'],
  ['✅ Los canales correctos hacen que tus clientes te encuentren fácilmente.', '💡 WhatsApp, grupos de Facebook y mercados locales son ideales para empezar.'],
  ['✅ Una buena relación con el cliente genera ventas repetidas.', '💡 Responde rápido y pide retroalimentación a tus primeros clientes.'],
  ['✅ Diversificar tus fuentes de ingreso hace el negocio más estable.', '💡 ¿Puedes ofrecer suscripciones, paquetes mensuales o servicios adicionales?'],
  ['✅ Identifica qué recursos son esenciales y cuáles puedes conseguir poco a poco.', '💡 Al inicio usa lo que ya tienes y busca aliados que complementen lo que te falta.'],
  ['✅ Enfócate en las actividades que generan más valor para tu cliente.', '💡 Delega o automatiza las tareas rutinarias cuando puedas.'],
  ['✅ Las alianzas estratégicas te dan acceso a recursos difíciles de conseguir solo.', '💡 CONAMYPE, ULS y otras instituciones pueden ser socios clave al inicio.'],
  ['✅ Controlar los costos es clave para que el negocio sea sostenible.', '💡 Separa costos fijos (alquiler, servicios) de variables (materiales por venta).'],
];

const CV_TIPS = [
  '• Empieza con una frase que describa tu perfil en una sola oración.',
  '• Menciona tus principales habilidades y años de experiencia relevante.',
  '• Indica el tipo de oportunidad que buscas (empleo, proyecto, emprendimiento).',
  '• Sé específico/a y evita frases genéricas como "soy responsable y puntual".',
  '• Adapta el perfil al puesto o cliente al que te diriges.',
];

@Injectable({ providedIn: 'root' })
export class AiService {

  analyzeIkigai(answers: { q1: string; q2: string; q3: string; q4: string }): string {
    const combined = `${answers.q1} ${answers.q2} ${answers.q3} ${answers.q4}`.toLowerCase();
    const group = IKIGAI_TIPS.find(g => g.keywords.some(kw => combined.includes(kw)));
    const ideas = group?.ideas ?? [
      '🌟 Emprendimiento de servicios a domicilio según tus habilidades.',
      '📦 Reventa de productos de primera necesidad en tu comunidad.',
      '🤝 Servicios personales: limpieza, mandados, gestiones.',
    ];
    const p1 = answers.q1 || '…';
    const p2 = answers.q2 || '…';
    return `🧭 Análisis de tu Ikigai\n\nBasado en tu pasión por "${p1}" y tus habilidades en "${p2}", estas son 3 ideas de emprendimiento:\n\n${ideas.join('\n\n')}\n\n💪 El mejor emprendimiento une lo que sabes hacer, lo que disfrutas y lo que la gente necesita. ¡Empieza pequeño y crece con constancia!`;
  }

  getPricingAdvice(productName: string, suggestedPrice: number): string {
    const i = Math.floor(Math.random() * PRICING_ADVICE.length);
    const j = (i + 1) % PRICING_ADVICE.length;
    return `💰 Consejos para "${productName}"\n\nTu precio de $${suggestedPrice.toFixed(2)} cubre costos y ganancia. Consejos para competir mejor:\n\n📌 ${PRICING_ADVICE[i]}\n\n📌 ${PRICING_ADVICE[j]}\n\n🚀 El primer mes enfócate en conseguir tus primeros 5 clientes.`;
  }

  // ✅ Este método recibe un ARRAY de objetos, no un string
  analyzeCanvas(fields: { label: string; value: string }[]): string {
    const filled = fields.filter(f => f.value.trim().length > 0);
    if (filled.length === 0) return '📋 Completa al menos un bloque del Canvas para recibir retroalimentación.';
    const lines = filled.map((f, i) => {
      const tips = CANVAS_FEEDBACK[i] ?? ['✅ Buen trabajo completando este bloque.', '💡 Sigue detallando para fortalecer tu modelo de negocio.'];
      return `📌 ${f.label}:\n${tips[0]}\n${tips[1]}`;
    });
    const pct = Math.round((filled.length / 9) * 100);
    return `📊 Tu Canvas está ${pct}% completo (${filled.length}/9 bloques).\n\n${lines.join('\n\n')}\n\n✅ Próximo paso: valida tu Canvas con CONAMYPE o ULS.`;
  }

  improveCVProfile(name: string, currentProfile: string): string {
    const tips = CV_TIPS.join('\n');
    const hasProfile = currentProfile?.trim().length > 20;
    if (hasProfile) {
      return `✍️ Consejos para mejorar tu perfil\n\n${tips}\n\n💡 Ejemplo:\n"Emprendedor/a con experiencia en [área], habilidades en [habilidades] y enfoque en brindar productos de calidad a la comunidad."`;
    }
    return `✍️ Cómo escribir tu perfil profesional\n\n${tips}\n\n💡 Plantilla:\n"Persona emprendedora con habilidades en [área], comprometida con [valor]. Cuento con experiencia en [actividad] y busco [objetivo]."`;
  }
}