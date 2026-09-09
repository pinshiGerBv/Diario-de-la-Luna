export default () => ({

  ai: {
    provider: process.env.AI_PROVIDER,
  },

  ollama: {
    url: process.env.OLLAMA_URL,
    model: process.env.OLLAMA_MODEL,
  },

  openrouter: {
    url: process.env.OPENROUTER_URL,
    apiKey: process.env['luna-apikey'],
    model: process.env.OPENROUTER_MODEL,
  },

});