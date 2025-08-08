@echo off
REM Script para atualizar disclaimer
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Atualizando disclaimer
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add README.md

REM Fazer commit das correções
echo 2. Fazendo commit das correções...
git commit -m "docs: atualizar disclaimer com texto exato

- Simplificar disclaimer para texto direto
- Remover elementos humorísticos extras
- Manter proteção legal clara e concisa
- Texto: 'As frases engraçadas que aparecem no app são pura ficção! Nenhuma pessoa real foi consultada na criação dessas pérolas.'"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Disclaimer atualizado!
echo ========================================
echo.
echo As correções incluem:
echo - Texto simplificado e direto
echo - Proteção legal clara
echo - Disclaimer conciso
echo.
pause 