import Dica from './Dica.js'

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

//Adiciona as categorias definidas no começo do código ao "select" do formulário

function addCategorias() {
    const select = document.getElementById('categoria')
    const menuCards = document.getElementById('menuDeCards')

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
    // let urlValida = ''
    // if (evento.target.linkYT.value !== '') {
    //     urlValida = validaURL(evento.target.linkYT.value)
    // }
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
    console.log(dica)
    let botaoYT = ''
    if (objDica.linkYT !== '') {
        botaoYT = `<a href=${objDica.linkYT} target="_blank"><button>Youtube</button></a>`
    }
    dica.innerHTML = `<h3>${objDica.titulo}</h3>
    <p><strong>Linguagem/Skill:</strong>  ${objDica.linguagemSkill}</p>
    <p><strong>Categoria:</strong>  ${objDica.categoria}</p>
    <p>${objDica.descricao}</p>
    <div class='botoesDica'>
    <button type="button" id='excluir_${objDica.id}'>Excluir</button>
    <button type="button" id='editar_${objDica.id}'>Editar</button>
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
    if(!confirm('Deseja realmente excluir essa dica?\nUma vez deletada as informações serão perdidas.')){
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

    if(!confirm('Uma vez editado, os dados anteriores serão perdidos.\nDeseja realizar a alteração?')){
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
    console.log(dicasSalvas)
    if (dicasSalvas === null) {
        return
    }
    dicas = JSON.parse(dicasSalvas)
    renderizaDicas()
}

function salvaAlteracoes() {
    const dicasSalvas = (JSON.stringify(dicas))
    localStorage.setItem('dicasSalvas', dicasSalvas)
}

function renderizaDicas(){
    dicas.forEach((dica) => htmlDica(dica, true))
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
