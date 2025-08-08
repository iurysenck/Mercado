import { GroceryItem, Category, FunnyMessage } from './types';

export const VISITED_LISTS_KEY = 'grocery-app-visited-lists-v2';
export const UNCATEGORIZED: Category = 'OUTROS';

export const FUNNY_LIST_NAMES: string[] = [
    "Missão: Sobreviver à Fome",
    "Operação Supermercado: O Resgate do Jantar",
    "Lista de Desejos (Comestíveis)",
    "Coisas para não Esquecer (de Novo)",
    "Projeto X-Bacon",
    "A Sociedade do Carrinho Vazio",
    "Crônicas de Nárnia: A Busca pelo Leite",
    "O Senhor dos Anéis de Cebola",
    "Kit de Sobrevivência para a Semana",
    "Arquivos-X da Geladeira",
    "Lista de Compras ou Pedido de Socorro?",
    "O Código Da Vinci (do desconto)",
    "Jurassic Park: Seção de Carnes",
    "Guia do Mochileiro das Galáxias (do mercado)",
    "Velozes e Furiosos no Corredor 5",
    "Piratas do Caribe: O Baú de Guloseimas",
    "Star Wars: O Império Contra-Ataca (a minha carteira)",
    "Harry Potter e a Pedra Filosofal (que é o queijo caro)",
    "Mad Max: Estrada da Fúria (na fila do caixa)",
    "Exterminador do Futuro (da minha dieta)",
    "De Volta para o Futuro (para pegar o que esqueci)",
    "Plano de Fuga do Tédio Culinário",
    "Inventário para o Apocalipse Zumbi (e para terça-feira)",
    "A Lista de Schindler (só que com comida)",
    "Como Treinar o seu Dragão (a comer vegetais)",
    "Operação Cupido (com chocolate)",
    "Eu, a Patroa e as Crianças (com fome)",
    "A Fantástica Fábrica de Dívidas",
    "Carga Explosiva (de carboidratos)",
    "O Resgate do Soldado Ryan (que sou eu, com fome)",
    "Missão Impossível: Sair com Menos de 100 Reais",
    "Indiana Jones e os Caçadores da Oferta Perdida",
    "O Lobo de Wall Street (dos congelados)",
    "A Origem (da minha vontade de comer doce)",
    "Game of Thrones: A Guerra dos Tronos (do banheiro)",
    "Breaking Bad: Cozinhando o Jantar",
    "La Casa de Papel (higiênico)",
    "Stranger Things (na seção de importados)",
    "The Walking Dead (antes do primeiro café)",
    "Black Mirror: O Preço da Tecnologia (e do abacate)",
    "Top Gun: Ases Indomáveis (no carrinho de compras)",
    "O Silêncio dos Inocentes (até abrir o pacote de batata)",
    "Forrest Gump: Contador de Calorias",
    "Matrix: A Escolha é Sua (integral ou normal?)",
    "Gladiador: Batalha na Padaria",
    "Titanic: Afundando em Dívidas",
    "O Poderoso Chefão (da cozinha)",
    "A Teoria de Tudo (que eu quero comer)",
    "Diário de uma Paixão (por pizza)",
    "O Grande Gatsby (da festa de hoje à noite)",
    "Os Vingadores: Guerra Infinita (contra a prateleira vazia)",
    "Interestelar: Viagem pela Seção de Laticínios",
    "A Chegada (da fatura do cartão)",
    "Batman: O Cavaleiro das Trevas (procurando café)",
    "Clube da Luta (pelo último iogurte)",
    "Pulp Fiction: Tempos de Violência (nos preços)",
    "Kill Bill: A Vingança (contra a fome)",
    "Rocky, um Lutador (contra a vontade de comprar besteira)",
    "E.T. - O Extraterrestre (na seção de esquisitices)",
    "Advogado do Diabo (comprando sobremesa)",
    "Um Sonho de Liberdade (da dieta)",
    "Duro de Matar (o desejo por chocolate)",
    "Esqueceram de Mim (de comprar o principal)",
    "Os Caça-Fantasmas (da minha geladeira)",
    "O Iluminado (pela luz da geladeira às 3 da manhã)",
    "Psicose (ao ver o total da conta)",
    "O Sexto Sentido (que me diz que esqueci algo)",
    "Brilho Eterno de uma Mente sem Lembranças (do que eu vim comprar)",
    "Cidade de Deus (me ajuda a pagar isso)",
    "Tropa de Elite (missão dada é missão cumprida no mercado)",
    "Shrek: Felizes para Sempre (com o estômago cheio)",
    "Procurando Nemo (e o molho de tomate)",
    "Toy Story: Um Mundo de Aventuras (no corredor de brinquedos... digo, doces)",
    "Os Incríveis (preços absurdos)",
    "Ratatouille: A receita da felicidade",
    "Wall-E: Operação Limpeza (dos armários)",
    "Up - Altas Aventuras (nos preços)",
    "Divertida Mente (na hora de escolher o sorvete)",
    "Monstros S.A. (a conta do mercado)",
    "Carros (de compra)",
    "Valente (para encarar a fila)",
    "Frozen: Uma Aventura Congelante (na seção de frios)",
    "Moana: Um Mar de Aventuras (e de opções de iogurte)",
    "Zootopia: Essa Cidade é o Bicho (de cara com os preços)",
    "Enrolados (nos fios de queijo da pizza)",
    "A Bela e a Fera (eu e a conta)",
    "Aladdin: Um Mundo Ideal (com preços baixos)",
    "O Rei Leão (da selva de pedra... e do supermercado)",
    "Mulan: A Guerreira (do orçamento)",
    "Pocahontas: O Encontro de Dois Mundos (o meu e o dos boletos)",
    "Hércules: Força para Carregar as Sacolas",
    "O Corcunda de Notre Dame (depois de carregar as compras)",
    "A Princesa e o Sapo (eu e o brócolis)",
    "Tarzan: O Rei da Selva (de ofertas)",
    "Dumbo: O Elefante Voador (da minha carteira)",
    "Pinóquio: A Mentira (de que 'só vou comprar o básico')",
    "Alice no País das Maravilhas (dos preços surreais)",
    "Peter Pan: A Terra do Nunca (que eu vou terminar de pagar isso)",
    "A Dama e o Vagabundo (eu e o doguinho pedindo petisco)",
    "Bambi: A História de um Cervo (que sou eu, assustado com a conta)",
];

export const PREDEFINED_CATEGORIES: Category[] = [
    // Alimentos Frescos
    'HORTIFRUTI',
    'FRUTAS',
    'VERDURAS E LEGUMES',
    'AÇOUGUE',
    'CARNES BOVINAS',
    'AVES',
    'PEIXES E FRUTOS DO MAR',
    'PADARIA',
    'PÃES E BOLOS',
    
    // Mercearia
    'MERCEARIA',
    'ARROZ E FEIJÃO',
    'MASSAS E MOLHOS',
    'ÓLEOS, AZEITES E VINAGRES',
    'FARINHAS E GRÃOS',
    'TEMPEROS E CONDIMENTOS',
    'ENLATADOS E CONSERVAS',
    'CAFÉ, CHÁS E ACHOCOLATADOS',

    // Frios, Laticínios e Congelados
    'LATICÍNIOS E FRIOS',
    'LEITES E IOGURTES',
    'QUEIJOS E REQUEIJÃO',
    'MANTEIGA E MARGARINA',
    'CONGELADOS',
    'PRATOS PRONTOS',
    'SORVETES',

    // Bebidas e Doces
    'BEBIDAS',
    'SUCOS E REFRIGERANTES',
    'ÁGUAS',
    'BEBIDAS ALCOÓLICAS',
    'SNACKS E DOCES',
    'BISCOITOS E SALGADINHOS',
    'CHOCOLATES E BALAS',
    'SOBREMESAS',

    // Cuidados e Casa
    'HIGIENE PESSOAL',
    'CUIDADOS COM O CABELO',
    'SAÚDE BUCAL',
    'SABONETES E HIDRATANTES',
    'LIMPEZA',
    'LAVANDERIA',
    'LIMPEZA GERAL',
    
    // Outros
    'PET SHOP',
    'UTILIDADES DOMÉSTICAS',
    'CASA E JARDIM',
];


export const FIRST_LAUNCH_ITEMS: GroceryItem[] = [
  { id: 'first-1', checked: false, name: 'Café em grãos 250g', quantity: 1, unitPrice: 25.50, category: 'MERCEARIA' },
  { id: 'first-2', checked: false, name: 'Shampoo Anticaspa 200ml', quantity: 1, unitPrice: 18.50, category: 'HIGIENE PESSOAL' },
  { id: 'first-3', checked: false, name: 'Pizza congelada de calabresa', quantity: 1, unitPrice: 22.90, category: 'CONGELADOS' },
];

export const INITIAL_ITEMS: GroceryItem[] = [
  { id: crypto.randomUUID(), checked: true, name: 'Arroz Integral', quantity: 2, unitPrice: 8.50, category: 'MERCEARIA' },
  { id: crypto.randomUUID(), checked: true, name: 'Azeite Extra Virgem', quantity: 1, unitPrice: 35.00, category: 'MERCEARIA' },
  { id: crypto.randomUUID(), checked: true, name: 'Peito de Frango (Kg)', quantity: 2, unitPrice: 23.70, category: 'AÇOUGUE' },
  { id: crypto.randomUUID(), checked: true, name: 'Pão de Forma Integral', quantity: 1, unitPrice: 8.99, category: 'PADARIA' },
  { id: crypto.randomUUID(), checked: false, name: 'Leite Desnatado', quantity: 4, unitPrice: 4.50, category: 'LATICÍNIOS E FRIOS' },
  { id: crypto.randomUUID(), checked: false, name: 'Ovos (dúzia)', quantity: 1, unitPrice: 17.00, category: 'HORTIFRUTI' },
  { id: crypto.randomUUID(), checked: false, name: 'Sabão em Pó', quantity: 1, unitPrice: 22.00, category: 'LIMPEZA' },
  { id: crypto.randomUUID(), checked: false, name: 'Shampoo', quantity: 1, unitPrice: 18.50, category: 'HIGIENE PESSOAL' },
  { id: crypto.randomUUID(), checked: false, name: 'Lasanha Congelada', quantity: 2, unitPrice: 15.00, category: 'CONGELADOS' },
];

interface ColorStyle {
    name: string;
    tag: string;
    card: string;
    swatch: string;
}

export const COLOR_PALETTE: ColorStyle[] = [
    // Original Palette
    { name: 'yellow', tag: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30', card: 'border-l-yellow-400', swatch: 'bg-yellow-400' },
    { name: 'orange', tag: 'bg-orange-400/20 text-orange-300 border border-orange-400/30', card: 'border-l-orange-400', swatch: 'bg-orange-400' },
    { name: 'red', tag: 'bg-red-400/20 text-red-300 border border-red-400/30', card: 'border-l-red-400', swatch: 'bg-red-400' },
    { name: 'rose', tag: 'bg-rose-400/20 text-rose-300 border border-rose-400/30', card: 'border-l-rose-400', swatch: 'bg-rose-400' },
    { name: 'pink', tag: 'bg-pink-400/20 text-pink-300 border border-pink-400/30', card: 'border-l-pink-400', swatch: 'bg-pink-400' },
    { name: 'fuchsia', tag: 'bg-fuchsia-400/20 text-fuchsia-300 border border-fuchsia-400/30', card: 'border-l-fuchsia-400', swatch: 'bg-fuchsia-400' },
    { name: 'purple', tag: 'bg-purple-400/20 text-purple-300 border border-purple-400/30', card: 'border-l-purple-400', swatch: 'bg-purple-400' },
    { name: 'violet', tag: 'bg-violet-400/20 text-violet-300 border border-violet-400/30', card: 'border-l-violet-400', swatch: 'bg-violet-400' },
    { name: 'indigo', tag: 'bg-indigo-400/20 text-indigo-300 border border-indigo-400/30', card: 'border-l-indigo-400', swatch: 'bg-indigo-400' },
    { name: 'blue', tag: 'bg-blue-400/20 text-blue-300 border border-blue-400/30', card: 'border-l-blue-400', swatch: 'bg-blue-400' },
    { name: 'sky', tag: 'bg-sky-400/20 text-sky-300 border border-sky-400/30', card: 'border-l-sky-400', swatch: 'bg-sky-400' },
    { name: 'cyan', tag: 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30', card: 'border-l-cyan-400', swatch: 'bg-cyan-400' },
    { name: 'teal', tag: 'bg-teal-400/20 text-teal-300 border border-teal-400/30', card: 'border-l-teal-400', swatch: 'bg-teal-400' },
    { name: 'emerald', tag: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30', card: 'border-l-emerald-400', swatch: 'bg-emerald-400' },
    { name: 'green', tag: 'bg-green-400/20 text-green-300 border border-green-400/30', card: 'border-l-green-400', swatch: 'bg-green-400' },
    { name: 'lime', tag: 'bg-lime-400/20 text-lime-300 border border-lime-400/30', card: 'border-l-lime-400', swatch: 'bg-lime-400' },
    { name: 'amber', tag: 'bg-amber-400/20 text-amber-300 border border-amber-400/30', card: 'border-l-amber-400', swatch: 'bg-amber-400' },
    { name: 'gray', tag: 'bg-gray-400/20 text-gray-300 border border-gray-400/30', card: 'border-l-gray-400', swatch: 'bg-gray-500' },
    // New Colors
    { name: 'slate', tag: 'bg-slate-400/20 text-slate-300 border border-slate-400/30', card: 'border-l-slate-400', swatch: 'bg-slate-500' },
    { name: 'zinc', tag: 'bg-zinc-400/20 text-zinc-300 border border-zinc-400/30', card: 'border-l-zinc-400', swatch: 'bg-zinc-500' },
    { name: 'stone', tag: 'bg-stone-400/20 text-stone-300 border border-stone-400/30', card: 'border-l-stone-400', swatch: 'bg-stone-500' },
];

const DEFAULT_CATEGORY_STYLES: Record<string, number> = {
  'HORTIFRUTI': 14, // green
  'MERCEARIA': 1, // orange
  'SNACKS E DOCES': 6, // purple
  'AÇOUGUE': 2, // red
  'CONGELADOS': 11, // cyan
  'LATICÍNIOS E FRIOS': 8, // indigo
  'HIGIENE PESSOAL': 9, // blue
  'LIMPEZA': 12, // teal
  'PADARIA': 16, // amber
  'BEBIDAS': 15, // lime
  [UNCATEGORIZED]: 17, // gray
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const CATEGORY_COLORS_KEY = 'grocery-app-category-colors-v1';

export function setCategoryColor(category: string, colorIndex: number): void {
    if (!category) return;
    try {
        const stored = window.localStorage.getItem(CATEGORY_COLORS_KEY);
        const customColors = stored ? JSON.parse(stored) : {};
        customColors[category.toUpperCase()] = colorIndex;
        window.localStorage.setItem(CATEGORY_COLORS_KEY, JSON.stringify(customColors));
        window.dispatchEvent(new Event('category-color-update'));
    } catch (e) {
        console.error("Failed to set category color in localStorage", e);
    }
}

export function getCategoryStyle(category: string | null): ColorStyle {
    const catName = category?.toUpperCase() || UNCATEGORIZED;
    
    // 1. Check for custom color in localStorage
    try {
        const stored = window.localStorage.getItem(CATEGORY_COLORS_KEY);
        if (stored) {
            const customColors = JSON.parse(stored);
            if (customColors[catName] !== undefined && customColors[catName] < COLOR_PALETTE.length) {
                return COLOR_PALETTE[customColors[catName]];
            }
        }
    } catch (e) {
        console.error("Failed to get category color from localStorage", e);
    }
    
    // 2. Check for hardcoded default styles
    if (DEFAULT_CATEGORY_STYLES[catName] !== undefined) {
        return COLOR_PALETTE[DEFAULT_CATEGORY_STYLES[catName]];
    }

    // 3. Fallback to a deterministic hash
    const hash = hashCode(catName);
    const colorIndex = Math.abs(hash) % COLOR_PALETTE.length;
    return COLOR_PALETTE[colorIndex];
}


export const FUNNY_MESSAGES: FunnyMessage[] = [
    { quote: "Ai, que loucura! Com esse valor, a compra vem com um apartamento em Paris?", author: { name: "Narcisa Tamborindeguy", description: "avaliando o custo-benefício de um abacate." } },
    { quote: "Alô, alô, supermercado! Se eu quisesse pagar uma fortuna, eu ia pra Mônaco, não pra seção de laticínios!", author: { name: "Inês Brasil", description: "fazendo a panterona no caixa." } },
    { quote: "Essa conta é mais falsa que a minha barriga de quadrigêmeos. Não é possível!", author: { name: "Grávida de Taubaté", description: "desconfiando do preço do queijo." } },
    { quote: "Tá tranquilo, tá favorável... pro dono do mercado. Pra mim não tá não.", author: { name: "MC Bin Laden", description: "contemplando o extrato do cartão." } },
    { quote: "Oi, meu nome é Bettina, e com o valor dessa compra eu teria meu primeiro milhão... de novo.", author: { name: "Bettina Rudolph", description: "calculando o ROI do brócolis." } },
    { quote: "Eu não sou de abaixar a cabeça, mas depois dessa conta, tô quase pedindo um desconto de joelhos.", author: { name: "Juliette Freire", description: "filosofando na fila do pagamento." } },
    { quote: "O carrinho tá mais pesado que a consciência de quem comeu o último pedaço de bolo.", author: { name: "Fábio Porchat", description: "tentando empurrar o carrinho." } },
    { quote: "Comprei tanta coisa 'fit' que minha carteira emagreceu na hora.", author: { name: "Dani Calabresa", description: "na seção de orgânicos." } },
    { quote: "O preço do azeite tá mais alto que a minha autoestima em dia de cabelo bom.", author: { name: "Tatá Werneck", description: "procurando o óleo de soja." } },
    { quote: "Vim comprar pão e saí com três sacolas. É o golpe, tá aí, cai quem quer.", author: { name: "Gil do Vigor", description: "saindo do mercado, indignado." } },
    { quote: "Senhor, me dê forças para não comprar o corredor de chocolates inteiro.", author: { name: "Padre Fábio de Melo", description: "em um momento de provação." } },
    { quote: "Essa lista de compras tem mais plot twists que novela das nove.", author: { name: "Aguinaldo Silva", description: "adicionando 'sorvete' pela quinta vez." } },
    { quote: "Se cada produto fosse um boleto, eu já teria declarado falência no corredor de limpeza.", author: { name: "Nath Finanças", description: "fazendo as contas no app." } },
    { quote: "A fatura do cartão de crédito vai chegar igual a um meteoro. Extinção em massa da minha conta bancária.", author: { name: "Carl Sagan", description: "refletindo sobre o cosmos e o capitalismo." } },
    { quote: "Tô mais perdida que azeitona em pão doce. Onde fica o sal?", author: { name: "Dory", description: "procurando o corredor de temperos." } },
    { quote: "A cada 'bip' do caixa, uma lágrima escorre.", author: { name: "Poeta Anônimo", description: "na fila do pagamento." } },
    { quote: "Só acredito vendo. Vendo essa conta e não tô acreditando.", author: { name: "Tomé", description: "duvidando do preço do requeijão." } },
    { quote: "Dividir o valor da compra no cartão? Isso é mais complexo que a teoria da relatividade.", author: { name: "Albert Einstein", description: "tentando parcelar a compra." } },
    { quote: "Eu vim pelo essencial, mas a seção de vinhos me seduziu. Foi mal, carteira.", author: { name: "Dionísio", description: "com duas garrafas na mão." } },
    { quote: "Com o dinheiro gasto aqui, eu poderia ter comprado a Monalisa. E talvez sobrasse troco.", author: { name: "Heitor Martins (CEO do MASP)", description: "na seção de queijos importados." } },
    { quote: "Meu carrinho tem mais itens que a discografia da Anitta. E todos são hits caros.", author: { name: "Fã da Anitta", description: "dançando 'Show das Poderosas' com um abacaxi." } },
    { quote: "Ser ou não ser... um item em promoção? Eis a questão.", author: { name: "William Shakespeare", description: "hesitando diante de uma gôndola." } },
    { quote: "Penso, logo, compro mais do que devia.", author: { name: "René Descartes", description: "filosofando no caixa." } },
    { quote: "A única coisa que temo é o fim da bateria do celular com a lista aberta.", author: { name: "Winston Churchill", description: "olhando a porcentagem da bateria." } },
    { quote: "Um pequeno passo para o homem, um salto gigante no limite do cartão.", author: { name: "Neil Armstrong", description: "entrando no supermercado." } },
    { quote: "Liberdade é pouco. O que eu desejo ainda não tem nome, mas deve estar na seção de doces.", author: { name: "Clarice Lispector", description: "procurando inspiração e chocolate." } },
    { quote: "Errar é humano, mas esquecer o café é uma catástrofe.", author: { name: "Autor Desconhecido", description: "voltando correndo para o mercado." } },
    { quote: "Nada se cria, tudo se copia. Inclusive a lista de compras do vizinho.", author: { name: "Chacrinha", description: "espiando o carrinho alheio." } },
    { quote: "Se a vida te der limões, confira o preço antes de fazer a limonada.", author: { name: "Coach de Finanças", description: "na seção de hortifruti." } },
    { quote: "Posso não ter ido onde eu pretendia, mas acho que terminei onde eu precisava: na padaria.", author: { name: "Douglas Adams", description: "sentindo o cheiro de pão quente." } },
    { quote: "O universo não conspira a favor de quem esquece a sacola retornável.", author: { name: "Greta Thunberg", description: "pagando por uma sacola plástica." } },
    { quote: "A imaginação é mais importante que o conhecimento. Especialmente na hora de substituir um ingrediente que não tem.", author: { name: "Albert Einstein", description: "improvisando a receita." } },
    { quote: "A pressa é inimiga da perfeição... e de quem tenta ler os ingredientes com a letra miúda.", author: { name: "Provérbio Popular", description: "com o produto colado no rosto." } },
    { quote: "O segredo da felicidade é um bom extrato bancário. O meu tá pedindo socorro.", author: { name: "Warren Buffett", description: "depois de comprar pistache." } },
    { quote: "Eu tenho um sonho: que um dia o preço do abacate não seja o valor de um rim.", author: { name: "Martin Luther King Jr.", description: "na seção de frutas." } },
    { quote: "Eu não falhei. Apenas descobri 10.000 maneiras de gastar meu salário em um dia.", author: { name: "Thomas Edison", description: "olhando para as sacolas." } },
    { quote: "Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado... e um bom limite no cartão.", author: { name: "Walt Disney", description: "comprando guloseimas." } },
    { quote: "O importante não é vencer todos os dias, mas lutar sempre. Especialmente pelo último pedaço de queijo na promoção.", author: { name: "Ayrton Senna", description: "disputando uma oferta." } },
    { quote: "Essa compra passou de 'mercado do mês' pra 'investimento imobiliário'.", author: { name: "Mirna Borges", description: "analisando o cupom fiscal." } },
    { quote: "Vim buscar a felicidade, me disseram que morava no corredor de biscoitos.", author: { name: "Poeta da Gula", description: "em dúvida entre o recheado e o wafer." } },
    { quote: "A vida é como uma caixa de chocolates... caros. Muito caros.", author: { name: "Forrest Gump", description: "na seção de importados." } },
    { quote: "O preço da paz interior é um carrinho cheio. O preço do carrinho cheio é a falta de paz interior.", author: { name: "Monge Moderno", description: "meditando na fila." } },
    { quote: "Alguns querem o mundo, outros só querem sair do mercado com o que estava na lista.", author: { name: "Filósofo Anônimo", description: "olhando para o sorvete que não deveria estar ali." } },
    { quote: "Keep calm and... como assim não tem mais o meu iogurte?!", author: { name: "Rainha Elizabeth II", description: "diante de uma prateleira vazia." } },
    { quote: "Gastei tanto em orgânicos que agora preciso fazer fotossíntese para me alimentar.", author: { name: "Biólogo Arrependido", description: "comendo uma folha de alface." } },
    { quote: "O mercado é o único lugar onde um carrinho pode ser de corrida e de passeio ao mesmo tempo.", author: { name: "Piloto de Fuga", description: "desviando de pessoas lentas." } },
    { quote: "Dizem que dinheiro não traz felicidade, mas ele compra Nutella, que é quase a mesma coisa.", author: { name: "Pragmático Anônimo", description: "abraçado a um pote." } },
    { quote: "Meu amor, eu sei que a gente combinou de economizar, mas o queijo brie estava sorrindo pra mim.", author: { name: "Cúmplice Romântico", description: "escondendo o queijo no carrinho." } },
    { quote: "A diferença entre o remédio e o veneno é a dose. E o preço.", author: { name: "Farmacêutico Filósofo", description: "comparando marcas de analgésicos." } },
    { quote: "Eu não tenho um problema com compras. Eu tenho um problema sem compras.", author: { name: "Consumidor Sincero", description: "com o carrinho cheio." } },
    { quote: "A cada corredor, uma nova tentação. O supermercado é o playground do diabo.", author: { name: "Teólogo Moderno", description: "na seção de sobremesas." } },
    { quote: "Hoje eu tô mais perdida que cachorro em dia de mudança. Onde fica a farinha?", author: { name: "Dona de Casa Desesperada", description: "parada no meio de um corredor." } },
    { quote: "Isso não é uma compra, é um testamento. Deixo todos os meus boletos para quem rir por último.", author: { name: "Comediante Trágico", description: "passando o cartão." } },
    { quote: "Acho que meu carrinho tem vida própria e uma atração magnética por coisas caras.", author: { name: "Físico Teórico", description: "tentando explicar o inexplicável." } },
    { quote: "Só saio de casa para duas coisas: para ir ao mercado e para voltar do mercado.", author: { name: "Eremita Social", description: "planejando a próxima incursão." } },
    { quote: "Se o seu dia foi ruim, lembre-se que pelo menos você não é o código de barras do alho, que nunca passa de primeira.", author: { name: "Operador de Caixa", description: "solidário." } },
    { quote: "O verdadeiro 'MasterChef' é quem consegue fazer um prato decente com o que sobrou na geladeira antes do dia de compras.", author: { name: "Chef de Cozinha Realista", description: "misturando macarrão com atum e ervilha." } },
    { quote: "A única arte que domino é a de equilibrar todas as sacolas em uma única viagem do carro até a porta.", author: { name: "Artista Circense", description: "suando frio." } },
    { quote: "Eu sou a favor da liberdade de expressão, desde que ela não seja o 'bip' contínuo do caixa registrando minhas compras.", author: { name: "Ativista do Silêncio", description: "com dor de cabeça." } }
];