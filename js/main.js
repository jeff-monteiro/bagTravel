const form = document.getElementById("novoItem")
const list = document.getElementById("lista")
const items = JSON.parse(localStorage.getItem('items')) || []

items.forEach( (element) => {
    createElement(element)
})

formEvent = () =>{
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const nome = event.target.elements["nome"]
        const quantidade = event.target.elements["quantidade"]

        const itemAtual =  {
            nome: nome.value,
            quantidade: quantidade.value
        }

        const exist = items.find(element => element.nome === nome.value)
        console.log(exist)
        if(exist){
            itemAtual.id = exist.id
            
            updateElement(itemAtual)

            items[items.findIndex(element => element.id === exist.id)] = itemAtual
        }else{
            itemAtual.id = items[items.length -1] ? (items[items.length -1]).id +1 : 0

            createElement(itemAtual)
    
            items.push(itemAtual)
        }

        localStorage.setItem("items", JSON.stringify(items))

        nome.value = ""
        quantidade.value = ""

    })
}
formEvent()
function createElement(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const itemNumber = document.createElement("strong")
    itemNumber.innerHTML = item.quantidade
    itemNumber.dataset.id = item.id
    novoItem.appendChild(itemNumber)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(deleteButton(item.id))

    list.appendChild(novoItem)
}

function updateElement(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function deleteButton(id){
    const elementButton = document.createElement("button")
    elementButton.innerText = "X"

    elementButton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return elementButton
}

function deleteElement(tag, id){
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), 1)

    localStorage.setItem("items", JSON.stringify(items))
}
