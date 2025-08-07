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

REM Configurar credenciais do Git (você precisará ajustar estas informações)
echo 2. Configurando credenciais do Git...
echo Por favor, configure suas credenciais do Git:
echo.
set /p git_email="Digite seu email do GitHub: "
set /p git_name="Digite seu nome: "
git config user.email "%git_email%"
git config user.name "%git_name%"

REM Adicionar todos os arquivos
echo 3. Adicionando todos os arquivos...
git add .

REM Fazer o primeiro commit
echo 4. Fazendo o primeiro commit...
git commit -m "Initial commit: App Mercado - Lista de Compras"

REM Adicionar o repositório remoto
echo 5. Adicionando repositório remoto...
git remote add origin https://github.com/iurysenck/Mercado.git

REM Configurar branch principal
echo 6. Configurando branch principal...
git branch -M main

REM Fazer push para o GitHub
echo 7. Fazendo push para o GitHub...
echo Nota: Você pode ser solicitado a inserir suas credenciais do GitHub
git push -u origin main

echo ========================================
echo Processo concluído!
echo ========================================
echo.
echo O projeto foi commitado com sucesso no GitHub:
echo https://github.com/iurysenck/Mercado
echo.
pause 