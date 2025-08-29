
/**
 * Cohere Chat API client
 * - Migrated from deprecated Generate API to Chat API
 * - Answers in the same language as the user's input (Hindi/English/Marathi/…)
 * - Provides concise, direct answers for factual queries
 * - Uses env var VITE_COHERE_API_KEY if available; falls back to existing key
 */

const COHERE_API_KEY =
  (import.meta as any)?.env?.VITE_COHERE_API_KEY ||
  'oeo34huqDxVSjQom4c2GOZmPbzHYy4yPTqTQ4aYb';

const COHERE_API_URL = 'https://api.cohere.ai/v1/chat';

export interface CohereResponse {
  // Chat API common shapes we may receive
  text?: string;
  message?: {
    content?: Array<{ type?: string; text?: string }>;
  };
  generations?: Array<{ text?: string }>; // backward compatibility if any proxy returns old shape
}

const SYSTEM_PREAMBLE =
  "You are a helpful, concise AI assistant. Always reply in the same language as the user's message (Hindi, English, Marathi, etc.). For factual questions, answer directly and briefly without translating the user's question. Keep responses under 3 sentences unless the user asks for more detail.";

/**
 * Extract text robustly from Cohere Chat API response variations
 */
const extractText = (data: CohereResponse): string | undefined => {
  if (typeof data?.text === 'string' && data.text.trim()) {
    return data.text.trim();
  }
  const parts = data?.message?.content?.map((p) => p?.text).filter(Boolean) || [];
  if (parts.length) {
    return parts.join('\n').trim();
  }
  const genText = data?.generations?.[0]?.text;
  if (genText && genText.trim()) {
    return genText.trim();
  }
  return undefined;
};

export const generateCohereResponse = async (prompt: string): Promise<string> => {
  console.log('Cohere Chat: Starting request with prompt:', prompt);

  const requestBody = {
    model: 'command-r', // modern chat-capable model
    message: prompt,
    preamble: SYSTEM_PREAMBLE,
    temperature: 0.2, // more factual/consistent
    max_tokens: 300,
  };

  console.log('Cohere Chat: Request body:', requestBody);

  const response = await fetch(COHERE_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('Cohere Chat: Response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Cohere Chat error response:', errorText);
    throw new Error(`Cohere Chat API error: ${response.status} - ${errorText}`);
  }

  const data: CohereResponse = await response.json();
  console.log('Cohere Chat: Success response:', data);

  const generatedText = extractText(data);

  if (!generatedText) {
    console.warn('Cohere Chat: Empty response received');
    return 'मुझे स्पष्ट उत्तर नहीं मिला। कृपया अपना सवाल दोबारा, थोड़ा और स्पष्ट लिखें।';
  }

  return generatedText;
};
