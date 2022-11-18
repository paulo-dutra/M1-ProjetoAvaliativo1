import Dica from './Dica.js'

const dicas = []

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

    categorias.forEach((categoria) => {
        const option = document.createElement('option')
        option.innerText = categoria.name
        option.value = categoria.value
        select.appendChild(option)
    })
}

//Adição e edição de dicas

function addDica(evento) {
    evento.preventDefault();
    const id = JSON.stringify((new Date).getTime());
    const atributos = [evento.target.titulo.value,
    evento.target.linguagemSkill.value,
    categorias.find((elemento) => elemento.value === Number(evento.target.categoria.value)).name,
    evento.target.descricao.value,
    evento.target.categoria.value,
        id
    ]
    // let urlValida = ''
    // if (evento.target.linkYT.value !== '') {
    //     urlValida = validaURL(evento.target.linkYT.value)
    // }
    let urlValida = evento.target.linkYT.value
    const dica = new Dica(...atributos, urlValida)

    dicas.push(dica)
    renderizaDica(dica)
}

function renderizaDica(dica) {
    let botaoYT = ''
    if (dica.linkYT !== '') {
        botaoYT = `<a href=${dica.linkYT}><button>Youtube</button></a>`
    }
    const listaDicas = document.getElementById('dicas')
    const novaDica = document.createElement('li')
    novaDica.innerHTML = `<h3>${dica.titulo}</h3>
    <p><strong>Linguagem/Skill:</strong>  ${dica.linguagemSkill}</p>
    <p><strong>Categoria:</strong>  ${dica.categoria}</p>
    <p>${dica.descricao}</p>
    <div class='botoesDica'>
    <button type="button" id='excluir_${dica.id}'>Excluir</button>
    <button type="button" id='editar_${dica.id}'>Editar</button>
    ${botaoYT}
    </div>`
    
    console.log(dica.id)
    novaDica.classList.add(dica.id)
    listaDicas.appendChild(novaDica)
    document.getElementById("excluir_"+dica.id).addEventListener('click',excluirDica)
    document.getElementById("editar_"+dica.id).addEventListener('click',editarDica)
}

function excluirDica(evento){
    console.log(evento)
}

function editarDica(evento){
    console.log(evento)
}

function fazEdicao(evento) {
    
}

window.addEventListener('load', addCategorias)

const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', (evento) => {
    if (formulario.className === 'novo-item') {
        addDica(evento)
    } else {
        fazEdicao(evento)
    }
})

