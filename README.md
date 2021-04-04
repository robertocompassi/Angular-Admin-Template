# Painel Admin para Angular

SPA utilizando Angular para criar uma painel administrativo com autenticação utilizando Bearer Token feito por Roberto Compassi com o objetivo de utilizar em futuros projetos.

Possui um exemplo de CRUD utilizando API RESTfull para listar e editar usuários.

O desenvolvimento desse projeto utiliza:
- TypeScript
- HTTP interceptors.
- Angular Authentication utilizando Route Guards.
- Uso de Lazy Loading.
- CSS pré processado utilziando SCSS.
- Arquitetura e padrões de organização de CSS (BEM e SMACSS)
- Tratamento de página não encontrada (404)

Obervações:

Após a autenticação com sucesso o token retornado é enviado no cabeçalho da requisição através da classe responsável pelo HTTP interceptor:
```bash
Authorization: Bearer <token> 
```


## Como instalar e executar em servidor local

Ao realizar pull do projeto e caso deseje executar o projeto localmente é necessário atender os requisitos para executar um projeto em Angular, como ter o Node.js e Angular CLI instalados.

Caso já atenda os requisitos para execução de um projeto angular, é necessário atualizar os pacotes do Node, presente no projeto executando a linha de comando abaixo: 


Para instalar as dependências do projeto:
```bash
npm install
```

Para executar o projeto via localhost utilizando Angular CLI:
```bash
ng serve -o
```

## Login
Para realizar o login é necessário informar email e senha aceitos pela API reqres.in
```bash
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
```

