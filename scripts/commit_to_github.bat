@echo off
REM Script para commitar o projeto Mercado no GitHub
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Iniciando processo de commit no GitHub
echo ========================================

REM Inicializar repositório Git
echo 1. Inicializando repositório Git...
git init

REM Adicionar todos os arquivos
echo 2. Adicionando todos os arquivos...
git add .

REM Fazer o primeiro commit
echo 3. Fazendo o primeiro commit...
git commit -m "Initial commit: App Mercado - Lista de Compras"

REM Adicionar o repositório remoto
echo 4. Adicionando repositório remoto...
git remote add origin https://github.com/iurysenck/Mercado.git

REM Configurar branch principal
echo 5. Configurando branch principal...
git branch -M main

REM Fazer push para o GitHub
echo 6. Fazendo push para o GitHub...
git push -u origin main

echo ========================================
echo Processo concluído!
echo ========================================
echo.
echo O projeto foi commitado com sucesso no GitHub:
echo https://github.com/iurysenck/Mercado
echo.
pause 