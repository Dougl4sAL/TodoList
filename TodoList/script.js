// Seleção de elementos
let todoForm = document.getElementById('todo-form')
let todoInput = document.getElementById('todo-input')
let editForm = document.getElementById('edit-form')
let editInput = document.getElementById('edit-input')
let cancelarBtn = document.getElementById('cancelar-button')
let todoList = document.getElementById('todo-list')
// Barra de pesquisa
let pesquisarInput = document.getElementById('pesquisar-input')
let limparBtn = document.getElementById('limpar-button')
// O filtro das terefas
const selectFiltro = document.getElementById('select-filtro')

// Vai ser usado para armazenar o titulo original e
// ser usado para comparação para poder alterar
let antigoInputValue

// ============== Funções ==============

//Cria nova tarefa, h3 e os botoes
let saveTodo = (text) => {

    // Cria todo o Todo dentro do html depois passa pra ca
    // como botoes, div e icones dos botoes, assim fica mais  facil dever o q precisa
    let todo = document.createElement('div')
    todo.classList.add('todo')

    let todoTitulo = document.createElement('h3')
    todoTitulo.innerText = text
    todo.appendChild(todoTitulo)

    let feitobtn = document.createElement('button')
    feitobtn.classList.add('feito-todo')
    feitobtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(feitobtn)

    let editarbtn = document.createElement('button')
    editarbtn.classList.add('editar-todo')
    editarbtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editarbtn)

    let removerbtn = document.createElement('button')
    removerbtn.classList.add('remover-todo')
    removerbtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removerbtn)

    todoList.appendChild(todo)

    todoInput.value = ''
    // .focus() faz ficar pronto pra digitar novamente
    todoInput.focus()
}

// esconde ou exibe os itens
let esconderForm = () => {
    // .toggle() add ESCONDER quem nao tem e tira nos q ja tem
    // esconde o adicionar tarefa
    todoForm.classList.toggle('esconder')
    // Exibe o esconde o editar tarefa
    editForm.classList.toggle('esconder')
    // esconde todas as tarefas
    todoList.classList.toggle('esconder')
}

//Atualiza o nome da tarefa mudando o nome
let atualizaTodo = (text) => {

    let todos = document.querySelectorAll('.todo')

    // .forEac((parametro)) vai passar por todos os itens da lista do todo
    todos.forEach((todo) => {
        let todoTitulo = todo.querySelector('h3')

        if (todoTitulo.innerText === antigoInputValue) {
            todoTitulo.innerText = text
        }
    })

}

// ============== Eventos ==============

// por esta dentro de um formulario, ao enviar nao precisa selecionar o btn, ele faz o envio automaticamente

// Adicone uma tarefana lista
todoForm.addEventListener('submit', (e) => {
    // preventDeFault() para ao enviar ao backend e sim ao front. Assim não precisa att a pagina
    e.preventDefault()
    // pegando o q esta escrito no input
    let inputValue = todoInput.value
    if (inputValue) {
        saveTodo(inputValue)
    }

    // Quando o filtro estiver em "Feitos" e add uma nova tarefa, tarefa ficava visivel
    // Chmando a função aqui isso nao ocorrera
    filtar()
})

// Saber qual dos boteos clicou e acionar um evento
document.addEventListener('click', (e) => {
    let clicouEle = e.target
    // pegaa div mais proxima desse elemento, no caso a div todo
    let parentEle = clicouEle.closest('div')

    let todoTitulo

    if (parentEle && parentEle.querySelector('h3')) {
        // pega o titulo e coloca em uma varivael
        todoTitulo = parentEle.querySelector('h3').innerText
    }

    // class="feito" esta escrito no CSS adicionando o background-color e o corte no titulo
    //botao de tarefa concluida
    if (clicouEle.classList.contains('feito-todo')) {
        // .toggle() se nao tiver a classe ele coloca e se tiver a classe ele retira
        // o .add() ele so coloca,
        parentEle.classList.toggle('feito')
    }

    //botao de apagar tarefa
    if (clicouEle.classList.contains('remover-todo')) {
        // remove o elemento pai, no caso a div, apagando tudo
        parentEle.remove()
    }

    //botao de editar tarefa
    if (clicouEle.classList.contains('editar-todo')) {
        esconderForm()

        // pega caixa de texto da edição e coloca o titulo 
        editInput.value = todoTitulo
        antigoInputValue = todoTitulo
    }

    // função filtar é chamada para att quando a pessoa desmarca de concuida a tarefa
    //evitando q quando o filtro em "Feitos" continue mostrando a tarefa desmarcada
    filtar()
})

//botao de cancelar edição
cancelarBtn.addEventListener('click', (e) => {
    // faz a ação mas a pagina nao atualiza
    e.preventDefault()

    esconderForm()
})

// Botao de confirmar a alteração do nome da tarefa
editForm.addEventListener('submit', (e) => {

    e.preventDefault()

    // pega o q esta escrito no input e coloca em uma variavel
    let editInputValue = editInput.value

    if (editInputValue) {
        atualizaTodo(editInputValue)
    }

    esconderForm()
})

// =================== Barra de pesquisa ===================
pesquisarInput.addEventListener('input', pesquisarh3)

function pesquisarh3() {
    // Obtém o valor da barra de pesquisa
    let pesquisarInputvalue = this.value.toLowerCase().trim()
    // seleciona aqui dentro pq precisa pegar todos os todo depois q aciona o evento

    let todos = todoList.querySelectorAll('.todo')

    // Para cada item dentro da div com a classe "todo"
    todos.forEach(function (todo) {
        // Obtém o valor do item
        let todoValue = todo.querySelector('h3').textContent.toLowerCase().trim() // .trim() retira os espaços em brancos do comeco e fim

        // Verifica se o valor do item contém o valor da pesquisa
        if (todoValue.indexOf(pesquisarInputvalue) !== -1) {
            // Se o valor da pesquisa for encontrado, mostra o item
            todo.style.display = ''
        } else {
            // Caso contrário, esconde o item
            todo.style.display = 'none'
        }
    });
}

//botam para apagar o texto do input de pesquisar
limparBtn.addEventListener('click', (a) => {

    a.preventDefault()

    let todos = todoList.querySelectorAll('.todo')
    pesquisarInput.value = ''
    //Para todos os .todo da lista todoList vai o display = ''
    todos.forEach((todo) => {
        todo.style.display = ''
    })
})

// ================== Filtro das tarefas ==================

selectFiltro.addEventListener('change', filtar)

function filtar() {

    let todos = todoList.querySelectorAll('.todo')

    let selectFiltroValue = selectFiltro.value

    // Todas as terafas
    if (selectFiltroValue === 'all') {
        todos.forEach((todo) => {
            todo.style.display = ''
        })
    }

    // Tarefas ja concluidas
    if (selectFiltroValue === 'done') {

        todos.forEach((todo) => {
            // Para todos os TODO que NÃO'!' tiver a classe feito, ele vai esconder
            if (!todo.classList.contains('feito')) {
                todo.style.display = 'none'
            } else {
                todo.style.display = ''
            }

        })
    }

    // Tarefas a serem feitas
    if (selectFiltroValue === 'todo') {

        todos.forEach((todo) => {
            // Para todos os TODO que tiver a classe feito, ele vai esconder
            if (todo.classList.contains('feito')) {
                todo.style.display = 'none'
            } else {
                todo.style.display = ''
            }

        })
    }
}
