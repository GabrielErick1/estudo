function verificar() {
    let data = new Date()
    let ano = data.getFullYear()
    let fano = document.getElementById('solo')
    let res = document.querySelector('div#resou')
    if (fano.value.length == 0 || Number(fano.value) > ano) {
        window.alert('{ERRO} verifique os dados e tente novamente!')
    }
    else {
        let fsex = document.getElementsByName('radsex')
        let idade = ano - Number(fano.value)
        let genero = ``
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            genero = `Homem`
            if (idade >= 0 && idade < 11) {
                //crianca
                img.setAttribute('src', 'imagen/foto-bebe-m.png')
            } 
            else if (idade < 21) {
                img.setAttribute('src', 'imagen/h-adolecente.gif')
            }
            else if  (idade < 35) {
                img.setAttribute('src', 'imagen/h-jovem.gif')
            }

            else if  (idade < 50) {
                img.setAttribute('src', 'imagen/h-senhor1.gif')
            }
      
            else {
                img.setAttribute('src', 'imagen/h-senhor2.gif')
            }

        }  else if (fsex[1].checked) {
            genero = `Mulher`
            if (idade >= 0 && idade < 11) {
                //crianca
                img.setAttribute('src', 'imagen/foto-bebe-f.png')
            } 
            else if (idade < 21) {
                img.setAttribute('src', 'imagen/m-adolecente.gif')
            }
            else if  (idade < 35) {
                img.setAttribute('src', 'imagen/m-jovem.gif')
            }

            else if  (idade < 50) {
                img.setAttribute('src', 'imagen/m-senhora1.gif')
            }
      
            else {
                img.setAttribute('src', 'imagen/m-senhora2.gif')
            }

    // para testa res.innerHTML = `idade caulculada: ${idade}`
}

res.innerHTML = `Detectamos. ${genero} com ${idade} anos!`
res.appendChild(img)
    }
}