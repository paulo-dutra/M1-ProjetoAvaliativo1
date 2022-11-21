export default class Dica {
    titulo
    linguagemSkill
    descricao
    linkYT
    categoria
    id
    value //Baseado no valor utilizado no "select/option" do arquivo html 

    constructor(titulo, linguagemSkill, categoria, descricao, value, id, linkYT = '') {
        this.titulo = titulo
        this.linguagemSkill = linguagemSkill
        this.categoria = categoria
        this.descricao = descricao
        this.value = value
        this.id = id
        this.linkYT = linkYT
    }

    static quantidadeDeDicas(arrayDicas, value = 0) {
        if (value === 0) {
            return arrayDicas.length
        }

        let quantidade = 0
        arrayDicas.forEach(dica => {
            if (dica.value === JSON.stringify(value)) {
                quantidade++
            }
        });
        return quantidade
    }
}

const dica1 = new Dica(
    "Importância das Classes",
    "HTML/CSS",
    "FrontEnd",
    "O atributo global class é uma lista das classes de um elemento, separada por espaços. Classes permitem a CSS e Javascript selecionar e acessar elementos específicos através dos seletores de classe ou funções como o método DOM document.getElementsByClassName.",
    "1",
    "1669071041514",
    "https://www.youtube.com/watch?v=wXUhTZpF_HQ&pp=ugMICgJwdBABGAE%3D"
)

const dica2 = new Dica(
    "Flexbox vs Grid",
    "CSS",
    "FrontEnd",
    "A diferença crucial entre flexbox e grid, além do primeiro ser unidimensional e o outro ser bi-dimensional, é que o controle do layout no grid vem do container e no flexbox vem dos elementos. Como disse a Rachel Andrew: \"No geral, se eu tenho elementos que eu só quero que estejam igualmente espaçados ou alinhados independente do tamanho deles, flexbox. Se eu quero criar um layout e colocar coisas nele, isso é Grid.\"",
    "1",
    "1669071252000",
    ""
)

const dica3 = new Dica(
    "Preste atenção à sua linguagem corporal",
    "Comunicação",
    "Comportamental/Soft",
    "Você fala que está aberto à discussão mas seus braços estão cruzados; diz que está escutando mas não tira os olhos do celular. Nossa linguagem não verbal e não escrita revela mais do que imaginamos. Seja o modo como faz contato visual ou como se comporta em uma entrevista por videoconferência, não esqueça que você está constantemente se comunicando, mesmo quando não está falando.",
    "4",
    "1669071363841",
    "https://www.youtube.com/watch?v=JBp1-OyFjh8"
)

const dica4 = new Dica(
    "Passos para se tornar um Dev FullStack",
    "Programação",
    "FullStack",
    "-Comece com o básico.\n-Escolha uma área de especialização.\n-Escolha um formato de aprendizado adequado para você.\n-Prática.\n-Construa uma rede.\n-Construir um portfólio.",
    "3",
    "1669071471234",
    ""
)

const dica5 = new Dica(
    "Como começar a aprender BackEnd",
    "Python, JS, SQL",
    "BackEnd",
    "A melhor maneira de começar o caminho para se tornar um desenvolvedor backend é aprender uma linguagem de programação ou de script. Python, JavaScript, SQL e PHP são todas habilidades que você verá em muitas postagens de trabalho de desenvolvedor backend.",
    "2",
    "1669071534368",
    "https://www.youtube.com/watch?v=Qjk-cSW-jk4"
)

export const dicasIniciais = [dica1, dica2, dica3, dica4, dica5]
