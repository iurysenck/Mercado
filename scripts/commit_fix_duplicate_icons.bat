@echo off
REM Script para corrigir ícones duplicados
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Corrigindo ícones duplicados
echo ========================================

REM Adicionar arquivo corrigido
echo 1. Adicionando arquivo corrigido...
git add components/IconComponents.tsx

REM Fazer commit da correção
echo 2. Fazendo commit da correção...
git commit -m "fix: corrigir ícones duplicados

- Remover exportações duplicadas de CheckIcon
- Remover exportações duplicadas de PlusIcon
- Corrigir erro de build no Vercel
- Manter apenas uma versão de cada ícone
- Garantir compatibilidade com esbuild"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Correção dos ícones duplicados commitada!
echo ========================================
echo.
echo A correção inclui:
echo - Remoção de CheckIcon duplicado
echo - Remoção de PlusIcon duplicado
echo - Build corrigido para Vercel
echo.
pause 