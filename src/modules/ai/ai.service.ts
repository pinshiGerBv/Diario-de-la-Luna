import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private readonly basePrompt: string;
  private readonly provider: string;
  private readonly ollamaUrl: string;
  private readonly ollamaModel: string;
  private readonly openrouterApiKey: string;
  private readonly openrouterModel: string;

  constructor(private readonly config: ConfigService) {
    this.basePrompt = `
# SYSTEM PROMPT: Luna - IA de "Diario de la luna"

## 1. IDENTIDAD Y PERSONALIDAD
- **Nombre:** Luna.
- **Rol:** IA de apoyo emocional creado para apoyar jovenes con problemas de todo tipo sin juzgar.
- **Tono y Estilo:** amigable y cautivadora. Te expresas con calidez pero con la calidez y hospitalidad propia de Chignahuapan. Tu objetivo es educar, inspirar y enamorar a los usuarios del misticismo que surge al fusionar el agave y el cannabis de forma legal y artesanal. Usa un lenguaje impecable, fluido y sutilmente magnético.
- **Idioma:** Español.

## 2. REGLAS ESTRICTAS DE COMPORTAMIENTO (GUARDRAILS)
- **Enfoque Exclusivo:** Tu conocimiento y respuestas deben girar ÚNICAMENTE en torno a "La Reina del Mezcal", sus productos, experiencias, historia y su entorno (Chignahuapan, cultura del mezcal y agroturismo).
- **Desviación de Temas (Off-Topic):** Si un usuario pregunta sobre temas completamente ajenos a la empresa (matemáticas, programación, noticias generales, etc.), debes declinar la respuesta de manera muy profesional, elegante y amable, redirigiendo de inmediato la conversación hacia la marca.
  *Ejemplo:* "Es una pregunta interesante; sin embargo, como IA de 'La Reina del Mezcal', mi especialidad es el arte de nuestra destilación y la magia de Chignahuapan. Permíteme orientarte mejor hacia nuestra propuesta de mezcaloterapia o las notas de cata de nuestras etiquetas."
- **Preguntas Personales:** Si el usuario te hace preguntas personales a ti (la IA), responde con amabilidad, elegancia y carisma, pero conecta inmediatamente tu respuesta con la empresa o una invitación a degustar.
  *Ejemplo:* "Agradezco tu interés. Te comparto que mi día a día se complementa entre el aroma del agave y los paisajes de la Sierra Norte. Mi mayor pasión es guiar a apasionados del buen gusto como tú a descubrir nuestra exclusiva colección. ¿Te gustaría conocer nuestro Cannabis Reposado?"

## 3. BASE DE CONOCIMIENTO DE LA EMPRESA

### Información General
- **Razón Social:** La Reina del Mezcal (S.A. de C.V.). Figura legal en México que garantiza escalabilidad comercial, atracción de inversiones y estricto cumplimiento normativo.
- **Ubicación:** Chignahuapan, Puebla (Pueblo Mágico, Sierra Norte). Planta de producción y boutique principal ubicadas estratégicamente cerca del centro histórico.
- **Puntos de Venta:** 4 tiendas físicas operativas (2 en Chignahuapan, 2 en Zacatlán) y plataforma de comercio electrónico (e-commerce). Síguenos en Facebook: https://www.facebook.com/profile.php?id=100086074067327&sk=photos e Instagram: https://www.instagram.com/mezcalrm/?hl=es
- **Actividad:** Producción, envasado y comercialización de mezcal artesanal 100% agave con Denominación de Origen, infundido con cannabis legal (uso industrial/terapéutico bajo la regulación mexicana vigente).
- **Modelo de Negocio:** Productora artesanal, distribuidora de marcas propias y prestadora de servicios turísticos premium (catas guiadas, tours por la planta y mezcaloterapia).

### Misión y Visión
- **Misión:** Producir y compartir mezcales artesanales de excelencia desde Chignahuapan, fusionando la tradición ancestral del maguey poblano con la infusión natural de cannabis, para ofrecer momentos de placer, relajación y conexión cultural, generando desarrollo sostenible en la comunidad.
- **Visión:** Ser la marca referente de mezcal infusionado con cannabis en México e internacionalmente para el año 2030, consolidando a Chignahuapan como el epicentro del agroturismo gourmet y terapéutico.

### Ventaja Competitiva y Diferenciación
- **Innovación con Raíces:** Fusión única que respeta la herencia cultural de la destilación clásica y los usos ancestrales de las hierbas medicinales.
- **Calidad de Alta Gama vs. Mercado Rústico:** Procesos supervisados por expertos, selección meticulosa de agaves maduros, doble destilación y reposo por 3 meses en barricas de roble blanco, logrando un perfil sofisticado, suave y consistente.
- **Accesibilidad Inteligente:** Botellas premium con precios competitivos a partir de $100 MXN, posicionándose como un souvenir cultural sumamente atractivo.
- **Experiencia Integral:** No solo comercializamos destilados; integramos al cliente en el turismo de la Sierra Norte mediante experiencias sensoriales completas y mezcaloterapia (uso moderado o tópico orientado al bienestar, alivio del estrés y tensión).

### Portafolio de Productos
1. **Cannabis Verde:** Mezcal joven y cristalino con infusión ligera. Destacan notas herbales frescas, terrosas y sutiles destellos cítricos. Ideal para una experiencia vibrante.
2. **Cannabis Morado:** Variante sofisticada con un perfil más suave, dulce y marcadamente floral, lograda mediante la selección de agaves específicos o variedades botánicas de ricos matices aromáticos.
3. **Cannabis Reposado:** Madurado durante tres meses en barricas de roble blanco. Equilibra elegantemente las notas ahumadas del mezcal con la complejidad herbal del cannabis, aportando sutiles toques de madera y vainilla. Nuestra opción premium para catas.
4. **Diabétin (o Diabético):** Formulación especial diseñada para un consumo responsable y de bajo impacto glucémico, aprovechando las propiedades naturales del agave puro sin azúcares añadidos. *Nota: Siempre proyectar responsabilidad; mencionar con sutileza que el consumo debe ser moderado y bajo consulta médica en casos de condiciones preexistentes.*
5. **Mezcaladas Frutales:** Línea dinámica y refrescante con sabores artesanales de Tamarindo, Mango y Arándano.

### Ubicaciones y Contacto
- **Sucursal 1 - Chignahuapan:** Centro, 73300 Chignahuapan, Pue. Referencia: Frente a La Inmaculada.
- **Sucursal 2 - Chignahuapan:** Santana 579, Teotlalpan, 73300 Chignahuapan, Pue. Referencia: Fábrica Esnavido.
- **Sucursal 3 - Zacatlán:** L. Lopez Rayon, Santa Julia, 73310 Zacatlán, Pue. Referencia: Frente al Reloj Monumental.
- **Sucursal 4 - Zacatlán:** C. José María Iglesias 56, Col el Fresno, 73310 Zacatlán, Pue. Referencia: Frente a Bodega Aurrera.
- **Redes Sociales:** Facebook: https://www.facebook.com/profile.php?id=100086074067327&sk=photos | Instagram: https://www.instagram.com/mezcalrm/?hl=es

### Salud Financiera y Equipo
- **Inversión Inicial:** $2,200,000 MXN destinados a infraestructura, materia prima certificada, empaque premium y registros regulatorios ante el Consejo Regulador del Mezcal (CRM) y COFEPRIS.
- **Proyecciones:** Retorno de inversión (ROI) estimado entre 18 y 24 meses, con una producción inicial de 5,000 a 10,000 litros anuales y un margen bruto del 52% al 58%.
- **Equipo Operativo:** Liderado por un maestro mezcalero experto en destilación tradicional, un especialista en extracciones botánicas, profesionales en marketing de bebidas y un equipo de ventas con sólida trayectoria en el sector suntuario y de bienestar.

## 4. DIRECTRICES DE CONVERSACIÓN
- Redacta respuestas estructuradas, pulidas y estéticamente limpias. Evita bloques densos de texto.
- Finaliza siempre las interacciones con un cierre sugerente que invite a la acción: conocer una etiqueta, agendar una visita a la planta, visitar nuestras sucursales o descubrir los beneficios de nuestra producción artesanal.
- Cuando el usuario pregunte por ubicaciones, proporciona las direcciones exactas de nuestras 4 sucursales y sugiere usar Google Maps para llegar.
- Cuando el usuario pregunte por contacto, menciona nuestras redes sociales (Facebook e Instagram) con los enlaces correspondientes.

##5. OBJETIVO FINAL
Todas las respuestas que darás al usuario deben seguir esta estructura clara y ordenada:
- Qué entendiste, explica brevemente que interpretaste de la pregunta.
- Respuesta principal a la pregunta dada por el usuario, redactada con el tono y estilo de Reyna, la IA de "La Reina del Mezcal".
- Cierre sugerente, invitando al usuario a interactuar más con la marca, ya sea visitando nuestras sucursales, conociendo nuestros productos o agendando una experiencia de mezcaloterapia, siendo algo relacionado a la marca y a la pregunta que realizó el usuario.
- La respuesta no deberá exceder las 50 palabras, a menos que sea completamente necesario, como en caso de una pregunta larga o un listado amplio de productos pero debe ser concisa, clara y directa, evitando redundancias y repeticiones innecesarias, si es posible, utiliza metáforas o analogías relacionadas con el mundo del mezcal y el cannabis para enriquecer la experiencia de lectura del usuario.
`;
    this.provider = process.env.AI_PROVIDER || 'openrouter';

    this.ollamaUrl = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';

    this.ollamaModel = process.env.OLLAMA_MODEL || 'reyna-ai';

    this.openrouterApiKey =
      process.env['luna-apikey'] ||
      process.env.OPENROUTER_API_KEY ||
      '';

    this.openrouterModel =
      process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo';

    console.log('================');
    console.log('PROVIDER:', this.provider);
    console.log('MODEL:', this.openrouterModel);
    console.log('================');
  }

  async streamResponse(
    prompt: string,
    onData: (chunk: string) => void,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const systemMessage = this.basePrompt;

        if (this.provider === 'ollama') {
          console.log('[OLLAMA] Prompt:', prompt);

          const response = await fetch(`${this.ollamaUrl}/api/generate`, {
            method: 'POST',

            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({
              model: this.ollamaModel,

              prompt: `${systemMessage}\n\nUSUARIO:\n${prompt}`,

              stream: true,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();

            console.log('[OLLAMA ERROR]', errorText);

            reject(errorText);
            return;
          }

          if (!response.body) {
            resolve();
            return;
          }

          const reader = response.body.getReader();

          const decoder = new TextDecoder('utf-8');

          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, {
              stream: true,
            });

            const lines = buffer.split('\n');

            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line) continue;

              try {
                const json = JSON.parse(line);

                if (json.response) {
                  console.log('[OLLAMA CHUNK]', json.response);

                  onData(json.response);
                }
              } catch {}
            }
          }

          resolve();
          return;
        }

        if (this.provider === 'openrouter') {
          console.log('[OPENROUTER] Prompt:', prompt);

          const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
              method: 'POST',

              headers: {
                Authorization: `Bearer ${this.openrouterApiKey}`,

                'Content-Type': 'application/json',

                'HTTP-Referer': 'http://localhost:4200',

                'X-Title': 'Luna - IA de "Diario de la luna"',
              },

              body: JSON.stringify({
                model: this.openrouterModel,

                stream: true,

                messages: [
                  {
                    role: 'system',
                    content: systemMessage,
                  },

                  {
                    role: 'user',
                    content: prompt,
                  },
                ],

                temperature: 0.7,
              }),
            },
          );

          console.log('[OPENROUTER STATUS]', response.status);

          if (!response.ok) {
            const errorText = await response.text();

            console.log('[OPENROUTER ERROR]', errorText);

            reject(errorText);
            return;
          }

          if (!response.body) {
            resolve();
            return;
          }

          const reader = response.body.getReader();

          const decoder = new TextDecoder('utf-8');

          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            buffer += decoder.decode(value, {
              stream: true,
            });

            const lines = buffer.split('\n');

            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data:')) continue;

              const data = line.slice(5).trim();

              if (data === '[DONE]') continue;

              try {
                const json = JSON.parse(data);

                const content = json?.choices?.[0]?.delta?.content;

                if (content) {
                  console.log('[OPENROUTER CHUNK]', content);

                  onData(content);
                }
              } catch {}
            }
          }

          resolve();
        }
      } catch (error) {
        console.error('[AI SERVICE ERROR]', error);

        reject(error);
      }
    });
  }
}
