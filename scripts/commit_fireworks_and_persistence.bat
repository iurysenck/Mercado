@echo off
REM Script para commitar melhorias nos fogos e sistema de persistência
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando melhorias nos fogos e persistência
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/Fireworks.tsx components/AdvancedOptionsModal.tsx components/IconComponents.tsx components/ActionBar.tsx App.tsx

REM Fazer commit das melhorias
echo 2. Fazendo commit das melhorias...
git commit -m "feat: melhorar fogos e adicionar sistema de persistência

- Melhorar animação de fogos com mais brilho e partículas
- Adicionar sparkles adicionais para mais efeito visual
- Aumentar número de fogos (15 -> 25) e sparkles (50)
- Melhorar cores e efeitos de blur
- Adicionar overlay de brilho animado
- Criar modal de opções avançadas com reset completo
- Adicionar botão de opções avançadas no ActionBar
- Implementar função de reset completo do app
- Limpar todos os dados do localStorage no reset
- Adicionar ícones ExclamationTriangleIcon, CheckIcon, CogIcon
- Melhorar persistência de dados com backup automático
- Sistema robusto de gerenciamento de listas"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Melhorias nos fogos e persistência commitadas!
echo ========================================
echo.
echo As melhorias incluem:
echo - Fogos mais brilhantes e animados
echo - Sistema de persistência robusto
echo - Opções avançadas com reset completo
echo - Melhor experiência visual
echo.
pause 