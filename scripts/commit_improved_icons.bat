@echo off
REM Script para commitar melhorias nos ícones
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias nos ícones
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/IconComponents.tsx components/TableFooter.tsx

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: melhorar ícones de limpar e desmarcar

- Substituir BroomIcon por TrashBinIcon mais intuitivo
- Substituir ArrowUturnLeftIcon por RefreshIcon mais moderno
- Adicionar novos ícones: TrashBinIcon, RefreshIcon, CheckmarkCircleIcon, ArrowPathIcon
- Melhorar experiência visual dos botões do footer
- Ícones mais claros e reconhecíveis
- Design mais consistente com o tema do app"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias nos ícones commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Ícone de lixeira mais intuitivo para limpar
echo - Ícone de refresh mais moderno para desmarcar
echo - Novos ícones adicionados
echo - Melhor experiência visual
echo.
pause 