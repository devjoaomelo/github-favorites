// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

    }
    load(){
        this.entries = [
            {
                login: 'devjoaomelo',
                name: "João Melo",
                public_repos: '50',
                followers: '120000'
            },
            {
                login: 'diego3g',
                name: "Diego Fernandes",
                public_repos: '30',
                followers: '1000'
            }
        ]
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}


// classe que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.tbody = this.root.querySelector('table tbody')
        this.update()
    }

    update(){
        this.removeAllTr()
        this.entries.forEach( user => {
            const row = this.createRow()
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            row.querySelector('.remove').onclick = () => {
                const confirmed = confirm('Tem certeza que deseja deletar essa linha?')
                if(confirmed){
                    this.delete(user)
                }
            }

            this.tbody.append(row)

    })

    }
    createRow(){
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td class="user">
                <img src="https://github.com/devjoaomelo.png" alt="imagem de João Melo">
                <a href="https://github.com/devjoaomelo" target="_blank">
                    <p>João Melo</p>
                    <span>devjoaomelo</span>
                </a>
            </td>
            <td class="repositories">
                4
            </td>
            <td class="followers">
                4
            </td>
            <td>
                <button class="remove">&times;</button>
            </td>
        
        `
        return tr
    }

    removeAllTr(){
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}