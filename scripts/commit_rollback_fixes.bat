@echo off
REM Script para commitar correções após rollback
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Commitando correções após rollback
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/IconComponents.tsx components/EditItemModal.tsx

REM Fazer commit das correções
echo 2. Fazendo commit das correções...
git commit -m "fix: corrigir problemas após rollback

- Restaurar ícones de colar e copiar para versões melhores
- Remover lixeira duplicada do EditItemModal
- Corrigir layout do footer do modal
- Manter funcionalidades básicas funcionando
- Rollback para versão estável do app"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Correções após rollback commitadas!
echo ========================================
echo.
echo As correções incluem:
echo - Ícones de colar/copiar restaurados
echo - Lixeira duplicada removida
echo - Layout do modal corrigido
echo - App funcionando corretamente
echo.
pause 