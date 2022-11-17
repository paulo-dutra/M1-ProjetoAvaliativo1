import Dica from './Dica.js'

const dicas = []

const categorias =[{
    value: 1,
    name: 'FrontEnd'
},{
    value: 2,
    name: 'BackEnd'
},{
    value: 3,
    name: 'FullStack'
},{
    value: 4,
    name: 'Comportamental/Soft'
}]

//Adiciona as categorias definidas no começo do código ao "select" do formulário

function addCategorias(){
    const select = document.getElementById('categoria')

    categorias.forEach((categoria) => {
        const option = document.createElement('option')
        option.innerText = categoria.name
        option.value = categoria.value
        select.appendChild(option)
    })
}

//Adição e edição de dicas

function addDica(evento){
    evento.preventDefault();
    const id = (new Date).getTime();
    const atributos = [evento.target.titulo.value, 
        evento.target.linguagemSkill.value,
        evento.target.categoria.value, 
        evento.target.descricao.value, 
        id
    ] 

    let urlValida = '' 
    if (evento.target.linkYT.value !== ''){
        urlValida = validaURL(evento.target.linkYT.value)
    }
    const dica = new Dica(...atributos,urlValida)
    
    dicas.push(dica)
    renderizaDica(dica) 
}

window.addEventListener('load', addCategorias)

const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', (evento) => {
    if (formulario.className === 'novo-item'){
        addDica(evento)
    }else if (formulario.className === 'editar-item'){
        editDica(evento)
    }
})

