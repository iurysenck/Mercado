@echo off
REM Script para commitar as melhorias na lógica das mensagens
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias na lógica das mensagens
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/TableFooter.tsx

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: melhorar lógica das mensagens engraçadas

- Mensagens aparecem aleatoriamente a partir de R$ 300
- Nova mensagem a cada R$ 100 adicionados (300, 400, 500, etc.)
- Sistema de threshold para evitar mensagens duplicadas
- Reset automático quando valor cai abaixo de R$ 300
- Melhor controle de quando mostrar novas mensagens
- Mantém estado do último threshold para comparação"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias na lógica das mensagens commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Mensagens aleatórias a partir de R$ 300
echo - Nova mensagem a cada R$ 100 adicionados
echo - Sistema inteligente de thresholds
echo - Melhor experiência do usuário
echo.
pause 