let list = [
    {'desc': 'rice',
     'amount': '1',
    value: '5.40'},
    {'desc': 'beer',
     'amount': '5',
    value: '9.40'},
    {'desc': 'beef',
     'amount': '1',
    value: '27.20'},
    {'desc': 'BREAD',
     'amount': '1',
    value: '1.40'},
]

function somaTotal(list) {
    let total = 0;
    for(let key in list) {
        total += list[key].value * list[key].amount
    }    
    document.getElementById('totalValue').innerHTML = formatValue(total)
    
}


function setList(list){
    let table = `
    <thead>
        <tr>
            <td>Descrição</td>
            <td>Unidades</td>
            <td>Valor</td>
            <td>Ação</td>
        </tr>
    </thead>
    <tbody>`

    for(let key in list){
        let desc = list[key].desc.toLowerCase()
        desc = desc.charAt(0).toUpperCase() + desc.slice(1)
               
        table +=`
        <tr>
            <td>${desc}</td>
            <td>${formatAmount(list[key].amount)}</td>
            <td>${formatValue(list[key].value)}</td>
            <td><button class='btn btn-default' onclick='setUpdate(${key})'>Editar</button> / <button class='btn btn-default' onclick='deleteData(${key})'>Deletar</button></td>
        </tr>`        
    }
    table += `</tbody`;
    document.getElementById('listTable').innerHTML = table;
    somaTotal(list)
    saveListStorage(list)
}



function formatValue(value) {
    let str = parseFloat(value).toFixed(2) + ''
    str = str.replace('.',',')
    str = 'R$ ' + str    
    return str
}

function formatAmount(amount){
    return parseInt(amount)
}

function addData() {
    if(!validation()){
        return
    }
    let desc = document.getElementById('desc').value
    let amount = document.getElementById('amount').value
    let value = document.getElementById('value').value

    list.unshift({'desc': desc, 'amount': amount, 'value': value})
    setList(list)
}

function setUpdate(id) {
    let obj = list[id]
    document.getElementById('desc').value = obj.desc
    document.getElementById('amount').value = obj.amount
    document.getElementById('value').value = obj.value
    document.getElementById('btnUpdate').style.display = 'inline-block'
    document.getElementById('btnAdd').style.display = 'none'

    document.getElementById('inputIdUpdate').innerHTML = `<input id='idUpdate' type='hidden' value='${id}'>`
}

function resetForm(){
    document.getElementById('desc').value = ''
    document.getElementById('amount').value = ''
    document.getElementById('value').value = ''
    document.getElementById('btnUpdate').style.display = 'none'
    document.getElementById('btnAdd').style.display = 'inline-block'
    document.getElementById('inputIdUpdate').innerHTML = ''
    document.getElementById('erros').style.display = 'none'
}

function updateData(){
    if(!validation()){
        return
    }
    let id = document.getElementById('idUpdate').value    
    let desc = document.getElementById('desc').value
    let amount = document.getElementById('amount').value
    let value = document.getElementById('value').value

    list[id] = {'desc': desc, 'amount': amount, 'value': value}

    resetForm()
    setList(list)

}

function deleteData(id){
    if(confirm('Quer mesmo deletar este registro?')){
        if(id === list.length - 1){
            list.pop() //Remove o ultimo elemento da lista
        } else if(id === 0) {
            list.shift() //Remove o primeiro elemento da lista
        } else {
            let arrAuxIni = list.slice(0,id)
            let arrAuxEnd = list.slice(id + 1)
            list = arrAuxIni.concat(arrAuxEnd)
        }
    setList(list)
    }
}

function validation(){
    let desc = document.getElementById('desc').value
    let amount = document.getElementById('amount').value
    let value = document.getElementById('value').value
    let erros = ''
    document.getElementById('erros').style.display = 'none'

    if(desc === ''){
        erros += `<p>Descrição nao pode estar vazia</p>`
    }
    if(amount === ''){
        erros += `<p>Quantidade nao pode estar vazia</p>`
    } else if (amount != parseInt(amount)) {
        erros += `<p>Deve ser um valor inteiro</p>`
    }
    if(value === ''){
        erros += `<p>Valor nao pode estar vazia</p>`
    } else if (value != parseFloat(value)){
        erros += `<p>Deve ser um valor inteiro</p>`
    }

    if (erros != ''){
        document.getElementById('erros').style.display = 'block'
        document.getElementById('erros').innerHTML = '<h3>Error: </h3>' + erros
        return 0
    } else {
        return 1
    }
}

function deleteList(){
     if(confirm('Deletar esta lista ?')){
         list = []
         setList(list)
     }
}

function saveListStorage(list){
    let jsonStr = JSON.stringify(list)
    localStorage.setItem('lista', jsonStr)
}

function iniListStorage(){
    let testeList = localStorage.getItem('lista')
    if(testeList){
        list = JSON.parse(testeList)
    }
    setList(list)
}

iniListStorage()
