
const COHERE_API_KEY = 'oeo34huqDxVSjQom4c2GOZmPbzHYy4yPTqTQ4aYb';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

export interface CohereResponse {
  generations: Array<{
    text: string;
  }>;
}

export const generateCohereResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command',
        prompt: `You are a helpful AI journal companion. Please respond to this message in a supportive and thoughtful way: "${prompt}"`,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`);
    }

    const data: CohereResponse = await response.json();
    return data.generations[0]?.text?.trim() || 'I understand. Please tell me more about how you\'re feeling.';
  } catch (error) {
    console.error('Cohere API error:', error);
    return 'I\'m here to listen. Please share what\'s on your mind.';
  }
};
