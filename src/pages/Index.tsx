import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { InvoiceProcessor } from '@/components/InvoiceProcessor';
import { JsonViewer } from '@/components/JsonViewer';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, FileText, Zap } from 'lucide-react';

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

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<InvoiceData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [ocrProvider, setOcrProvider] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedData(null); // Reset previous results
  };

  const handleResults = (data: InvoiceData) => {
    setExtractedData(data);
  };

  const handleApiKeySet = (key: string, provider: string) => {
    setApiKey(key);
    setOcrProvider(provider);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-medical-blue rounded-lg">
                <Brain className="w-6 h-6 text-medical-blue-dark" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">OCR Factures IA</h1>
                <p className="text-sm text-muted-foreground">Extraction automatique de données pharmaceutiques</p>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Prototype v1.0</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload & Processing */}
          <div className="space-y-6">
            <ApiKeyInput 
              onApiKeySet={handleApiKeySet}
              currentProvider={ocrProvider}
            />
            
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-5 h-5 text-medical-blue-dark" />
                <h2 className="text-lg font-semibold">1. Sélection du fichier</h2>
              </div>
              <FileUploader 
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
              />
            </Card>

            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-5 h-5 text-medical-blue-dark" />
                <h2 className="text-lg font-semibold">2. Traitement OCR</h2>
              </div>
              <InvoiceProcessor
                file={selectedFile}
                onResults={handleResults}
                apiKey={apiKey}
                ocrProvider={ocrProvider}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-5 h-5 text-medical-blue-dark" />
              <h2 className="text-lg font-semibold">3. Données extraites</h2>
            </div>
            <JsonViewer data={extractedData} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-medical-blue rounded-lg mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-6 h-6 text-medical-blue-dark" />
            </div>
            <h3 className="font-semibold mb-2">OCR Avancé</h3>
            <p className="text-sm text-muted-foreground">
              Extraction précise de texte à partir d'images et de PDFs avec Google Cloud Vision
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-medical-blue rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Brain className="w-6 h-6 text-medical-blue-dark" />
            </div>
            <h3 className="font-semibold mb-2">IA Structurée</h3>
            <p className="text-sm text-muted-foreground">
              Intelligence artificielle pour identifier et structurer automatiquement les données de factures
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-medical-blue rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-medical-blue-dark" />
            </div>
            <h3 className="font-semibold mb-2">Export JSON</h3>
            <p className="text-sm text-muted-foreground">
              Données formatées prêtes pour l'intégration ERP avec validation automatique
            </p>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 OCR Factures IA - Prototype de structuration pharmaceutique</p>
            <p>Développé avec React • Tailwind • Google Cloud OCR</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;