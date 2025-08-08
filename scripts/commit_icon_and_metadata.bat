@echo off
REM Script para commitar melhorias no ícone e metadados
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias no ícone e metadados
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add index.html public/favicon.svg public/manifest.json public/browserconfig.xml README.md

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: adicionar ícone personalizado e melhorar metadados

- Criar ícone SVG personalizado com carrinho de compras animado
- Adicionar sparkles animados no ícone
- Melhorar título do navegador com emoji
- Adicionar metadados completos para compartilhamento (Open Graph)
- Configurar meta tags para Twitter Cards
- Criar manifest.json para experiência PWA
- Adicionar browserconfig.xml para Windows
- Melhorar descrição do app em português
- Configurar preconnect para performance
- Atualizar link do demo no README
- Adicionar keywords e autor
- Configurar locale pt-BR"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias no ícone e metadados commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Ícone personalizado com animações
echo - Metadados completos para compartilhamento
echo - Melhor experiência PWA
echo - Título e descrição aprimorados
echo.
pause 