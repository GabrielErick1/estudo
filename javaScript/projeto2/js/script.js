function carregar() {
var msg = window.document.getElementById('msg')
var data = new Date()
var hora = data.getHours()
var min = data.getMinutes()

//var hora = 8 //mude o horario e veja oque acontece
msg.innerHTML = `<strong>agora sao exatamente ${hora}:${min}</strong>`


}


