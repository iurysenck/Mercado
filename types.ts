

export enum Category {
  BASICO = 'BÁSICO',
  CEREAIS = 'CEREAIS',
  ENLATADOS = 'ENLATADOS',
  CONDIMENTOS = 'CONDIMENTOS',
  FRIOS = 'FRIOS',
  LATICINIOS = 'LATICÍNIOS',
  HIGIENE = 'HIGIENE',
  LIMPEZA = 'LIMPEZA',
  PADARIA = 'PADARIA',
  CARNES = 'CARNES',
  BEBIDAS = 'BEBIDAS',
  OUTROS = 'OUTROS',
}

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