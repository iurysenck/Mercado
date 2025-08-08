@echo off
REM Script para limpar arquivos sem extensão
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Limpando arquivos sem extensão
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add .gitignore

REM Fazer commit das correções
echo 2. Fazendo commit das correções...
git commit -m "chore: limpar arquivos sem extensão e prevenir futuros

- Remover arquivos sem extensão gerados acidentalmente
- Atualizar .gitignore para prevenir arquivos sem extensão
- Adicionar regras específicas para arquivos válidos
- Prevenir criação de arquivos de comandos ou CSS classes
- Manter apenas arquivos com extensões válidas"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Limpeza de arquivos commitada!
echo ========================================
echo.
echo As correções incluem:
echo - Arquivos sem extensão removidos
echo - .gitignore atualizado
echo - Prevenção de arquivos acidentais
echo - Apenas arquivos válidos permitidos
echo.
pause 