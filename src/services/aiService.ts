import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

/**
 * Servicio para manejar la integración con el SDK de AI de Vercel
 * Guarda el número de siniestro de la carta de honorarios y lo imprime por consola
 */

/**
 * Guarda el número de siniestro y genera un mensaje por consola usando AI
 * @param claimNumber Número de siniestro de la carta de honorarios
 * @returns Mensaje generado por la IA
 */
export async function logClaimNumberWithAI(claimNumber: string): Promise<string> {
  try {
    // Verificar que el número de siniestro tenga el formato correcto
    if (!claimNumber || !claimNumber.startsWith('SIN-')) {
      throw new Error('Formato de número de siniestro inválido');
    }

    // Verificar si existe la API key de OpenAI
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'tu-api-key-de-openai') {
      // Si no hay API key o es el valor por defecto, usar el mensaje de respaldo
      return useFallbackMessage(claimNumber);
    }

    try {
      // Generar un mensaje personalizado usando la IA con el SDK de Vercel AI
      const { text: aiMessage } = await generateText({
        model: openai('gpt-3.5-turbo'),
        system: 'Eres un asistente especializado en seguros y reclamaciones.',
        prompt: `Genera un mensaje de confirmación para indicar que se ha generado una carta de honorarios con el número de siniestro ${claimNumber}. El mensaje debe ser profesional y conciso.`,
        temperature: 0.7,
        maxTokens: 100
      });
      
      // Imprimir el mensaje por consola
      console.log(`[AI] ${aiMessage}`);
      
      return aiMessage;
    } catch (aiError) {
      console.error('Error al generar mensaje con OpenAI:', aiError);
      // Si hay un error con la API de OpenAI, usar el mensaje de respaldo
      return useFallbackMessage(claimNumber);
    }
  } catch (error) {
    console.error('Error al procesar el número de siniestro con AI:', error);
    // Mensaje de respaldo en caso de error
    return useFallbackMessage(claimNumber);
  }
}

/**
 * Genera un mensaje de respaldo cuando no se puede usar la IA
 * @param claimNumber Número de siniestro
 * @returns Mensaje de respaldo
 */
function useFallbackMessage(claimNumber: string): string {
  const date = new Date().toLocaleDateString('es-ES');
  const messages = [
    `Carta de honorarios generada exitosamente con número de siniestro: ${claimNumber} (${date})`,
    `Se ha registrado correctamente la carta de honorarios con referencia: ${claimNumber}`,
    `Confirmación: Carta de honorarios ${claimNumber} procesada y lista para su gestión`,
    `Expediente ${claimNumber} creado con éxito. Carta de honorarios disponible en el sistema`
  ];
  
  // Seleccionar un mensaje aleatorio para dar variedad
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  console.log(`[AI Fallback] ${randomMessage}`);
  return randomMessage;
} 