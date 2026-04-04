// item.model.ts
export interface Item {
    id: number;               // Unique ID
    name: string;             // Item name
    category: string;         // Electronics, Furniture, Clothing, Tools, Miscellaneous
    quantity: number;         // Quantity
    price: number;            // Price
    supplier: string;         // Supplier name
    stockStatus: string;      // 'In Stock', 'Out of Stock', 'Backorder'
    isPopular: boolean;       // true=Popular product, false=Ordinary product
    comments: string;         // Product comments (nullable)
  }