# 🛒 Lista de Compras Inteligente

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**Uma aplicação web moderna (PWA) com filosofia local-first, oferecendo uma experiência fluida e colaborativa para gerenciar listas de compras.**

[🌐 **Demo Online**](https://mercado-ebon-kappa.vercel.app) • [📱 **Funcionalidades**](#-funcionalidades) • [🚀 **Tecnologias**](#-tecnologias)

</div>

---

## 🎯 Filosofia e Propósito

O **Lista de Compras Inteligente** é uma aplicação web moderna e rica em recursos, projetada para oferecer uma experiência de usuário fluida, esteticamente agradável e altamente funcional. 

### 🏠 Filosofia Local-First
- **Funcionamento offline**: O app funciona perfeitamente sem conexão
- **Experiência rápida**: Carregamento instantâneo e responsivo
- **Sincronização opcional**: Integração com Firebase para colaboração em tempo real
- **Design inspirado**: Estética moderna inspirada em aplicativos como Notion

---

## ✨ Funcionalidades

### 🛍️ **Gestão de Listas**
- ✅ Criar e gerenciar múltiplas listas de compras
- ✅ Adicionar, editar e remover itens dinamicamente
- ✅ Categorização inteligente de produtos
- ✅ Sistema de busca avançado
- ✅ Navegação por hash (#/list/:id) para URLs únicas

### 💰 **Controle Financeiro**
- ✅ Cálculo automático de preços em tempo real
- ✅ Formatação de moeda brasileira (R$)
- ✅ Histórico de preços por item
- ✅ Reset de preços com um clique
- ✅ Subtotal por categoria

### 🎯 **Experiência do Usuário**
- ✅ Interface responsiva e moderna com tema escuro
- ✅ Animações fluidas com Framer Motion
- ✅ Feedback háptico em dispositivos móveis
- ✅ Gestos de swipe para ações rápidas
- ✅ Mensagens engraçadas que aparecem conforme o valor aumenta
- ✅ Background interativo com blobs animados

### 🔄 **Funcionalidades Avançadas**
- ✅ Sistema de desfazer/refazer (Undo/Redo) persistente
- ✅ Importação de listas via texto
- ✅ Compartilhamento de listas
- ✅ Filtros por categoria
- ✅ Modo de seleção múltipla
- ✅ Navegador de categorias flutuante
- ✅ Persistência local com localStorage
- ✅ Sincronização em tempo real com Firebase

### 🌟 **Funcionalidades Especiais**
- ✅ **Fireworks**: Celebração quando lista é completada
- ✅ **Background Interativo**: Blobs animados que mudam conforme o estado
- ✅ **CategoryNavigator**: Navegação rápida entre categorias
- ✅ **FunnyMessageDisplay**: Mensagens engraçadas baseadas no total
- ✅ **ColorPalettePicker**: Customização de cores por categoria

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 19.1.1 | Biblioteca para interfaces de usuário |
| **TypeScript** | 5.0+ | Tipagem estática para JavaScript |
| **Vite** | 5.0+ | Build tool e dev server |
| **Tailwind CSS** | 3.0+ | Framework CSS utilitário |
| **Framer Motion** | 11.3+ | Biblioteca de animações avançadas |
| **Firebase** | 10.0+ | Backend como serviço (Firestore) |
| **Local Storage** | - | Persistência de dados local |

---

## 🏗️ Arquitetura

### 📊 Gerenciamento de Estado
O estado é centralizado no componente raiz (`App.tsx`), que orquestra:
- Lista ativa e navegação
- Estado dos modais (edição, importação, compartilhamento)
- Query de busca e filtros
- Modo de seleção

### 🔄 Dualidade Local vs. Nuvem
- **Listas Locais**: Gerenciadas pelo hook `useHistoryState` com histórico completo no localStorage
- **Listas na Nuvem**: Reflexo do Firestore com sincronização em tempo real via `onSnapshot`
- **Roteamento**: Controlado por hash (`#/list/:id`) para URLs únicas

### 🎨 Componentes Principais
- **GroceryList**: Renderiza lista com agrupamento por categoria e IntersectionObserver
- **GroceryItemCard**: Componente autônomo com gestos de swipe e animações
- **EditItemModal**: Modal completo com seletor de categorias e ColorPalettePicker
- **ActionBar**: Barra superior com título editável e ações principais
- **SummaryFooter/SelectionToolbar**: Rodapé dinâmico com resumo ou ações em massa

---

## 🎨 Interface e UX

### Design Moderno
- **Paleta de cores**: Tons de cinza e azul com tema escuro
- **Tipografia**: Fontes modernas e legíveis
- **Layout**: Responsivo e adaptável
- **Animações**: Transições suaves com Framer Motion

### Componentes de UX/"Delight"
- **InteractiveBackground**: Fundo com blobs animados
- **Fireworks**: Celebração quando lista é completada
- **FunnyMessageDisplay**: Mensagens engraçadas baseadas no total
- **CategoryNavigator**: Navegador flutuante para categorias

---

## 📱 Funcionalidades Especiais

### 🎨 Background Interativo
- Fundo dinâmico com blobs de cor animados
- Mudança de "humor" conforme o estado da aplicação
- Modo celebração quando lista é completada

### 📊 Sistema de Categorias
- Categorização inteligente de produtos
- Filtros por categoria
- Tags visuais com cores customizáveis
- Navegação rápida entre categorias

### 🔄 Sistema de Histórico
- Histórico completo de alterações por lista
- Funcionalidade de desfazer/refazer persistente
- Serialização eficiente no localStorage

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
├── components/              # Componentes React
│   ├── ActionBar.tsx       # Barra de ações
│   ├── GroceryList.tsx     # Lista principal
│   ├── GroceryItemCard.tsx # Cartão de item
│   ├── EditItemModal.tsx   # Modal de edição
│   ├── InteractiveBackground.tsx # Background animado
│   ├── Fireworks.tsx       # Efeitos de celebração
│   ├── CategoryNavigator.tsx # Navegador de categorias
│   └── ...                # Outros componentes
├── hooks/                  # Custom hooks
│   ├── useHaptics.ts      # Feedback háptico
│   └── useHistoryState.ts # Histórico undo/redo
├── services/               # Serviços
│   ├── firebase.ts        # Configuração Firebase
│   └── geminiService.ts   # Serviços externos
├── scripts/                # Scripts de automação
├── types.ts                # Definições de tipos
├── constants.ts            # Constantes da aplicação
└── App.tsx                # Componente principal
```

---

## 🎯 Funcionalidades Detalhadas

### Gestão de Itens
- **Adicionar**: Botão flutuante (+) para novos itens
- **Editar**: Clique no item para editar com modal completo
- **Remover**: Botão de lixeira ou swipe para esquerda
- **Marcar**: Checkbox ou swipe para direita

### Sistema de Preços
- **Preço unitário**: Definido por item
- **Quantidade**: Ajustável para cada item
- **Total automático**: Cálculo em tempo real
- **Subtotal por categoria**: Agrupamento inteligente

### Persistência e Sincronização
- **Local Storage**: Dados salvos localmente com histórico
- **Firebase**: Sincronização em tempo real para listas compartilhadas
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

---

<div align="center" style="margin-top: 2rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.85rem; color: #888;">

**😄 Disclaimer:** As frases engraçadas que aparecem no app são pura ficção! Nenhuma pessoa real foi consultada na criação dessas pérolas.

</div> 