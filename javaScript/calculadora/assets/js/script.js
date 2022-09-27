const res = document.getElementById('res')

function clicar(n1, n2){
    // parsefloat e para transfeirir algo em numeros
n1 = parseFloat(document.getElementById('dgt1').value)
n2 = parseFloat(document.getElementById('dgt2').value)
       
        selector = document.getElementById('selector').value

        switch(selector) {

            case "+":
                calculo = (n1 + n2)
                res.innerHTML = ` o resultado de ${n1} + ${n2} = ${calculo} `;
                break;
                case "-":
                    calculo = (n1 - n2)
                    res.innerHTML = `o resultado de ${n1} - ${n2} = ${calculo}`;
                    break;
                    
                case "*":
                    calculo = (n1 * n2)
                    res.innerHTML = `o resultado de ${n1} x ${n2} = ${calculo}`;
                    break;
    
                case "/":
                    calculo = (n1 / n2)
                    res.innerHTML = `o resultado de ${n1} / ${n2} = ${calculo}`;
                    break;
                default:
          
        }
}