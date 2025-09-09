# Projeto - DrivenPass

## 📑 Descrição

- Navegar na internet pode ser uma atividade muito divertida, mas ao mesmo tempo, muito perigosa. Inúmeros estudos e levantamentos (nacionais e internacionais) mostram que o número de golpes virtuais não para de crescer. O que levanta a questão: como nos proteger?
- Existem várias formas diferentes de se proteger. Tudo começa com o uso de senhas diferentes e seguras. Para uma senha ser segura, ela deve conter vários caracteres e números misturados, sem contar que o quanto mais longa ela for, melhor.
- Só que como vamos memorizar senhas gigantes e sem significado semântico?!
- É para resolver essa dor que os gerenciadores de senhas surgiram! Com eles, criamos apenas uma senha principal de acesso à nossa conta (que devemos memorizar) e todas as outras senhas ficam gravadas em segredo! Logo, quando precisamos dela, basta lembrar da senha principal!
- Neste projeto, você ficará responsável por desenvolver a DrivenPass, um gerenciador de senhas!

## ✅ Requisitos

- Geral
    - [ ]  O projeto deve ser codificado em **TypeScript**.
    - [ ]  O projeto deve usar o **Prisma** como solução de ORM.
    - [ ]  Será necessário fazer o deploy do projeto back-end e banco de dados na nuvem ☁️.
        - [ ]  Utilize as plataformas como o [**Render**](https://render.com/) para isso.
        - [ ]  Insira o link do seu deploy dentro do arquivo `README.md`.
    - [ ]  Versionamento usando Git é obrigatório, crie um repositório público no seu perfil do GitHub e faça commits a cada funcionalidade implementada.
        - [ ]  Não esqueça de criar o `.gitignore:` a `node_modules` e o `.env` não devem ser commitados.
        - [ ]  Seu projeto deve ter, obrigatoriamente, os arquivos `package.json` e `package-lock.json`, que devem estar na raiz do projeto. Eles devem conter todas as dependências do projeto.
    - [ ]  Utilize o dotenv (`.env`) para administrar as variáveis de ambiente.
    - [ ]  A API deverá seguir a arquitetura em camadas (layered architecture), ou seja, usando routers, controllers services e repositories.
    - [ ]  Versionamento usando Git é obrigatório.
    - [ ]  Faça commits a cada funcionalidade implementada.
- Banco de dados e Modelagem
    - [ ]  A modelagem do banco de dados desta aplicação ficará ao seu critério.
    - [ ]  Leia os requisitos das rotas e elabore o schema de acordo com o que foi solicitado e o que você acredita ser necessário para a aplicação.
        - Não se esqueça de aplicar as boas práticas de modelagem!
    - [ ]  Utilize o banco de dados relacional `PostgreSQL 🐘`.
    - [ ]  O banco de dados deve ser gerenciado exclusivamente via Prisma (conexão e queries).
    - [ ]  Você **não deve** criar o SQL das tabelas manualmente, utilize as migrations do Prisma.
    - [ ]  Alguns modelos terão dados relacionados. Para usar tabelas/modelos que envolvem relacionamentos, procure por [**Relations no Prisma**](https://www.prisma.io/docs/concepts/components/prisma-schema/relations).
    - [ ]  Alguns modelos podem exigir a combinação de duas ou mais colunas formem uma **unique**. Para fazer isso, procure pela notação [**@@unique**](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unique-1).
- Validação de erros
    - [ ]  Para fazer a validação dos schemas utilizando o [**joi**](https://joi.dev/api/), crie um único middleware de validação que será chamado nas rotas de **POST** e **PUT** antes do controller para verificar se o corpo da requisição segue o formato solicitado. Retorne sempre o status code `422 (Unprocessable Entity)` junto aos erros de validação.
    - [ ]  Também crie um único middleware para tratamento de erros na aplicação.
    - [ ]  Também crie um único middleware para validar - nas rotas em que fizer sentido - se o token do usuário é válido. Caso não seja, o sistema deve retornar o status code `401 (Unauthorized)`.
    - [ ]  Para as rotas que aceitam parâmetros numéricos, valide se o parâmetro é um número positivo. Caso não seja, retorne o status code `400 (Bad Request)`.
- Autenticação
    - O usuário deve ser capaz de criar uma conta e usá-la para registrar suas operações financeiras.
    - **POST** `/sign-up` (cadastro do usuário)
        - [ ]  O usuário deve ser capaz de criar uma conta com os seguintes dados: nome, e-mail, senha e confirmação da senha.
            
            ```jsx
            {
            	name: string,
            	email: string,
            	password: string
            }
            ```
            
        - [ ]  Todos os campos são obrigatórios. Caso algum dos campos não esteja presente ou esteja em um formato inválido, a requisição deve retornar status code `422 (Unprocessable Entity)`.
            - [ ]  O e-mail deve ter um formato válido.
            - [ ]  A senha deve possuir no mínimo seis caracteres.
        - [ ]  Caso já exista um usuário com este e-mail cadastrado, a resposta deve retornar o status code `409 (Conflict)`.
        - [ ]  Realize a criptografia da senha do usuário para guardá-la no banco de dados. Para isso, utilize a biblioteca [**bcrypt**](https://www.npmjs.com/package/bcrypt).
    - **POST** `/sign-in` (login do usuário)
        - [ ]  O usuário deve ser capaz de logar/entrar com a sua conta com os seguintes dados: e-mail e senha.
            
            ```jsx
            {
            	email: string,
            	password: string
            }
            ```
            
            - [ ]  Todos os campos são obrigatórios. Caso algum dos campos não esteja presente ou esteja em um formato inválido, a requisição deve retornar status code `422 (Unprocessable Entity)`.
                - [ ]  O e-mail deve ter um formato válido.
            - [ ]  Caso o e-mail não esteja cadastrado, a requisição deve retornar status code `404 (Not Found)`.
            - [ ]  Caso a senha enviada não seja correspondente com a que está cadastrada, a requisição deve retornar o status code `401 (Unauthorized)`.
        - [ ]  Em caso de sucesso no login (e-mail e senha corretos), a requisição deve retornar o status code `200 (OK)` e um token JWT no corpo da requisição.
            
            ```jsx
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            ```
            
- Rotas
    - 🔓 Health (`/health`) (**GET**)
        - Rota somente para garantir que a aplicação está em pé.
        - Retorna a mensagem `“I’m OK!”` com o status code `200 (OK)`.
    - 🔒 Credenciais (`/credentials`)
        - Credenciais se referem a informações de login para um site e/ou serviço. Cada usuário pode armazenar inúmeras credenciais (ex: “facebook” ⇒ user: driven, senha: dr1VeNF@ceb00k).
            - Criação de credenciais (**POST**)
                - Para registrar uma nova credencial, o usuário deverá fornecer uma url, um nome de usuário e uma senha. O usuário também precisa informar um título para essa credencial, uma vez que é possível cadastrar duas credenciais para um mesmo site.  Caso nenhum dos dados seja enviado, retorne o status code `422 (Unprocessable Entity)`.
                - Corpo esperado na requisição:
                    
                    ```tsx
                    {
                    	title: string,
                    	url: string,
                    	username: string,
                    	password: string
                    }
                    ```
                    
                - Cada credencial deve possuir um título único, ou seja, se o usuário tentar criar duas credenciais com o mesmo nome, a aplicação deve impedi-lo (o que não impede que outras pessoas usem esse título) e retornar o status code`409 (Conflict`).
                - Por ser um dado sensível, o campo de senha da credencial deve ser criptografado usando um segredo da aplicação. Use a biblioteca [**cryptr**](https://www.npmjs.com/package/cryptr) para isso.
            - Busca de credenciais (**GET**)
                - A aplicação deve fornecer uma forma de obter todas as credenciais ou uma credencial específica (através do seu id). Caso a credencial não seja encontrada, o sistema deve retornar o status code `404 (Not Found)`.
                - Todas as credenciais retornadas devem aparecer com a senha descriptografada (`200 (Ok)`).
            - Atualização de credencial (`/:id`) (**PUT**)
                - A aplicação deve permitir que uma credencial seja atualizada.
                - Os dados e validações seguem o mesmo princípio da criação de credenciais.
                - Ao finalizar com sucesso, retornar o status code `204 (No Content)`.
            - Deleção de credenciais (`/:id`) (**DELETE**)
                - Aplicação deve permitir que uma credencial seja deletada (dado o seu id).
                - Se a credencial não existir, retornar o status code `404 (Not Found)`.
                - Ao finalizar com sucesso, retornar o status code `204 (No Content)`.
    - 🔒 Deletar dados (`/erase`) (**DELETE**)
        - Rota que possibilita com que o usuário possa deletar sua conta.
        - Quando isso acontece, os dados do usuário e suas credenciais salvas são deletados.
    
    *🔒: Recurso necessita autenticação*
    
    *🔓: Recurso não necessita autenticação*
    
- Usuário padrão
    - O banco de dados da aplicação deve ser inicializada com um usuário de demonstração padrão com os seguintes dados:
        
        ```tsx
        {
        	name: "Demo",
        	email: "demo@driven.com.br",
        	password: "demo123"
        }
        ```
        
    - Utilize o recurso de seed do Prisma para fazer isso.
    - Lembrando que a senha precisa estar criptografada!