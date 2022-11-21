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

// a = new Dica('lalalala', 'lalalala', 'FrontEnd', 'eeeeeeeeeeee', 2, 1)
// b = new Dica('lalalala', 'lalalala', 'BackEnd', 'eeeeeeeeeeee', 2, 2)
// c = new Dica('lalalala', 'lalalala', 'Comportamental/Soft', 'eeeeeeeeeeee', 2, 3)

//Dica.quantidadeDeDicas([a, b, c], 2)