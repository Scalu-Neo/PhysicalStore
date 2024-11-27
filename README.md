# PhysicalStore
CompassUol Backend - Desenvolvendo uma Physical Store

## Descrição do Projeto

A finalidade do projeto consiste na criação de um sistema que gerencia lojas físicas de uma loja eCommerce. A aplicação permite que o usuário encontre as lojas mais próximas a um CEP fornecido, consumindo APIs externas para obter as informações de endereço das lojas.

## Requisitos do Sistema | Principais Tecnologias utilizadas

- **NodeJs**: Para o servidor backend.
- **ExpressJs**: Framework web para construir a API RESTful.
- **MongoDb**: Banco de dados NoSQL para armazenar as informações.
- **TypeScript**: Linguagem utilizada para construir a aplicação.
- **Mongoose**: Biblioteca para modelar dados MongoDB e interagir com o banco de dados.
- **Swagger**: Para construir a documentação da API.
  
## Regras da Aplicação

A aplicação segue as seguintes regras de funcionamento:

### Funcionalidade

1. **Cadastro das Lojas**:
   - A aplicação utilizará a API do [ViaCEP](https://viacep.com.br/) para buscar informações de endereço das lojas.
   - Você poderá criar quantas lojas forem necessárias, utilizando a API do ViaCEP para trazer os dados de rua, número, bairro, cidade e estado.
   
2. **Busca de Lojas Próximas**:
   - O usuário poderá buscar as lojas físicas presentes em um raio de **100km** a partir do CEP informado.
   - As lojas deverão ser listadas com a **prioridade para a loja mais próxima** do CEP informado.
   - Caso não haja nenhuma loja dentro do raio de 100km, a aplicação deverá exibir uma mensagem informativa ao usuário.

3. **Informações da Loja**:
   - A aplicação deverá retornar as informações da loja de forma organizada, contendo:
     - Nome da Loja
     - Rua
     - Número
     - Bairro
     - Cidade
     - Estado

4. **Interface da Aplicação**:
   - Não será necessário criar um front-end para esse projeto.

5. **Logs**:
   - O sistema deverá implementar a geração de logs utilizando o [Winston](https://www.npmjs.com/package/winston).
   - Os logs devem ser armazenados em formato **JSON**, contendo informações sobre o processo de busca e erros.

## Instruções de Execução

### Instalar Dependências

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/Scalu-Neo/CineFilm.git

2. Navegue até o diretório do projeto e instale as dependências com o seguinte comando:

    ```bash
    npm install
    ```

### Rodar a Aplicação

3. Após a instalação das dependências, execute o seguinte comando para iniciar a aplicação:

    ```bash
    npm run dev
    ```

3. O sistema rodará no terminal, permitindo que o usuário insira o **CEP** e veja a lista de lojas mais próximas.

### Gerar Logs

- Os logs gerados pela aplicação estarão disponíveis no formato JSON, de acordo com as configurações do [Winston](https://www.npmjs.com/package/winston).


## Acessando a API: 

É possível acessar os recursos da API segundo o endereço abaixo de acordo com sua documentação no Swagger:


  ```bash
    http://localhost:5000/api-docs
