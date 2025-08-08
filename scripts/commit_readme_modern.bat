@echo off
REM Script para commitar o README moderno e estruturado
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando README moderno e estruturado
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add README.md

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "docs: criar README moderno e estruturado

- README completamente reformulado e modernizado
- Adicionar badges de tecnologias (TypeScript, React, Vite, Tailwind)
- Seções organizadas e bem estruturadas
- Documentação completa das funcionalidades
- Instruções de instalação e uso
- Estrutura do projeto detalhada
- Funcionalidades especiais documentadas
- Guia de contribuição
- Design profissional e atrativo
- Emojis e formatação moderna"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo README moderno commitado com sucesso!
echo ========================================
echo.
echo As melhorias incluem:
echo - README completamente reformulado
echo - Design moderno e profissional
echo - Documentação completa
echo - Badges e emojis atrativos
echo - Estrutura clara e organizada
echo.
pause 