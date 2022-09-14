function carregar() {
var msg = window.document.getElementById('msg')
var img = window.document.getElementById('imagen')
var data = new Date()
var hora = data.getHours()
//var hora = 8 //mude o horario e veja oque acontece
msg.innerHTML = `<strong>agora sao exatamente ${hora} horas.</strong>`

if (hora >= 5 && hora < 12) {
    // Bom Dia
    img.src = 'manhan.jpg'
    document.body.style.background = '#ffffff'
} 
else if (hora >= 12 && hora < 18) {
    //Boa tarde
    img.src = 'tarde.jpg'
    document.body.style.background = '#d6d675'
}

else {
    //Boa Noite
    img.src = 'noite.jpg'
    document.body.style.background = '#0000ffef'
}

if (hora >= 00 && hora < 5) {
    //Boa tarde
    img.src = 'madrugada.jpg'
    document.body.style.background = '#000000e1'
}


}