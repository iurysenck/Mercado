@echo off
REM Script para commitar melhorias de UI e funcionalidades
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias de UI e funcionalidades
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/EditItemModal.tsx components/IconComponents.tsx components/TableFooter.tsx hooks/useHistoryState.ts README.md

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: melhorar UI e funcionalidades

- Adicionar combobox glassmorphism para categorias
- Melhorar input de quantidade com botões +/- modernos
- Implementar mensagens engraçadas sempre aleatórias e diferentes
- Corrigir persistência de dados ao atualizar página
- Remover seção de mensagens engraçadas do README
- Adicionar ícones ChevronDownIcon, PlusIcon, MinusIcon
- Melhorar lógica de carregamento do localStorage
- Sistema de rotação de mensagens para evitar repetição
- Interface mais moderna e responsiva
- Melhor experiência de usuário"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias de UI e funcionalidades commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Combobox glassmorphism para categorias
echo - Input de quantidade moderno
echo - Mensagens engraçadas sempre diferentes
echo - Persistência corrigida
echo - Interface mais moderna
echo.
pause 