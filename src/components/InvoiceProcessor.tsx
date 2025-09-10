import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Eye, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OCRService } from '@/services/ocrService';

interface InvoiceData {
  invoice_number: string;
  date: string;
  supplier: string;
  total_amount: string;
  items: {
    designation: string;
    quantity: string;
    unit_price: string;
    total_price: string;
  }[];
}

interface InvoiceProcessorProps {
  file: File | null;
  onResults: (data: InvoiceData) => void;
  apiKey?: string;
  ocrProvider?: string;
}

export const InvoiceProcessor = ({ file, onResults, apiKey, ocrProvider }: InvoiceProcessorProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const processInvoice = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    
    const steps = [
      { name: 'Analyse du fichier...', duration: 500 },
      { name: 'Extraction OCR en cours...', duration: 2500 },
      { name: 'Structuration IA des données...', duration: 1000 },
      { name: 'Validation des résultats...', duration: 300 }
    ];

    try {
      // Step 1: File analysis
      setCurrentStep(steps[0].name);
      await new Promise(resolve => setTimeout(resolve, steps[0].duration));
      setProgress(25);

      // Step 2: OCR Processing
      setCurrentStep(steps[1].name);
      let extractedData: InvoiceData;
      
      try {
        // Always use the backend API with Google Vision + Gemini
        console.log('Using backend API with Google Vision OCR + Gemini AI');
        
        // Convert file to base64
        const base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
        
        // Call backend API
        const response = await fetch('http://localhost:5000/process-invoice-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            image: base64Image, 
            filename: file.name 
          })
        });
        
        if (!response.ok) {
          throw new Error(`Backend API error: ${response.statusText}`);
        }
        
        extractedData = await response.json();
        setProgress(75);

        // Step 3: AI Structuring
        setCurrentStep(steps[2].name);
        await new Promise(resolve => setTimeout(resolve, steps[2].duration));
        setProgress(90);

        // Step 4: Validation
        setCurrentStep(steps[3].name);
        await new Promise(resolve => setTimeout(resolve, steps[3].duration));
        setProgress(100);

        onResults(extractedData);
        
        toast({
          title: "Extraction réussie !",
          description: `Données extraites de ${file.name} avec Google Vision OCR + Gemini AI`,
        });

      } catch (ocrError) {
        console.error('Backend API Error:', ocrError);
        throw ocrError; // Don't fallback to demo mode, throw the error
      }

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Erreur de traitement",
        description: "Une erreur s'est produite lors de l'extraction des données",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setCurrentStep('');
    }
  };

  if (!file) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Sélectionnez un fichier pour commencer le traitement OCR</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Traitement OCR</h3>
          <p className="text-muted-foreground">
            Extraction et structuration automatique des données de facture
          </p>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-medical-blue/10 rounded-lg">
          <FileText className="w-8 h-8 text-medical-blue-dark" />
          <div className="flex-1">
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
            </p>
          </div>
          <Badge variant="secondary">Prêt</Badge>
        </div>

        {isProcessing && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-medical-blue-dark animate-pulse" />
              <span className="text-sm font-medium">{currentStep}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              {progress.toFixed(0)}% terminé
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-neutral-50">
            <Eye className="w-6 h-6 mx-auto mb-2 text-medical-blue-dark" />
            <p className="text-sm font-medium">OCR</p>
            <p className="text-xs text-muted-foreground">
              {ocrProvider === 'google' ? 'Google Vision' : 
               ocrProvider === 'ocrspace' ? 'OCR.Space' : 
               'Simulation'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50">
            <Brain className="w-6 h-6 mx-auto mb-2 text-medical-blue-dark" />
            <p className="text-sm font-medium">IA</p>
            <p className="text-xs text-muted-foreground">Analyse contextuelle</p>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-success" />
            <p className="text-sm font-medium">JSON</p>
            <p className="text-xs text-muted-foreground">Export structuré</p>
          </div>
        </div>

        <Button 
          onClick={processInvoice}
          disabled={isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Brain className="w-4 h-4 mr-2 animate-pulse" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Démarrer l'extraction OCR
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🔒 Vos données sont traitées de manière sécurisée</p>
          <p>⚡ Extraction {ocrProvider ? `via ${ocrProvider}` : 'simulée'}</p>
        </div>
      </div>
    </Card>
  );
};