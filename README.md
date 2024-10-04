# Todo



<p align="center">
 <a href="#Tecnologias">Tecnologias</a> •
 <a href="#Primeiros-passos">Primeiros passos</a> •
 <a href="#Executar-com-o-docker">Executar com o docker</a> •
 <a href="#Executar-sem-o-docker">Executar sem o docker</a>
</p>

## Tecnologias

-   [Docker](https://www.docker.com/):  Plataforma para criar, executar e compartilhar aplicativos com containers.
-   Backend
    -   [ASP NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1): Estrutura multiplataforma para criar aplicativos da Web
    -   [SQL Server](https://www.microsoft.com/en-us/sql-server): Banco de dados relacional da Microsoft
    -   [Dapper](https://dapper-tutorial.net/dapper): Micro ORM
-   Frontend
    -   [ReactJS](https://reactjs.org/): Biblioteca JavaScript para criar interfaces de usuario
    -   [Typescript](https://www.typescriptlang.org/)
    -   [React Router DOM](https://reacttraining.com/react-router/web/guides/quick-start):  Roteamento declarativo para React

# Primeiros-passos

### Clone

Clonar este repositorio

```
git clone https://github.com/FilipeBravos/ToDoApp
```

Em seguida, mude para a pasta do repositorio

```
cd todo
```

### Executar-com-o-docker

Requer

-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker compose](https://docs.docker.com/compose/install/)

Execute o seguinte comando para iniciar o banco de dados, o backend e o frontend

```
docker-compose up -d
```

A API do ASP.NET Core estara disponivel em `http://localhost:5000`
O aplicativo ReactJS estara disponivel em `http://localhost:3000`

Para interromper a execucao do aplicativo

```
docker-compose down
```

### Executar-sem-o-docker

Requer

-   [SQL SERVER](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
-   [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download)
-   [NodeJS](https://nodejs.org/en/)

**Executar a Api**

Primeiro, restaure as dependencias

```bash
$ dotnet restore
```

Adicione as seguintes secoes ao `appsettings.json` localizado no diretorio ./src/ToDoApp

```json
{
    "ConnectionStrings": {
        "SqlServerConnection": "CONNECTION STRING HERE"
    },
    "CorsOptions": {
        "PolicyName": "TodoApiPolicy",
        "AllowedOrigin": "http://localhost:3000"
    },
    "JwtToken": {
        "Audience": "TodoClient",
        "Issuer": "TodoApi",
        "Key": "KEY",
        "Seconds": 180
    }
}
```

Crie tabelas de banco de dados com o script sql localizado em ./database/scripts/init.sql

Em seguida, execute o projeto com

```bash
$ dotnet run --project src/ToDoApp
```

**Executando o aplicativo React**

Preencha o arquivo env localizado em ./src/todo-app com a url da API:

```
REACT_APP_API_URL=http://localhost:5000
```

```bash
# Instalar dependencias
$ npm install --prefix src/todo-app

# Inicio do projeto
$ npm start --prefix src/todo-app
```
