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

            if (idade >= 0 && idade < 10) {
                //crianca
                img.getAttribute('src' 'h-crianca.gif')
            } 
            
            else if  (idade < 20) {
                img.getAttribute('src', 'h-adolecente.gif')
            }

            else if (idade < 30) {
                img.getAttribute('src', 'h-jovem.gif')
            }
        
          
            else {
                img.getAttribute('src', 'h-senhor2.gif')
            }
       
        }  else if (fsex[1].checked) {
            genero = `Mulher`


        }
        res.innerHTML = `Detectamos. ${genero} com ${idade} anos!`
        res.appendChild(img)
       
       
    }


    // para testa res.innerHTML = `idade caulculada: ${idade}`
}