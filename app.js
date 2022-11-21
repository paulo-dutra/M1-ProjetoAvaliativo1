import Dica, { dicasIniciais } from './Dica.js'

let dicas = []

const categorias = [{
    value: 1,
    name: 'FrontEnd'
}, {
    value: 2,
    name: 'BackEnd'
}, {
    value: 3,
    name: 'FullStack'
}, {
    value: 4,
    name: 'Comportamental/Soft'
}]

const filtroCategorias = [true, ...categorias.map(() => false)] //Corresponde ao status de exibição de cada categoria (true = ativo/visible e false = inativo/hidden) 

//Adiciona as categorias definidas no começo do código ao "select" do formulário

function addCategorias() {
    const select = document.getElementById('categoria')
    const menuCards = document.getElementById('menuDeCards')

    //Cria botão de total de dicas
    const botaoTotal = document.createElement('button')
    botaoTotal.innerHTML = 'Total<br><span class="numeroCard">0</span>'
    botaoTotal.id = "botao_0"
    menuCards.appendChild(botaoTotal)
    botaoTotal.addEventListener('click', filtraCategorias)

    //Cria elementos baseado na quantidade de categorias
    categorias.forEach((categoria) => {
        // Cria opções para o select
        const option = document.createElement('option')
        option.innerText = categoria.name
        option.value = categoria.value
        select.appendChild(option)

        // Cria cards de estatística
        const botao = document.createElement('button')
        botao.innerHTML = `${categoria.name}<br><span class="numeroCard">0</span>`
        botao.id = 'botao_' + categoria.value
        menuCards.append(botao)
        botao.addEventListener('click', filtraCategorias)
    })
    atualizaCards()
}

//Atualiza os contadores dos cards

function atualizaCards() {
    for (let i = 0; i <= categorias.length; i++) {
        const numero = document.querySelector("#botao_" + i + ">span")
        numero.innerText = Dica.quantidadeDeDicas(dicas, i)
    }
}

//Adição de dicas no array

function addDica(evento) {
    evento.preventDefault();
    const id = JSON.stringify((new Date).getTime());
    const atributos = [evento.target.titulo.value,
    evento.target.linguagemSkill.value,
    categorias.find((elemento) => elemento.value === Number(evento.target.categoria.value)).name,
    evento.target.descricao.value,
    evento.target.categoria.value,
        id,
    evento.target.linkYT.value
    ]
    const dica = new Dica(...atributos)
    dicas.push(dica)
    htmlDica(dica, true)
    atualizaCards()
    salvaAlteracoes()
    evento.target.reset()

    alert("Dica cadastrada com sucesso!")
}

//Cria ou edita o HTML da dica, retorna um elemento HTML

function htmlDica(objDica, novaDica) {
    let dica
    if (novaDica) {
        dica = document.createElement('li')
        dica.id = objDica.id
    } else {
        dica = document.getElementById(objDica.id)
    }
    let botaoYT = ''
    if (objDica.linkYT !== '') {
        botaoYT = `<a href=${objDica.linkYT} target="_blank"><button><img src="images/next.png" alt="Youtube link">Youtube</button></a>`
    }
    dica.innerHTML = `<h3>${objDica.titulo}</h3>
    <p><strong>Linguagem/Skill:</strong>  ${objDica.linguagemSkill}</p>
    <p><strong>Categoria:</strong>  ${objDica.categoria}</p>
    <p>${objDica.descricao}</p>
    <div class='botoesDica'>
    <button type="button" id='excluir_${objDica.id}'><img src="images/trash.png" alt="Excluir">Excluir</button>
    <button type="button" id='editar_${objDica.id}'><img src="images/document.png" alt="Editar">Editar</button>
    ${botaoYT}
    </div>`

    if (novaDica) {
        const listaDicas = document.getElementById('dicas')
        listaDicas.appendChild(dica)
    }

    document.getElementById("excluir_" + objDica.id).addEventListener('click', excluirDica)
    document.getElementById("editar_" + objDica.id).addEventListener('click', formEdicaoDica)

    return (dica)
}

//Exclui dica do html e array

function excluirDica(evento) {
    if (!confirm('Deseja realmente excluir essa dica?\nUma vez deletada as informações serão perdidas.')) {
        return
    }
    const idDica = (evento.target.id).split("_")[1]
    const dica = document.getElementById(idDica)
    dica.remove()
    const posDica = dicas.map((elemento) => elemento.id).indexOf(idDica)
    dicas.splice(posDica, 1)
    atualizaCards()
    salvaAlteracoes()

    alert("Dica excluída com sucesso!")
}

//Monta o formulário para edição

function formEdicaoDica(evento) {
    const formulario = document.getElementById('formulario')
    const idDica = (evento.target.id).split("_")[1]
    const posDica = dicas.map((elemento) => elemento.id).indexOf(idDica)
    formulario.className = "dica_" + idDica

    // Insere os dados da dica a ser editada no formulario
    formulario.titulo.value = dicas[posDica].titulo
    formulario.linguagemSkill.value = dicas[posDica].linguagemSkill
    formulario.categoria.value = dicas[posDica].value
    formulario.descricao.value = dicas[posDica].descricao
    formulario.linkYT.value = dicas[posDica].linkYT
    const botaoCancelar = document.getElementById('botaoCancelar')
    botaoCancelar.addEventListener('click', () => cancelarEdicao(formulario))
}

function cancelarEdicao(formulario) {
    formulario.className = "novoItem"
    formulario.reset()
}

function fazEdicao(evento) {
    evento.preventDefault();

    if (!confirm('Uma vez editado, os dados anteriores serão perdidos.\nDeseja realizar a alteração?')) {
        return
    }

    const idDica = (evento.target.className).split("_")[1]
    const posDica = dicas.map((elemento) => elemento.id).indexOf(idDica)
    const dicaEdit = dicas[posDica]

    dicaEdit.titulo = evento.target.titulo.value
    dicaEdit.linguagemSkill = evento.target.linguagemSkill.value
    dicaEdit.categoria = categorias.find((elemento) => elemento.value === Number(evento.target.categoria.value)).name
    dicaEdit.descricao = evento.target.descricao.value
    dicaEdit.value = evento.target.categoria.value
    dicaEdit.linkYT = evento.target.linkYT.value

    htmlDica(dicaEdit, false)
    atualizaCards()
    salvaAlteracoes()

    evento.target.className = "novoItem"
    evento.target.reset()

    alert('Dica alterada com sucesso!')
}

function carregaDicas() {
    const dicasSalvas = localStorage.getItem('dicasSalvas')
    if (dicasSalvas === null) {
        alert("Este é o seu primeiro acesso à aplicação DEVinKnowledge - Portal de Dicas\nSeja muito bem vindo, sugerimos a leitura do arquivo README para entender todas as funcionalidades do sistema!")
        if (confirm("Por ser sua primeira vez na página, gostaria de populá-la com algumas dicas já prontas?\n(Não se preocupe, caso deseje acessar estas dicas depois, basta limpar o seu LocalStorage!)")) {
            dicas = [...dicasIniciais]
            renderizaDicas()
            return
        } else {
            return
        }
    }
    dicas = JSON.parse(dicasSalvas)
    renderizaDicas()
}

function salvaAlteracoes() {
    const dicasSalvas = (JSON.stringify(dicas))
    localStorage.setItem('dicasSalvas', dicasSalvas)
}

function renderizaDicas() {
    dicas.forEach((dica) => htmlDica(dica, true))
    atualizaCards()
}

function ativaTodasDicas() {
    dicas.forEach(dica => {
        const elementoDica = document.getElementById(dica.id)
        elementoDica.classList.remove('inativo')
        const dicaChildren = elementoDica.children

        const htmlTitulo = dicaChildren[0].innerHTML.split('</span>')
        if (htmlTitulo.length !== 1) { //Quer dizer que há um elemento <span>
            dicaChildren[0].innerHTML = htmlTitulo[0].replace('<span class="termoPesquisado">', '') + htmlTitulo[1]
        }

        const htmlDescricao = dicaChildren[3].innerHTML.split('</span>')
        if (htmlDescricao.length !== 1) { //Quer dizer que há um elemento <span>
            dicaChildren[3].innerHTML = htmlDescricao[0].replace('<span class="termoPesquisado">', '') + htmlDescricao[1]
        }
    });
}

function fazPesquisa(termoPesquisado) {
    dicas.forEach(dica => {
        const elementoDica = document.getElementById(dica.id)
        if (dica.titulo.includes(termoPesquisado) || dica.descricao.includes(termoPesquisado)) {
            //Retorna lista com os elementos filhos da Dica (li)
            const dicaChildren = elementoDica.children
            // [h3(título), p, p, p(descrição), div]

            //Cria elemento span em volta do termo pesquisado (título)
            dicaChildren[0].innerHTML = dicaChildren[0].innerHTML.replace(termoPesquisado, '<span class="termoPesquisado">' + termoPesquisado + '</span>')

            //Cria elemento span em volta do termo pesquisado (descrição)
            dicaChildren[3].innerHTML = dicaChildren[3].innerHTML.replace(termoPesquisado, '<span class="termoPesquisado">' + termoPesquisado + '</span>')
        } else {
            elementoDica.classList.add('inativo') //Desativa dicas que não contem o termo pesquisado
        }
    });
}

function filtraCategorias(evento) {
    let idBotao
    if (evento.target.id === '') {
        idBotao = evento.target.parentNode.id //Caso o usuário clique no elemento <span> (id === '')
    } else {
        idBotao = evento.target.id
    }
    const categoria = Number(idBotao.split('_')[1])
    if (categoria != 0) {
        filtroCategorias[0] = false
    }
    filtroCategorias[categoria] = !filtroCategorias[categoria]

    const botoesAtivados = filtroCategorias.reduce((acc, elemento) => {
        if (elemento) {
            acc++
        }
        return acc
    }, 0)

    if (botoesAtivados === filtroCategorias.length - 1 || botoesAtivados === 0) {
        filtroCategorias[0] = true
    }

    if (filtroCategorias[0]) {
        document.getElementById('botao_0').className = 'selecionado'
        for (let i = 1; i < filtroCategorias.length; i++) {
            document.getElementById('botao_' + i).className = ''
            filtroCategorias[i] = false
        }
        dicas.forEach(dica => {
            document.getElementById(dica.id).classList.remove('invisivel')
        })
    } else {
        document.getElementById('botao_0').className = ''
        for (let i = 1; i < filtroCategorias.length; i++) {
            if (filtroCategorias[i]) {
                document.getElementById('botao_' + i).className = 'selecionado'
            } else {
                document.getElementById('botao_' + i).className = ''
            }
        }
        dicas.forEach(dica => {
            if (filtroCategorias[Number(dica.value)]) {
                document.getElementById(dica.id).classList.remove('invisivel')
            } else {
                document.getElementById(dica.id).classList.add('invisivel')
            }
        })
    }


}

window.addEventListener('load', addCategorias)
window.addEventListener('load', carregaDicas)

const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', (evento) => {
    if (formulario.className === 'novoItem') {
        addDica(evento)
    } else {
        fazEdicao(evento)
    }
})

const campoPesquisa = document.getElementById('campoPesquisa')
const botaoPesquisa = document.getElementById('botaoPesquisa')
botaoPesquisa.addEventListener('click', () => {
    ativaTodasDicas()
    fazPesquisa(campoPesquisa.value)
})
const botaoLimpaPesq = document.getElementById('botaoLimpaPesq')
botaoLimpaPesq.addEventListener('click', () => {
    ativaTodasDicas()
    campoPesquisa.value = ''
})

