import { InvoiceData, InvoiceItem } from "@/types/invoice";

/**
 * Main function to process an invoice image
 */
export async function processInvoiceImage(
  file: File,
  apiKey: string
): Promise<InvoiceData> {
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(file);
    // Send to Python backend
    const response = await fetch('http://localhost:5000/process-invoice-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image, filename: file.name })
    });
    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }
    const parsedData = await response.json();
    return {
      invoice_number: parsedData.invoice_number || '',
      date: parsedData.date || '',
      supplier: parsedData.supplier || '',
      total_amount: parsedData.total_amount || '',
      items: parsedData.items || []
    };
  } catch (error) {
    console.error("❌ Error processing invoice:", error);
    return {
      invoice_number: 'ERROR',
      date: '',
      supplier: 'Error processing invoice',
      total_amount: '0.00',
      items: []
    };
  }
}

/**
 * Call Google Vision API to extract text from image
 */
async function extractTextFromImage(
  file: File,
  apiKey: string
): Promise<string> {
  const base64Image = await fileToBase64(file);
  const requestBody = {
    requests: [
      {
        image: {
          content: base64Image.split(",")[1],
        },
        features: [
          {
            type: "TEXT_DETECTION",
          },
        ],
      },
    ],
  };

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Google Vision API error:", errorBody);
    throw new Error(`Google Vision API request failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result.responses?.[0]?.fullTextAnnotation?.text || "";
}

/**
 * Parse extracted text into structured invoice data
 */
export function parseInvoiceText(text: string): InvoiceData {
  console.log('Raw text for parsing:', text);
  const lines = text.split('\n').filter(line => line.trim() !== '');
  let invoice_number = '';
  let date = '';
  const items: InvoiceItem[] = [];
  let supplier = 'Mon Entreprise, 22, Avenue Voltaire, 13000 Marseille';
  let total_amount = '0.00';

  try {
    // --- Extract invoice number ---
    const invoiceNumberMatch = text.match(/Numéro[\s:]+([A-Z0-9-]+)/i);
    if (invoiceNumberMatch && invoiceNumberMatch[1]) {
      invoice_number = invoiceNumberMatch[1].trim();
    }

    // --- Extract date ---
    const dateMatch = text.match(/(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/);
    if (dateMatch && dateMatch[1]) {
      date = dateMatch[1].trim();
    }

    // --- Extract supplier ---
    const supplierMatch = text.match(/Vendeur[\s\n]+([^\n]+)/i);
    if (supplierMatch && supplierMatch[1]) {
      supplier = supplierMatch[1].trim();
    }

    // --- Extract total amount ---
    const totalMatch = text.match(/Total[\s\w]*TTC[\s:]*([\d\s,]+[\s€$])/i);
    if (totalMatch && totalMatch[1]) {
      total_amount = totalMatch[1].replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '');
    }

    // --- Extract items ---
    let itemSectionMatch = text.match(/(?:Désignation|Description|Article).*?[\s\S]*?(?=Total|SOUS-TOTAL|TVA|$)/i);
    
    // Fallback to alternative pattern if first one doesn't match
    if (!itemSectionMatch) {
      itemSectionMatch = text.match(/(?:Main-d'oeuvre|Main d'oeuvre|Service|Désignation)[\s\S]*?(?=Total HT|SOUS-TOTAL|TOTAL)/i);
    }
    
    if (itemSectionMatch) {
      const itemSection = itemSectionMatch[0];
      console.log('--- Item Section Found ---');
      console.log(itemSection);
      
      const itemLines = itemSection.split('\n').filter(line => {
        // Filter out header lines and empty lines
        return !/(?:Désignation|Description|Article|Prix|Quantité|Total|Main-d'oeuvre|Service)/i.test(line) && line.trim() !== '';
      });

      for (const line of itemLines) {
        // Try multiple patterns to match item lines
        let match = line.match(/(.+?)\s+(\d+)\s+([\d\s,]+[\s€$])/i);
        
        // Alternative pattern if first one doesn't match
        if (!match) {
          match = line.match(/(.+?)\s+(\d+)\s+[^\d]*?([\d\s,]+(?:[.,]\d{1,2})?)\s*€/i);
        }
        
        if (match) {
          const [, designation, quantity, price] = match;
          const cleanPrice = price.replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '');
          
          if (designation && quantity && cleanPrice) {
            items.push({
              designation: designation.trim(),
              quantity: quantity.trim(),
              unit_price: (parseFloat(cleanPrice) / parseInt(quantity)).toFixed(2),
              total_price: cleanPrice
            });
          }
        }
      }
    }
    
    // Return parsed data
    return {
      invoice_number,
      date,
      supplier,
      total_amount,
      items
    };
  } catch (error) {
    console.error('Error parsing invoice text:', error);
    // Return default values in case of error
    return {
      invoice_number: 'ERROR',
      date: new Date().toISOString().split('T')[0],
      supplier: 'Mon Entreprise, 22, Avenue Voltaire, 13000 Marseille',
      total_amount: '0.00',
      items: []
    };
  }
}

/**
 * Convert file to base64 string
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
