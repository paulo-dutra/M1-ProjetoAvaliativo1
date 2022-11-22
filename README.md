# M1-ProjetoAvaliativo1 - DEVinKnowledge

Este é o primeiro projeto avaliativo do curso DEVinHouse-Philips, desenvolvido na semana 7 do módulo 1 (FrontEnd) 

## Linguagens Utilizadas

HTML / CSS / JavaScript

## Informações Básicas

O projeto DEVinKnowledge foi criado com o objetivo de ser uma página web onde usuários são capazes de criar, visualizar, editar e excluir (CRUD) dicas relacionadas à programação ou soft skills.
As dicas criadas são apresentadas diretamente ao usuário em um formato de lista e posteriormente são salvas no localstorage do browser do usuário, permitindo que as informações não se percam caso a página seja recarregada ou fechada.

### Pré-requisitos e execução do sistema

Para executar esta aplicação é recomendado realizar o clone do repositório do projeto, abrí-lo com o VScode e utilizar a extensão "liveserver" para executá-lo no navegador.

## Funcionalidades

#### Requisitos do projeto:

1.	Um título na aba do navegador.

2.	Um cabeçalho dentro da página.

3.	Um formulário para que o usuário cadastre a dica, contendo:
        -Título; Linguagem/Skill; Categoria; Descrição; Vídeo do Youtube; Botões de Ação;

4.	Cards indicativos que mostram ao usuário as estatísticas do sistema (Quantidade de dicas de cada categoria).

5.	Uma barra de busca para que o usuário consiga pesquisar por uma dica através de seu título.

6.	Uma lista de dicas contendo todas as informações cadastradas.
do card (Botões para excluir, editar e acessar vídeo).

7.	Utilização do alert ou modal customizado para informar as ações realizadas.

8.	Mensagens de confirmação, via prompt ou modal customizado para as ações realizadas. 

9.	Lógica de programação para manipulação dos dados inseridos em um array json com salvamento em localStorage ou em um servidor utilizando json-server.

#### Funcionalidades extras:

Alteração na cor do formulário caso seja selecionada a opção "editar" de alguma dica.

![Formulario de cadastro](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/formcadastro.png)![Formulario de edicao](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/formedicao.png)

Adição de movimento nos botões das dicas e da barra de pesquisa quando o usuário passar o cursos sobre eles.

![Botao dinamico](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/imagesREADME/movimbotao.png)

Pesquisa de termos no título e na descrição das dicas.

Quando realizada uma pesquisa, caso o termo pesquisado seja encontrado, este será grifado de amarelo para facilitar a visualização do usuário.

![Exemplo de pesquisa](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/imagesREADME/pesquisa.png)

Os cards de estatística funcionam também como filtros de categoria: caso o usuário clique sobre algum deles serão exibidas somente as dicas daquela categoria. 

![Filtro de categoria](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/imagesREADME/filtrocard.png)

Obs: É possível selecionar mais de uma categoria para ser exibida ao mesmo tempo. A mudança de cor do card mostra qual categoria esta sendo filtrada.

Obs.2: Clicar no card "Total" fará um reset dos filtros. Caso o usuário tente ativar todas as categorias individualmente, o card "Total" será ativado no lugar.

![Filtros simultaneos](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/imagesREADME/filtrosimultaneo.png) ![Exibicao de todas categorias](https://github.com/paulo-dutra/M1-ProjetoAvaliativo1/blob/main/imagesREADME/total.png)

Caso seja o primeiro acesso do usuário ao sistema ou o localstorage esteja vazio, será oferecida a opção de popular a página com dicas pré-cadastradas.

## Melhorias e implementações futuras

    - Melhorar o mecanismo de pesquisa (atualmente case sensitive e não consegue encontrar termos semelhantes que não contenhamtodas as letras na ordem inserida).
    - Utilizar algum método de conversão dos valores do formulário para string (atualmente inseridos diretamente no HTML do elemento, sensível a qualquer input com semântica HTML, "<br>" por exemplo).
    - Impedir que o usuário exclua a dica enquanto esta está sendo editada (ou resetar o formulário), pois é gerado um erro de elemento não encontrado.
    - Implementar verificação da URL para garantir que seja do Youtube, atualmente é somente realizada a verificação de URL padrão do form.

## Autores

  - **Paulo Dutra** 
    (https://github.com/paulo-dutra)

## Acknowledgments

-  [Favicon and logo](https://icons8.com.br/icons/set/favicon)

-  [Button icons](https://www.flaticon.com/)

- Billie Thompson - *Provided README Template* -
    [PurpleBooth](https://github.com/PurpleBooth)