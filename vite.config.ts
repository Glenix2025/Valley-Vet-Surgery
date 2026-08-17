import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, getLocalFallbackResponse } from './src/data/valleyVetData.ts';

dotenv.config();

function devApiPlugin(): Plugin {
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  return {
    name: 'dev-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const message = data.message;
            const history = data.history || [];

            if (!message) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Message required' }));
              return;
            }

            if (!ai) {
              const fallback = getLocalFallbackResponse(message);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply: fallback }));
              return;
            }

            const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
            if (Array.isArray(history) && history.length > 0) {
              for (const item of history.slice(-6)) {
                if (item.sender === 'user' && item.text) {
                  contents.push({ role: 'user', parts: [{ text: item.text }] });
                } else if (item.sender === 'assistant' && item.text) {
                  contents.push({ role: 'model', parts: [{ text: item.text }] });
                }
              }
            }
            contents.push({ role: 'user', parts: [{ text: message }] });

            const response = await ai.models.generateContent({
              model: 'gemini-3.7-flash',
              contents: contents,
              config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.3,
                topP: 0.85,
              },
            });

            const reply = response.text || getLocalFallbackResponse(message);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: reply.trim() }));
          } catch (err) {
            console.error('Error handling dev /api/chat:', err);
            const fallback = getLocalFallbackResponse('');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: fallback }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
