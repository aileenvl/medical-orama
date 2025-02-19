"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"
import { OramaClient } from "@oramacloud/client"
import { useState, useRef, useEffect } from "react"
import ReactMarkdown from 'react-markdown'

if (!process.env.NEXT_PUBLIC_ORAMA_API_URL || !process.env.NEXT_PUBLIC_ORAMA_API_KEY) {
  throw new Error('Missing Orama environment variables. Please check your .env.local file.');
}

const orama = new OramaClient({
  endpoint: process.env.NEXT_PUBLIC_ORAMA_API_URL,
  api_key: process.env.NEXT_PUBLIC_ORAMA_API_KEY
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
}

type Source = {
  id: string;
  score: number;
  document: {
    Age: number;
    "Blood Pressure": string;
    "Cholesterol Level": string;
    Cough: string;
    "Difficulty Breathing": string;
    Disease: string;
    Fatigue: string;
    Fever: string;
    Gender: string;
    "Outcome Variable": string;
  }
}

export default function MedicalChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [answerSession] = useState(() => 
    orama.createAnswerSession({
      userContext: "The user is a patient and wants to understand what disease they may have.",
      inferenceType: "documentation",
      initialMessages: [],
      events: {
        onMessageChange: (messages) => {
          const formattedMessages = messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }));
          setMessages(formattedMessages);
        },
        onMessageLoading: (loading) => setLoading(loading),
        onAnswerAborted: () => {},
        onSourceChange: (sources) => setSources(sources),
        onQueryTranslated: () => {},
        onStateChange: () => {},
        onNewInteractionStarted: () => {},
      },
    })
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    try {
      await answerSession.ask({
        term: input
      });
      setInput("");
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Medical Disclaimer</AlertTitle>
        <AlertDescription>
          This is a demonstration tool only and should not be used for actual medical diagnosis. The information
          provided is for educational purposes only. Always consult with qualified healthcare professionals for medical
          advice, diagnosis, or treatment.
        </AlertDescription>
      </Alert>

      <Card className="border-purple-200">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-900">Medical Information Assistant (Demo)</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto space-y-4 p-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-3 max-w-[80%] shadow-sm ${
                    message.role === "user" 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <ReactMarkdown 
                    components={{
                      p: ({children}) => <p className="my-1">{children}</p>,
                      strong: ({children}) => <strong className="font-bold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                      ul: ({children}) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal ml-4 my-2">{children}</ol>,
                      li: ({children}) => <li className="my-1">{children}</li>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {sources.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="font-bold mb-3 text-purple-900">Similar Cases:</h3>
              <div className="space-y-3">
                {sources.slice(0, 3).map((source, index) => (
                  <div key={source.id} className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                    <div className="font-semibold text-purple-900 mb-2">Case {index + 1}: {source.document.Disease}</div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Age:</span>
                        <span>{source.document.Age}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Gender:</span>
                        <span>{source.document.Gender}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Cough:</span>
                        <span>{source.document.Cough}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Fever:</span>
                        <span>{source.document.Fever}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Fatigue:</span>
                        <span>{source.document.Fatigue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Breathing:</span>
                        <span>{source.document["Difficulty Breathing"]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">BP:</span>
                        <span>{source.document["Blood Pressure"]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600">Cholesterol:</span>
                        <span>{source.document["Cholesterol Level"]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 border-t">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms (for demonstration only)..."
              className="flex-grow border-purple-200 focus:ring-purple-500"
            />
            <Button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading || !input.trim()}
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
