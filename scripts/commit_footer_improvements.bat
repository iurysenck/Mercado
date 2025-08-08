@echo off
REM Script para commitar as melhorias do footer no GitHub
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias do footer
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/TableFooter.tsx App.tsx

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: melhorar footer - reduzir tamanho e melhorar botões

- Reduzir padding geral do footer (p-3 -> p-2)
- Diminuir tamanho dos botões (px-3 py-2 -> px-2.5 py-1.5)
- Melhorar espaçamento e layout dos botões
- Adicionar efeitos de hover e active nos botões
- Tornar botões responsivos (texto oculto em mobile)
- Reduzir tamanho dos ícones (w-4 h-4 -> w-3.5 h-3.5)
- Melhorar animações das mensagens engraçadas
- Ajustar espaçamento do conteúdo principal
- Melhorar backdrop blur do footer"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias do footer commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Footer mais compacto e elegante
echo - Botões menores e mais responsivos
echo - Melhor experiência em dispositivos móveis
echo - Animações mais suaves
echo.
pause 