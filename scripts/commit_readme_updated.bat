@echo off
echo ========================================
echo Atualizando README com nova arquitetura
echo ========================================

echo.
echo Adicionando arquivos modificados...
git add README.md

echo.
echo Criando commit com as atualizações...
git commit -m "docs: atualiza README com nova arquitetura e funcionalidades

- Adiciona filosofia local-first e integração Firebase
- Documenta sistema de histórico com useHistoryState
- Inclui funcionalidades especiais (Fireworks, Background Interativo)
- Atualiza estrutura de componentes e arquitetura
- Adiciona seção de gerenciamento de estado centralizado
- Documenta dualidade local vs. nuvem
- Inclui novos componentes de UX (CategoryNavigator, FunnyMessageDisplay)
- Atualiza tecnologias com Firebase
- Melhora documentação de funcionalidades avançadas"

echo.
echo ========================================
echo README atualizado com sucesso!
echo ========================================
echo.
echo Próximos passos:
echo 1. Verifique as mudanças: git log --oneline -1
echo 2. Faça push: git push origin main
echo.
pause 