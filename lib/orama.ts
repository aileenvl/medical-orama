import { OramaClient } from '@oramacloud/client';

// Initialize the Orama client with environment variables
export const oramaClient = new OramaClient({
  endpoint: process.env.ORAMA_API_URL!,
  api_key: process.env.ORAMA_API_KEY!
});

// Vector search function
export async function performVectorSearch(term: string) {
  const results = await oramaClient.search({
    term,
    mode: "vector"
  });
  return results;
}

// Create and configure answer session
export function createAnswerSession(callbacks?: {
  onMessageChange?: (messages: any) => void;
  onMessageLoading?: (loading: boolean) => void;
  onAnswerAborted?: (aborted: boolean) => void;
  onSourceChange?: (sources: any) => void;
  onQueryTranslated?: (query: string) => void;
  onStateChange?: (state: any) => void;
  onNewInteractionStarted?: (interactionId: string) => void;
}) {
  return oramaClient.createAnswerSession({
    userContext: "The user is a patient and want to understand what disease may have.",
    inferenceType: "documentation",
    initialMessages: [],
    events: {
      onMessageChange: callbacks?.onMessageChange || ((messages) => console.log({ messages })),
      onMessageLoading: callbacks?.onMessageLoading || ((loading) => console.log({ loading })),
      onAnswerAborted: callbacks?.onAnswerAborted || ((aborted) => console.log({ aborted })),
      onSourceChange: callbacks?.onSourceChange || ((sources) => console.log({ sources })),
      onQueryTranslated: callbacks?.onQueryTranslated || ((query) => console.log({ query })),
      onStateChange: callbacks?.onStateChange || ((state) => console.log({ state })),
      onNewInteractionStarted: callbacks?.onNewInteractionStarted || ((interactionId) => console.log({ interactionId })),
    },
  });
}

// Helper function to ask a question using the answer session
export async function askQuestion(session: any, term: string) {
  return await session.ask({
    term
  });
}
