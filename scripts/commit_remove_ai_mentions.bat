@echo off
REM Script para remover menções a IA do README
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Removendo menções a IA do README
echo ========================================

REM Adicionar arquivo modificado
echo 1. Adicionando arquivo modificado...
git add README.md

REM Fazer commit das correções
echo 2. Fazendo commit das correções...
git commit -m "docs: remover menções a funcionalidades de IA

- Remover 'inteligente' do título
- Remover 'automática' da categorização
- Remover 'inteligente' do sistema de busca
- Remover referência ao geminiService.ts
- Simplificar descrições sem menções a IA
- Manter funcionalidades existentes sem IA"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Menções a IA removidas do README!
echo ========================================
echo.
echo As correções incluem:
echo - Título simplificado sem 'inteligente'
echo - Categorização sem 'automática'
echo - Sistema de busca sem 'inteligente'
echo - Remoção de referências ao geminiService
echo - Descrições atualizadas
echo.
pause 