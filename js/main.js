const form = document.getElementById("novoItem")
const list = document.getElementById("lista")
const items = JSON.parse(localStorage.getItem('items')) || []

console.log(items)

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

        createElement(itemAtual)
    
        items.push(itemAtual)
    
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
    novoItem.appendChild(itemNumber)

    novoItem.innerHTML += item.nome

    list.appendChild(novoItem)
}
