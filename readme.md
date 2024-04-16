# Construindo a sua primeira API REST

Tenho certeza de que você já deve ter ouvido termos como frontend, backend, API, banco de dados entre outros. Mas o que de fato significam todos esses termos. A ideia desse reposítório ensinar a você a criar a sua primeira API, sem a preocupação com o frontend.

Mas antes de iniciar os trabalhos, precisamos situalos sobre todos os tópicos que vamos trabalhar construindo na mão aqui.

- **Front-End**:O frontend é a parte de um sistema ou aplicativo que os usuários interagem diretamente. Envolve o design, layout e interação com elementos visuais. O frontend é um extensa área e a edição anterior tratou isso.
- **Back-End**: Aqui é onde ocorre todo a lógica da aplicação, ele é responsavel pelo manipulação dos dados e conversa juntamente ao Banco de Dados
- **API**: Application Programming Interface (Interface de Programação de Aplicação). Geralmente o frontend console uma API disponibilizada pelo backend, essa API serve como ponto de acesso controlado as funcionalides -- Você não quer todo mundo podendo fazer mexer no seu banco de dados


Agora que estamos familirizados com os principais termos, fica uma pergunta:
### O que vamos construir?

Um sistema de TO-DO de task, onde é possivel criar, ler, atualizar e deletar as tasks. O famoso CRUD. Para isso usaremos a stack do backend: node.js, express, sqlite3. Para o front end, será usado react.

## Configurando o ambiente

### Linux
Instale o Node Version Manager -- NVM. 

``````bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
``````

``````bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
``````

A execução de qualquer um dos comandos acima baixa um script e o executa. O script clona o repositório nvm para `~/.nvm`, e tenta adicionar as linhas de origem do snippet abaixo ao arquivo de perfil correto (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, ou `~/.bashrc`).

``````bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
``````

Após isso instale o Node LTS

``````bash
nvm install --lts 
nvm use --lts
``````

### Windows

Entre no site oficial do [Node](https://nodejs.org/en/download/current). Baixe a versão LTS e rode o executavel. 

## Iniciando o Projeto

Para iniciar o projeto, o frontend será dados baixe ele como, em seguida entre na pasta

``````bash
git clone https://github.com/petcompgroup/bootcamp_node_2024.git
cd bootcamp_node_2024
``````
Agora a unica coisa que temos é uma pasta chamada frontend, entre nele e instale a as dependencias e rode o para verificar
```bash 
cd frontend # entra pasta do frontend
npm install # Instala todas as depêndendicas
npm run dev # Roda a aplicação frontend
```

![Imagem do frontend puro](.\imagem(ignorar)\frontendSemBack.png)

Agora temos um aplicação rodando, mas ela ainda não é funcional, pois não existe um backend para dar lógica e gerenciar o armazenamento dos dados.  Vamos iniciar agora a construção da API, volte para a pasta raiz do projeto crie uma pasta backend pela interface ou pelo comando `mkdir backend` e entre nela.

``````bash
cd backend
``````

Agora temos que iniciar o projeto com `npm init -y`. Isso cria um arquivo __package.json__, entre nela precisaremos editar algumas coisas nele, abaixo do campo "main" coloque `"type": "module",` e dentro de scripes iremos inserir um script de dev

`````json
  "dev": "node --watch src/index.js"
`````

Temos quase tudo para iniciar o desenvolvimento, e para fins de organização vamos criar uma esquema de pastas você pode fazer manualmente o seguinte esquema 

``````
backend 
	|>src 
		|> controllers
		|> db
		|> models
frontend
``````

Dentro da pasta `src` crie um arquivo `index.js` 

Vamos agora criar a sua primeira rota, instale o express no projeto com `npm install express`

Aqui vem um conceito de node.js, todos os seus modulos que são importados da seguinte forma

``````javascript
import {} from 
``````

São rodados de forma assíncrona pelo Node, isso não tem importância nesse momento, é apenas uma curiosidade. Mas esse será nosso padrão de importações a partir daqui.

### Criando o Servidor 

Para iniciar um servidor usando o express, o processo é simples, importe o modulo no index.js, crie um constante – em JS usa-se a palavra reservada const – que por padrão chamaremos de server que recebe o retorno de express(). Por fim coloque para ouvir em uma porta assim como no código a seguir. 

````javascript
import  express  from 'express'

const PORT = 3000;
const server = express();

// Iniciar o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
````

OK, ok esse código tem coisas esquisitas, o que é  `() => {}`? como funciona o listen?  E outros métodos do do express, como get, update, delete, put etc.

A primeira pergunta é facilmente repondida, com isso é uma função anônima em JS, elas tem algumas vantagens em relação nesse contexto, onde a função é usada como <ins>callback</ins> – Que são funções passadas como variáveis para outras funções, que serão executadas em um momento posterior. Se os conceitos de funções anonimas e callbacks não ficaram claros ainda, eles ficarão até o fim desse roteiro.

Agora que temos um servidor inicial, podemos verificar ele rodando:

``````
npm run dev
``````

No terminal deve sair o resultado do `console.log()` Que está no callback do listen.

Entretanto, nesse ponto esse servidor ainda não faz nada, apenas está escutando, mas nada responde nada, vamos criar a primeira rota, antes do `server.listen()` coloque o seguinte código.

~~~javascript
server.get('/ad', (req, res) => {
	res.send('Facas Ginsu!!');
});
~~~

Para enteder o que o código acima está fazendo é precisso entender o básico de HTTP e seus verbos, já comentandos deles quando criamos o listen, o protocolo HTTP serve para comunicação em alto nivel de aplicações Web, aqui está um lista dos principais métodos/verbos.

1. **GET**: Solicita dados de um recurso especificado pelo URI. É um método seguro, o que significa que não deve alterar o estado do servidor.

2. **POST**: Envia dados para serem processados ​​para um recurso especificado. É usado para criar um novo recurso no servidor. Pode ser usado para enviar grandes volumes de dados.

3. **PUT**: Substitui todas as representações atuais do recurso de destino com os dados enviados na solicitação. Se o recurso não existir, o servidor pode criá-lo com os dados fornecidos.

4. **DELETE**: Remove o recurso especificado pelo URI.

O <ins>express</ins>  abstrair esse verbos, para os métodos(funções) do nosso sever. Assim é trivial ver que o que estamos fazendo é usar http com o verbo GET de forma abstraidno solicitando um recurso.

Para testar vamos usar dessa vez o a ferramenta curl ou o um navegador, uso a linha abaixo ou acesse o link no navegador.

~~~bash
curl -X GET http://localhost:3000/ad
~~~

### req e res

Essas duas variaveis parecem que virem do nada, mas não, elas fazem parte do http, onde temos uma requisição e uma resposta. A nossa **req** é onde vamos receber dados (req vem de request), enquanto a **res** é por onde vamos enviar os dados (res vem de response).

Assim finalizamos nossa primeira rota, temos um servidor rodando, mas apesar de ser possivel fazer todo o sistema to-do em memória, se o servidor reinicar, perderemos todos os dados.

## Banco de Dados

O SQLite é um sistema de gerenciamento de banco de dados relacional leve, rápido e incorporável que não requer configuração de servidor. É uma excelente escolha para aplicativos que necessitam de um banco de dados simples e fácil de usar. Usando a linguagem SQL, para as consultas, vamos explicar o necessário dela aos poucos.

### Módulo SQLite para Node.js

Para trabalhar com o SQLite em Node.js, podemos usar o módulo `sqlite3`. Este módulo fornece uma API simples para interagir com bancos de dados SQLite. Para começar, você pode instalá-lo via npm:

```bash
npm install sqlite sqlite3
```

Dentro da pasta db, vamos criar dois arquivos `config.js` e `init.js` 

Em `config.js` coloque o código abaixo, esse código importa sqlite e a função open dos módulos de sqlite. A função recebe um caminho, e um driver -- Responsavel pelas consultas no Banco de Dados.

~~~javascript
import  sqlite3  from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
    return open({
        filename: "./src/db/tasks.db",
        driver: sqlite3.Database,
    });
    }
~~~

No arquivo `init.js` cole o código a seguir. Esse código importa a função que estamos expostando no código acima, e usa o método exec() para construir uma tabela. 

~~~javascript
import { openDb } from "./config.js";

export async function initDb() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT NOT NULL,
        date TEXT NOT NULL
        )
    `);
    console.log("Database was opened!");
    }
~~~


#### Query SQL: CREATE TABLE IF NOT EXISTS

Esta query cria uma tabela chamada "tasks" no banco de dados, se ela ainda não existir. A tabela terá as seguintes colunas:
- `id`: Chave primária única para cada tarefa.
- `title`: Título da tarefa, não pode ser nulo.
- `status`: Status da tarefa, não pode ser nulo.
- `date`: Data da tarefa, não pode ser nulo.

### Simplificando async/await em JavaScript

- **async**: É usado para definir funções assíncronas. Isso permite que o código dentro delas seja executado de forma assíncrona, enquanto o programa continua a executar outras tarefas.

- **await**: É usado dentro de funções assíncronas para esperar a conclusão de operações assíncronas. Quando `await` é utilizado, a execução da função é pausada até que a operação assíncrona seja concluída, retornando o resultado dessa operação.

Voltando ao arquivo `index.js` importe a função que criamos `import { initDb } from './db/init.js';` e chame ela no código, se tudo funcionou, deve ter sido criado um arquivo, dentro da pasta db.

## Criando o nosso models

Estamos criando uma aplicação, MVC, vamos agora nos concentrar em criar um rota de criação das task, mas para a manipulação dela devemos criar um class que seja capaz de editar ela.

**Criando Um Objeto que é um espelho do BD**

Vamos criar uma class que tenha os mesmos atributos que a tabela. coloque essa class em um arquivo `entityTask.js`  em models. 

~~~javascript 
export class EntityTask{
    constructor(title, status, date){
        this.id = Date.now(); //pega o milisegundo de 1970 até agora;
        this.title = title;
        this.status = status;
        this.date = date;
    }
}
~~~

Mas apesar de ser um espelho do objetos no banco de dados, ainda não podemos manipular o banco em Si. Vamos criar um arquivo `taskModel.js` em models, e extenderemos a class que acabamos de criar. 

Para manipular o banco de dados, temos de abrir o banco, então vamos precisar importar ele também e criar um método para isso.


~~~javascript 
import { EntityTask } from "./entityTask.js";
import { openDb } from "../db/config.js";


export class TaskCollection extends EntityTask {
  constructor(id, title, status, date) {
    super(id, title, status, date);
    this.tasks = [];
    this.db = this.openDatabase();
  }

  async openDatabase() {
    try {
        this.db = await openDb();
    } catch (error) {
      console.log(error);
    }
  }
}
~~~

- **super**: chama o construtor da classe que essa herda
- **tasks**: Um vetor para representar a tabela.
- **db**: cria a conexão com o banco de dados

Surgiu mais uma estrutura de JS, um bloco `try {} catch {}`

- **try**: O bloco `try` é utilizado para envolver o código que pode gerar exceções (erros). Quando o código dentro do bloco `try` é executado, o JavaScript monitora qualquer exceção que possa ocorrer.

- **catch**: Se uma exceção é lançada dentro do bloco `try`, o controle do programa é transferido para o bloco `catch`. O bloco `catch` é onde você pode lidar com a exceção, escrevendo código para tratar o erro de forma apropriada.

## Criando a primeira da aplicação

Vamos criar o **CRUD**, começando para com o nosso CREATE, criamos um método dentro do nosso `taskModels`, ele vai receber, nossa req e res, pois estamos lidando com http e um objeto task, que vamos inserir no banco de dados. 

Estamos lidando com operações que podem resultar em erro, logo precisamos estar em bloco `try {}  catch {}`

O comando SQL para inserir algo em uma tabela é o INSERT, que tem a seguinte estrutura.
~~~SQL
INSERT INTO nome da tabela (campos) VALUES ();
~~~

Essa parte precisa ser await, pois queremos ter certeza que a task está no banco antes de reenderizar a tela.

Por fim apenas enviamos a task com o `send()` da nossa response.

~~~javascript
  async createTask(req, res, task) {
    try {
      await this.db.run(
        "INSERT INTO tasks (id, title, status, date) VALUES (?,?,?,?)",
        [task.id, task.title, task.status, task.date]
      );
      res.status(201).send(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao criar tarefa");
    }
  }
~~~

Mas o que é esse `status()` que apareceu antes do `send()`.

#### Status HTTP

- **1xx - Informativo**: Indica que a solicitação foi recebida e está sendo processada. Normalmente usado para fins informativos e não requer ação do cliente.

- **2xx - Sucesso**: Indica que a solicitação foi bem-sucedida e foi processada com êxito pelo servidor. O código mais comum nesta faixa é o 200, indicando que a solicitação foi bem-sucedida.

- **3xx - Redirecionamento**: Indica que mais ações precisam ser tomadas para completar a solicitação. Por exemplo, redirecionamento para outra URL.

- **4xx - Erro do Cliente**: Indica que houve um erro por parte do cliente, como uma solicitação malformada ou acesso não autorizado. O código mais comum nesta faixa é o 404, indicando que o recurso solicitado não foi encontrado.

- **5xx - Erro do Servidor**: Indica que houve um erro por parte do servidor ao processar a solicitação. Isso pode ocorrer devido a falhas temporárias ou permanentes no servidor. O código mais comum nesta faixa é o 500, indicando um erro interno do servidor.

Com isso fica claro que estamos retornado 201 pois foi sucesso, e 500 pois ocorreu um Erro.

Estamos quase prontos para conseguir interagir com nossa VIEW, falta criar um controller para isso.


## Criando o Controller

Dentro da pasta controller crie um arquivo `taskControler.js`, ele que vai ser responsavel por fazer o roteamento, e chamar as respectivas funções do nosso model.

inicialmente importe o que é necessário.

~~~javascript
import express from 'express';
import {TaskCollection} from '../models/taskModel.js';
import {EntityTask} from '../models/entityTask.js';
~~~

Criamos então as constante necessárias:

~~~javascript
const router = express.Router();
const taskModel = new TaskCollection();
~~~

Queremos criar uma task, então precismos usar um post

~~~javascript
router.post('/', (req,res) => {
    const { title, status, date } = req.body; // Usamos um destrutor para separar as variaveis
    const task = new EntityTask(title, status, date); // Criamos objeto task
    console.log(task) // apenas para verificar funcionamento
    taskModel.createTask(req,res,task); // Chamamos, o método inserir no banco de daods
})
~~~

Quase lá!!

antes de continuar temos que exportar nosso router

~~~javascript
export {router as routes}
~~~

Vamos terminar configurar o `index.js`

Installe o cors com `npm install cors`.
Em resumo, o CORS é uma técnica usada para permitir que recursos da web sejam acessados por clientes de diferentes origens, enquanto mantém a segurança e a privacidade dos usuários da web.

Vamos importar os modulos necessários


~~~javascript
import { routes } from './controllers/taskController.js';
import { initDb } from './db/init.js';
import cors from 'cors';
~~~



antes do listen coleque as seguintes linhas
~~~javascript
server.use(express.urlencoded({ extended: true })) //habilita o express para receber dados da url
server.use(express.json()) //habilita o express para receber dados JSON
server.use(cors()) //habilita o cors
server.use(routes) //Usa o arquivo routes.js
~~~


Pronto! Rode `npm run dev` tanto na pasta backend e frontend, vá no [TO-DO](http://localhost:5173/)

Tende adicionar uma tarefa, volte para o terminar que está rodando o servidor backend, e verificque se ele printou a task.
