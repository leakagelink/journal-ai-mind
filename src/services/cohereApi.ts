
const COHERE_API_KEY = 'oeo34huqDxVSjQom4c2GOZmPbzHYy4yPTqTQ4aYb';
const COHERE_API_URL = 'https://api.cohere.ai/v1/generate';

export interface CohereResponse {
  generations: Array<{
    text: string;
  }>;
}

export const generateCohereResponse = async (prompt: string): Promise<string> => {
  console.log('Cohere API: Starting request with prompt:', prompt);
  
  try {
    const requestBody = {
      model: 'command',
      prompt: `आप एक सहायक AI जर्नल साथी हैं। कृपया इस संदेश का सहयोगी और विचारशील तरीके से जवाब दें: "${prompt}"`,
      max_tokens: 200,
      temperature: 0.7,
    };
    
    console.log('Cohere API: Request body:', requestBody);
    
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Cohere API: Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cohere API error response:', errorText);
      throw new Error(`Cohere API error: ${response.status} - ${errorText}`);
    }

    const data: CohereResponse = await response.json();
    console.log('Cohere API: Success response:', data);
    
    const generatedText = data.generations[0]?.text?.trim();
    
    if (!generatedText) {
      console.warn('Cohere API: Empty response received');
      return 'मैं समझ गया। कृपया मुझे और बताएं कि आप कैसा महसूस कर रहे हैं।';
    }
    
    return generatedText;
  } catch (error) {
    console.error('Cohere API error:', error);
    
    // Return a helpful fallback message
    return 'मैं यहां आपकी बात सुनने के लिए हूं। कृपया अपने मन की बात साझा करें।';
  }
};
