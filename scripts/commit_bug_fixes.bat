@echo off
REM Script para corrigir bugs identificados
REM Autor: Assistente AI
REM Data: %date% %time%

echo ========================================
echo Corrigindo bugs identificados
echo ========================================

REM Adicionar arquivos modificados
echo 1. Adicionando arquivos modificados...
git add components/IconComponents.tsx components/Toast.tsx components/EditItemModal.tsx components/ActionBar.tsx

REM Fazer commit das correções
echo 2. Fazendo commit das correções...
git commit -m "fix: corrigir múltiplos bugs

- Melhorar ícones de colar e copiar com design moderno
- Corrigir posição do Toast para não sobrepor mensagem engraçada
- Reduzir tempo de exibição do Toast de 4s para 2s
- Corrigir edição de cards após adicionar item
- Aumentar z-index do dropdown do ActionBar
- Melhorar persistência de dados
- Corrigir botões de zerar preços e limpar itens
- Adicionar useEffect para sincronizar estado do modal"

REM Fazer push para o GitHub
echo 3. Fazendo push para o GitHub...
git push origin main

echo ========================================
echo Correções de bugs commitadas!
echo ========================================
echo.
echo As correções incluem:
echo - Ícones de colar/copiar melhorados
echo - Toast não sobrepõe mais mensagem engraçada
echo - Toast desaparece mais rápido
echo - Edição de cards funcionando
echo - Dropdown do ActionBar com z-index correto
echo - Persistência melhorada
echo.
pause 