import { GroceryItem, Category, FunnyMessage } from './types';

export const INITIAL_ITEMS: GroceryItem[] = [
  { id: crypto.randomUUID(), checked: true, name: 'Arroz Integral', quantity: 2, unitPrice: 8.50, category: Category.BASICO },
  { id: crypto.randomUUID(), checked: true, name: 'Azeite Extra Virgem', quantity: 1, unitPrice: 35.00, category: Category.CONDIMENTOS },
  { id: crypto.randomUUID(), checked: true, name: 'Peito de Frango (Kg)', quantity: 2, unitPrice: 23.70, category: Category.CARNES },
  { id: crypto.randomUUID(), checked: true, name: 'Pão de Forma Integral', quantity: 1, unitPrice: 8.99, category: Category.PADARIA },
  { id: crypto.randomUUID(), checked: false, name: 'Leite Desnatado', quantity: 4, unitPrice: 4.50, category: Category.LATICINIOS },
  { id: crypto.randomUUID(), checked: false, name: 'Ovos (dúzia)', quantity: 1, unitPrice: 17.00, category: Category.BASICO },
  { id: crypto.randomUUID(), checked: false, name: 'Sabão em Pó', quantity: 1, unitPrice: 22.00, category: Category.LIMPEZA },
  { id: crypto.randomUUID(), checked: false, name: 'Shampoo', quantity: 1, unitPrice: 18.50, category: Category.HIGIENE },
  { id: crypto.randomUUID(), checked: false, name: 'Lasanha Congelada', quantity: 2, unitPrice: 15.00, category: Category.FRIOS },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  [Category.BASICO]: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
  [Category.CEREAIS]: 'bg-orange-400/20 text-orange-300 border border-orange-400/30',
  [Category.ENLATADOS]: 'bg-purple-400/20 text-purple-300 border border-purple-400/30',
  [Category.CONDIMENTOS]: 'bg-red-400/20 text-red-300 border border-red-400/30',
  [Category.FRIOS]: 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30',
  [Category.LATICINIOS]: 'bg-indigo-400/20 text-indigo-300 border border-indigo-400/30',
  [Category.HIGIENE]: 'bg-blue-400/20 text-blue-300 border border-blue-400/30',
  [Category.LIMPEZA]: 'bg-teal-400/20 text-teal-300 border border-teal-400/30',
  [Category.PADARIA]: 'bg-amber-400/20 text-amber-300 border border-amber-400/30',
  [Category.CARNES]: 'bg-rose-400/20 text-rose-300 border border-rose-400/30',
  [Category.BEBIDAS]: 'bg-lime-400/20 text-lime-300 border border-lime-400/30',
  [Category.OUTROS]: 'bg-gray-400/20 text-gray-300 border border-gray-400/30',
};

export const CATEGORY_CARD_CLASSES: Record<Category, string> = {
  [Category.BASICO]: 'border-l-yellow-400',
  [Category.CEREAIS]: 'border-l-orange-400',
  [Category.ENLATADOS]: 'border-l-purple-400',
  [Category.CONDIMENTOS]: 'border-l-red-400',
  [Category.FRIOS]: 'border-l-cyan-400',
  [Category.LATICINIOS]: 'border-l-indigo-400',
  [Category.HIGIENE]: 'border-l-blue-400',
  [Category.LIMPEZA]: 'border-l-teal-400',
  [Category.PADARIA]: 'border-l-amber-400',
  [Category.CARNES]: 'border-l-rose-400',
  [Category.BEBIDAS]: 'border-l-lime-400',
  [Category.OUTROS]: 'border-l-gray-400',
};


export const FUNNY_MESSAGES: FunnyMessage[] = [
    {
        quote: "Ai, que loucura! Com esse valor, a compra vem com um apartamento em Paris?",
        author: {
            name: "Narcisa Tamborindeguy",
            description: "avaliando o custo-benefício de um abacate."
        }
    },
    {
        quote: "Alô, alô, supermercado! Se eu quisesse pagar uma fortuna, eu ia pra Mônaco, não pra seção de laticínios!",
        author: {
            name: "Inês Brasil",
            description: "fazendo a panterona no caixa."
        }
    },
    {
        quote: "Essa conta é mais falsa que a minha barriga de quadrigêmeos. Não é possível!",
        author: {
            name: "Grávida de Taubaté",
            description: "desconfiando do preço do queijo."
        }
    },
    {
        quote: "Que tiro foi esse no meu orçamento? A conta deu mais alta que meu rancho!",
        author: {
            name: "Jojo Todynho",
            description: "após passar o amaciante no caixa."
        }
    },
    {
        quote: "Tá tranquilo, tá favorável... pro dono do mercado. Pra mim não tá não.",
        author: {
            name: "MC Bin Laden",
            description: "contemplando o extrato do cartão."
        }
    },
    {
        quote: "Oi, meu nome é Bettina, e com o valor dessa compra eu teria meu primeiro milhão... de novo.",
        author: {
            name: "Bettina Rudolph",
            description: "calculando o ROI do brócolis."
        }
    },
     {
        quote: "Eu não sou de abaixar a cabeça, mas depois dessa conta, tô quase pedindo um desconto de joelhos.",
        author: {
            name: "Juliette Freire",
            description: "filosofando na fila do pagamento."
        }
    }
];