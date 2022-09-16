function contagem() {
    let ini = document.getElementById('fn1')
    let fim = document.getElementById('fn2')
    let passo = document.getElementById('fn3')
    let res = document.querySelector('div#resou')
    
    if (ini.value.length == 0 || fim.value.length == 0  || passo.value.length == 0) {
        alert(`[ERRO] Faltam Dados!`)
    } else {
          res.innerHTML = `contando: <br>` 
          let i = Number(ini.value)
          let f = Number(fim.value)
          let p = Number(passo.value)   
      if (p <= 0)   {
        alert(`Passo inavlido Considerando Passo 1`)
        p = 1
      } 
          
if( i < f) {
    //contagem crescente
    for(let c= i; c <= f; c += p ) {
        res.innerHTML += ` ${c}  \u{1F449} `     

    }
    
} else {
    //contagem regressiva
    for(let c= i; c >= f; c -= p) {
    res.innerHTML += ` ${c} \u{1F449} `
}
}
res.innerHTML += `\u{1F3C1}`
}

}


