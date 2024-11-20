# Sistema-Bancario

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/JuanDaMata/Sistema-Bancario?color=%2304D361">
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/JuanDaMata/Sistema-Bancario">

  <a href="https://github.com/JuanDaMata/Sistema-Bancario/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/JuanDaMata/Sistema-Bancario">
  </a>

   <a href="https://github.com/JuanDaMata">
    <img alt="Feito por Juan Da Mata" src="https://img.shields.io/badge/feito-por%20Juan%20Da Mata-D818A5">
   </a>

   <a href="https://github.com/JuanDaMata/Sistema-Bancario/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JuanDaMata/Sistema-Bancario?style=social">
  </a>


<h4 align="center"> 
	🚧 Sistema-Bancario 🚧
</h4>

<p align="center">
	<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-contribuidores">Contribuidores</a> • 
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

📃 Sistema-Bancario - Foi desenvolvido com o intuito de simular um Banco Digital.


Projeto desenvolvido durante o curso de **Desenvolvimento de Software Foco em Backend - iFood No Desafio Backend da Unidade 2** | Oferecida pela [Cubos Academy](https://cubos.academy/).

A Cubos Academy é uma escola com cursos de tecnologia para todos os perfis, do iniciante ao avançado.

---

## ⚙️ Funcionalidades

- [x] 1º Criar conta bancária:
  - 📌 A requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    - nome
    - cpf
    - data_nascimento
    - telefone
    - email
    - senha

- [x] 2º Listar contas bancárias:
  - 📌 A requisição deverá ser um query params (respeitando este nome):
    - senha_banco

  - Exemplo: GET /contas?senha_banco=Cubos123Bank

- [x] 3º Atualizar os dados do usuário da conta bancária:
  - 📌 A requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    - nome
    - cpf
    - data_nascimento
    - telefone
    - email
    - senha

- [x] 4º Excluir uma conta bancária:
  - 📌 A Requisição deverá ser:
    - O numero da conta bancária (passado como parâmetro na rota)

  - Exemplo: DELETE /contas/:numeroConta

- [x] 5º Depósitar em uma conta bancária:
  - 📌 A requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    - numero_conta
    - valor

- [x] 6º Sacar de uma conta bancária:
  - 📌 A requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    - numero_conta
    - valor
    - senha

- [x] 7º Transferir valores entre contas bancárias:
  - 📌 A requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    - numero_conta_origem
    - numero_conta_destino
    - valor
    - senha

- [x] 8º Consultar saldo da conta bancária:
  - 📌 A requisição deverá ser um query params (respeitando estes nomes):
    - numero_conta
    - senha

   - Exemplo: GET /contas/saldo?numero_conta=123&senha=123


- [x] 9º Emitir extrato bancário:
  - 📌 A requisição deverá ser um query params (respeitando estes nomes):
    - numero_conta
    - senha
      
  - Exemplo: GET /contas/extrato?numero_conta=123&senha=123




