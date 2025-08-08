


export type Category = string;

export interface GroceryItem {
  id: string;
  checked: boolean;
  name: string;
  quantity: number;
  unitPrice: number;
  category: Category | null;
}

export interface GroceryListInfo {
  id: string;
  name: string;
  createdAt: string;
}

export interface FunnyMessage {
    quote: string;
    author: {
        name: string;
        description: string;
    };
}