# Scripts de Automação

Esta pasta contém scripts de automação para facilitar o desenvolvimento e deploy do projeto Mercado.

## Scripts Disponíveis

### `commit_to_github.bat`
Script inicial para commitar o projeto no GitHub pela primeira vez.
- Inicializa repositório Git
- Adiciona todos os arquivos
- Faz o primeiro commit
- Conecta ao repositório remoto
- Faz push para o GitHub

### `commit_to_github_updated.bat`
Versão atualizada do script de commit com configuração de credenciais.
- Inclui configuração interativa de email e nome
- Mais robusto para diferentes cenários

### `commit_footer_improvements.bat`
Script para commitar melhorias específicas do footer.
- Commit focado em melhorias de UI/UX
- Mensagem de commit detalhada

### `commit_message_position.bat`
Script para commitar melhorias na posição das mensagens engraçadas.
- Reposicionamento das mensagens acima do footer
- Adição de botão de fechar
- Melhorias no design

### `commit_message_logic.bat`
Script para commitar melhorias na lógica das mensagens.
- Nova lógica de thresholds (R$ 300, R$ 400, etc.)
- Mensagens aleatórias a cada R$ 100
- Sistema inteligente de controle

## Como Usar

1. Execute qualquer script clicando duas vezes no arquivo .bat
2. Ou execute via linha de comando: `.\scripts\nome_do_script.bat`
3. Os scripts são interativos e guiarão você pelo processo

## Observações

- Estes scripts são específicos para o projeto Mercado
- Podem ser adaptados para outros projetos
- Mantenha os scripts atualizados conforme o projeto evolui 