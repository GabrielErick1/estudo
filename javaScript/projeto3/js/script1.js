function contagem() {
    let ini = document.getElementById('fn1')
    let res = document.querySelector('#tabu')
    if (ini.value.length == 0) {
        alert(`ERRO: por favor digite um numero`)

    } else {
        let n = Number(ini.value)
        let c = 1
        res.innerHTML = ''
        while(c <= 10) {
            let item = document.createElement('option')
            item.text = `${n} x ${c} = ${n*c}`
            item.value = `tab${c}`
            res.appendChild(item)
            c++
        }
    }
  

}


