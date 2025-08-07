# 🛒 Mercado - Lista de Compras Inteligente

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Uma aplicação moderna e inteligente para gerenciar suas listas de compras com interface elegante e funcionalidades avançadas.**

[🌐 **Demo Online**](https://mercado-ebon-kappa.vercel.app) • [📱 **Funcionalidades**](#-funcionalidades) • [🚀 **Tecnologias**](#-tecnologias)

</div>

---

## ✨ Funcionalidades

### 🛍️ **Gestão de Listas**
- ✅ Criar e gerenciar múltiplas listas de compras
- ✅ Adicionar, editar e remover itens dinamicamente
- ✅ Categorização automática de produtos
- ✅ Sistema de busca inteligente

### 💰 **Controle Financeiro**
- ✅ Cálculo automático de preços
- ✅ Formatação de moeda brasileira (R$)
- ✅ Histórico de preços por item
- ✅ Reset de preços com um clique

### 🎯 **Experiência do Usuário**
- ✅ Interface responsiva e moderna
- ✅ Animações suaves com Framer Motion
- ✅ Modo escuro elegante
- ✅ Feedback háptico em dispositivos móveis
- ✅ Mensagens engraçadas que aparecem conforme o valor aumenta

### 🔄 **Funcionalidades Avançadas**
- ✅ Sistema de desfazer/refazer (Undo/Redo)
- ✅ Importação de listas via texto
- ✅ Compartilhamento de listas
- ✅ Filtros por categoria
- ✅ Ordenação drag-and-drop
- ✅ Persistência local dos dados

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 19.1.1 | Biblioteca para interfaces de usuário |
| **TypeScript** | 5.0+ | Tipagem estática para JavaScript |
| **Vite** | 5.0+ | Build tool e dev server |
| **Tailwind CSS** | 3.0+ | Framework CSS utilitário |
| **Framer Motion** | 11.3+ | Biblioteca de animações |
| **Local Storage** | - | Persistência de dados local |

---

## 🎨 Interface

### Design Moderno
- **Paleta de cores**: Tons de cinza e azul
- **Tipografia**: Fontes modernas e legíveis
- **Layout**: Responsivo e adaptável
- **Animações**: Transições suaves e elegantes

### Componentes Principais
- **ActionBar**: Barra superior com ações principais
- **GroceryList**: Lista principal de itens
- **SummaryFooter**: Footer com resumo e ações
- **Modais**: EditItem, Import, Share, ListManager

---

## 📱 Funcionalidades Especiais



### 🎨 Background Interativo
- Fundo dinâmico que muda conforme o estado
- Modo celebração quando lista é completada
- Efeitos visuais responsivos

### 📊 Sistema de Categorias
- Categorização automática de produtos
- Filtros por categoria
- Tags visuais para cada categoria

---

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/iurysenck/Mercado.git

# Entre na pasta
cd Mercado

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

---

## 📁 Estrutura do Projeto

```
Mercado/
├── components/          # Componentes React
│   ├── ActionBar.tsx   # Barra de ações
│   ├── GroceryList.tsx # Lista principal
│   ├── TableFooter.tsx # Footer com resumo
│   └── ...            # Outros componentes
├── hooks/              # Custom hooks
│   ├── useHaptics.ts  # Feedback háptico
│   └── useHistoryState.ts # Histórico undo/redo
├── services/           # Serviços externos
│   └── geminiService.ts # Integração com IA
├── scripts/            # Scripts de automação
├── types.ts            # Definições de tipos
├── constants.ts        # Constantes da aplicação
└── App.tsx            # Componente principal
```

---

## 🎯 Funcionalidades Detalhadas

### Gestão de Itens
- **Adicionar**: Botão flutuante (+) para novos itens
- **Editar**: Clique no item para editar
- **Remover**: Botão de lixeira em cada item
- **Marcar**: Checkbox para marcar como comprado

### Sistema de Preços
- **Preço unitário**: Definido por item
- **Quantidade**: Ajustável para cada item
- **Total automático**: Cálculo em tempo real
- **Formatação**: Moeda brasileira (R$)

### Persistência
- **Local Storage**: Dados salvos localmente
- **Múltiplas listas**: Sistema de listas separadas
- **Backup automático**: Salvamento contínuo

---

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Iury Senck** - [GitHub](https://github.com/iurysenck)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/iurysenck/Mercado?style=social)](https://github.com/iurysenck/Mercado/stargazers)

</div>
