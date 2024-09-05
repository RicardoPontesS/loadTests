# README.md

## Descrição

Este script foi desenvolvido para realizar testes de carga no site da SCTI de 2024 da UENF (Universidade Estadual do Norte Fluminense). Ele utiliza a ferramenta [K6](https://k6.io/) para simular múltiplos usuários acessando as rotas de **signup** e **login** do sistema, verificando se essas operações estão funcionando corretamente sob alta carga.

## Funcionamento

O script cria usuários fictícios, envia uma requisição para registrar um novo usuário (signup) e depois realiza o login com as credenciais geradas. Em ambos os casos, ele verifica se o status das respostas é `200 OK`.

## Como usar

### Pré-requisitos

1. Tenha o [K6](https://k6.io/docs/getting-started/installation/) instalado no seu sistema.
2. Verifique que a aplicação da SCTI 2024 está rodando localmente na porta 8080 (ou ajuste a variável `PORT` conforme necessário).

### Execução do teste

1. Clone este repositório ou copie o script `k6-load-test.js` para o seu ambiente.
2. No terminal, execute o comando:
    ```bash
    k6 run k6-load-test.js
    ```

Isso iniciará o teste de carga com 100 usuários virtuais (`vus: 100`) por um período de 120 segundos (`duration: '120s'`).

### Variáveis configuráveis

- `PORT`: Define a porta na qual o servidor está rodando.
- `BASE_URL`: Define a URL base para as requisições.

### Estrutura do script

- **Função `generateRandomUser()`**: Gera dados aleatórios de nome, e-mail e senha para um novo usuário.
- **Requisição de Signup**: Faz uma requisição POST para a rota `/signup` com os dados gerados.
- **Requisição de Login**: Após o cadastro, o script faz login com o e-mail e senha gerados.

### Checagens

O script realiza verificações para garantir que as respostas do servidor tenham status `200 OK` tanto no processo de signup quanto de login.

### Headers

O script utiliza headers customizados, como `HX-Request`, `HX-Trigger`, e `HX-Target`, para simular corretamente o comportamento de requisições feitas pelo **HTMX**, que a aplicação SCTI 2024 utiliza.

## Resultados

O K6 exibirá no terminal um resumo dos testes, incluindo:
- Quantidade de requisições por segundo.
- Percentual de sucesso nas requisições.
- Tempo de resposta.

Esses resultados são úteis para avaliar a capacidade do sistema em suportar uma quantidade significativa de usuários simultâneos.

---

Este teste é parte do processo de avaliação de desempenho da aplicação SCTI 2024 e auxilia na identificação de possíveis gargalos sob condições de carga.
