import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface JsonViewerProps {
  data: InvoiceData | null;
  isLoading?: boolean;
}

export const JsonViewer = ({ data, isLoading }: JsonViewerProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      toast({
        title: "Copié !",
        description: "Les données JSON ont été copiées dans le presse-papiers",
      });
    }
  };

  const downloadJson = () => {
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture_${data.invoice_number || 'extracted'}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
            <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
            <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <p>Aucune données extraites pour le moment</p>
          <p className="text-sm mt-2">Téléchargez une facture pour commencer</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Structured View */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold">Données Extraites</h3>
            <p className="text-muted-foreground">Informations structurées de la facture</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4 mr-2" />
              Copier JSON
            </Button>
            <Button variant="outline" size="sm" onClick={downloadJson}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Header Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Numéro de facture</label>
              <p className="text-lg font-semibold">{data.invoice_number || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <p className="text-lg">{data.date || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Fournisseur</label>
              <p className="text-lg">{data.supplier || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Montant total</label>
              <p className="text-xl font-bold text-medical-blue-dark">{data.total_amount || 'N/A'}</p>
            </div>
          </div>

          {/* Items Table */}
          {data.items && data.items.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Articles</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Désignation</th>
                      <th className="text-left p-2 font-medium">Quantité</th>
                      <th className="text-left p-2 font-medium">Prix unitaire</th>
                      <th className="text-left p-2 font-medium">Prix total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.designation || 'N/A'}</td>
                        <td className="p-2">{item.quantity || 'N/A'}</td>
                        <td className="p-2">{item.unit_price || 'N/A'}</td>
                        <td className="p-2 font-semibold">{item.total_price || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Raw JSON View */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">JSON Brut</h4>
          <Badge variant="secondary">Format exportable</Badge>
        </div>
        <pre className="bg-neutral-50 p-4 rounded-md overflow-auto text-sm">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </Card>
    </div>
  );
};