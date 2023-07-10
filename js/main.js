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

        const exist = items.find(element => element.nome === nome.value)
        if(exist){
            itemAtual.id = exist.id
            
            updateElement(itemAtual)

            items[exist.id] = itemAtual
        }else{
            itemAtual.id = items.length

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

    list.appendChild(novoItem)
}

function updateElement(item){
    //console.log(document.querySelector("[data-id='"+item.id+"']"))
}
