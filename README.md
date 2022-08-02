# Projeto Blog Com NodeJs
## 🚀 Começando
# criação de um CRUD com MongoDB, Mongoose, Express.js, Node.js e Javascript
### Aonde Criamos, Atualizamos, e Excluimos as postagens e categorias do nosso blog .
# Dependências 📋 Pré-requisitos

# npm install --save express
#### O Express é um framework incrível e possui diversas características que facilitam o desenvolvimento de nossas aplicações. Dentre suas principais características, podemos citar:
#### Possui um sistema de rotas completo;
#### Possibilita o tratamento de exceções dentro da aplicação;
#### Permite a integração de vários sistemas de templates que facilitam a criação de páginas web para suas aplicações;
#### Gerencia diferentes requisições HTTP com seus mais diversos verbos;
#### Feito para a criação rápida de aplicações utilizando um conjunto pequeno de arquivos e pastas;
______________________________________________




## npm install --save express-handlebars
#### Handlebars.js é um mecanismo de modelagem semelhante ao módulo ejs em node.js, mas mais poderoso e simples de usar.
#### Ele garante modelagem mínima e é um mecanismo sem lógica que mantém a visualização e o código separados. Pode ser usado com express como o módulo hbs, disponível através do npm. HandleBars podem ser usados ​​para renderizar páginas da web para o lado do cliente a partir de dados no lado do servidor.
________________________________________________________________________________________________



## npm install --save body-parser
#### o bodyParser serve para trabalhar com os dados vindo do seu cliente. Quando o cliente manda dados via form payload, esse pacote ele formata e transforma os dados para o formato de objeto javascript e joga tudo isso em um objeto dentro do objeto de requisição (req): req. body.
_______________________________________________________________________________________________
## npm install --save mongoose
#### O Mongoose é uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação. Ele possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negócios
_______________________________________________________________________________________________
#### Estou usando o MongoDB 
#### O Mongoose Compass é uma ferramenta interativa para consultar, otimizar e analisar seus dados do MongoDB.
______________________________________________________________________________________________


## npm install --save express-session
#### O middleware express-session armazena os dados da sessão no servidor; ele salva apenas o ID da sessão no cookie, não os dados da sessão. Por padrão, ele usa armazenamento em memória e não é projetado para um ambiente de produção.
_______________________________________________________________________________________________

## npm install --save connect-flash
#### O flash é uma área especial da sessão usada para armazenar mensagens. As mensagens são gravadas no flash e apagadas após serem exibidas ao usuário.
#### O flash é normalmente usado em combinação com redirecionamentos, garantindo que a mensagem esteja disponível para a próxima página a ser renderizada.
_______________________________________________________________________________________________

## npm install --save bcryptjs
#### Ao enviar um formulário, existem alguns dados confidenciais (como senhas) que não devem ser visíveis para ninguém, nem mesmo para o administrador do banco de dados. Para evitar que os dados confidenciais fiquem visíveis para qualquer pessoa, o Node.js usa “bcryptjs”.
### Este módulo permite o armazenamento de senhas como senhas com hash em vez de texto simples.
______________________________________________________________________________________________
## npm install --save passport
#### O Passport é um middleware de autenticação para Node.js. Extremamente flexível e modular, o Passport pode ser instalado discretamente em qualquer aplicativo da Web baseado em Express . Um conjunto abrangente de estratégias oferece suporte à autenticação usando nome de usuário e senha , Facebook , Twitter e muito mais.
______________________________________________________________________________________________
## npm install --save passport-local
#### Estratégia de passaporte para autenticação com nome de usuário e senha.

Este módulo permite autenticar usando um nome de usuário e senha em seus aplicativos Node.js. Conectando-se ao Passport, a autenticação local pode ser integrada de maneira fácil e discreta em qualquer aplicativo ou estrutura que suporte middleware estilo Connect , incluindo Express .
__________________________________________________________________________________________

# Para rodar o projeto 
### npm run start


#### Curso de node.js Victor Lima - Guia do Programador
