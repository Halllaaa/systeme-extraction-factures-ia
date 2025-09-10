import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const FileUploader = ({ onFileSelect, isProcessing }: FileUploaderProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
      toast({
        title: "Fichier sélectionné",
        description: `${file.name} est prêt pour le traitement OCR`,
      });
    }
  }, [onFileSelect, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isProcessing
  });

  const clearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full space-y-4">
      <Card 
        {...getRootProps()} 
        className={`
          border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? 'border-medical-blue-dark bg-medical-blue/20' 
            : 'border-neutral-200 hover:border-medical-blue-dark hover:bg-medical-blue/5'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Upload className={`w-12 h-12 mb-4 ${isDragActive ? 'text-medical-blue-dark' : 'text-muted-foreground'}`} />
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? 'Déposez votre facture ici' : 'Télécharger une facture'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Glissez-déposez ou cliquez pour sélectionner un fichier
          </p>
          <p className="text-sm text-muted-foreground">
            Formats supportés: PDF, JPEG, PNG (max 10MB)
          </p>
        </div>
      </Card>

      {selectedFile && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-medical-blue-dark" />
              <div>
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFile}
              disabled={isProcessing}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};