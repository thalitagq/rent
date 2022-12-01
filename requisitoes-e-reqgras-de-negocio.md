# Cadastro de carro

**Requisitos Funcionais**

* Deve ser possível cadastrar um novo carro.
* Deve ser possível listar todas as categorias.

**Regras de Negócio**

* Não deve ser possível cadastrar um carro com uma placa já existente.
* Não deve ser possível alterar a placa de um carro já cadastrado.
* O carro deve ser cadastrado co, disponibilidade por padrão.
* O usuário responsável pelo cadastrado deve ser um usuário administrador.

# Listagem de carros

**Requisitos Funcionais**

* Deve ser possível listar todos os carros disponíveis.
* Deve ser possível listar todos os carros disponíveis pela categoria.
* Deve ser possível listar todos os carros disponíveis pelo nome da marca.
* Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócio**

* O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**Requisitos Funcionais**

* Deve ser possível cadastrar uma especificação para um carro.
* Deve ser possível listar todas as especificações.
* Deve ser possível listar todos os carros.

**Regras de Negócio**

* Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* O usuário responsável pelo cadastrado deve ser um usuário administrador.

# Cadastro de images do carro

**Requisitos Funcionais**

* Deve ser possível cadastrar a imagem do carro.
* Deve ser possível listar todos os carros.

**Requisitos não funcionais**

* Utilizar o multer para o upload dos arquivos.

**Regras de Negócio**

* O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
* O usuário responsável pelo cadastrado deve ser um usuário administrador.

# Aluguel

**Requisitos Funcionais**

* Deve ser possível cadastrar um aluguel.
* Deve ser possível listar todos os carros.

**Regras de Negócio**

* O aluguel deve ter duração mínima de 24 horas.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
