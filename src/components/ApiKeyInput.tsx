import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string, provider: string) => void;
  currentProvider?: string;
}

export const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const { toast } = useToast();

  // Automatically set to demo mode on component mount
  useEffect(() => {
    onApiKeySet('', 'demo');
    toast({
      title: "Mode démo activé",
      description: "Extraction automatique avec Vision OCR + Gemini AI",
    });
  }, [onApiKeySet, toast]);

  // Return null to hide the component completely
  return null;
};