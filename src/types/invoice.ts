export interface InvoiceItem {
  designation: string;
  quantity: string;
  unit_price: string;
  total_price: string;
}

export interface InvoiceData {
  invoice_number: string;
  date: string;
  supplier: string;
  total_amount: string;
  items: InvoiceItem[];
}
