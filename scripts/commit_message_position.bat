@echo off
REM Script para commitar as melhorias na posição das mensagens
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias na posição das mensagens
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/TableFooter.tsx components/IconComponents.tsx App.tsx

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: reposicionar mensagens engraçadas acima do footer

- Mover mensagens engraçadas para posição fixa acima do footer
- Adicionar botão de fechar (X) nas mensagens
- Melhorar design das mensagens com backdrop blur e bordas
- Ajustar z-index para não atrapalhar outros elementos
- Simplificar layout do footer (grid-cols-3 -> grid-cols-2)
- Adicionar XMarkIcon para botão de fechar
- Aumentar padding bottom do conteúdo principal
- Melhorar animações de entrada e saída das mensagens"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias na posição das mensagens commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Mensagens aparecem acima do footer sem atrapalhar
echo - Botão de fechar nas mensagens
echo - Design mais elegante das mensagens
echo - Melhor experiência do usuário
echo.
pause 