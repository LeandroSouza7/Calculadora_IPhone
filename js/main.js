(function(){
    let $simbo = document.querySelector('.simbolos');
    let $input = document.querySelector('.input');
    let $inputCalc = document.querySelector('.input-calc');

    let arr = [];
    let trueOrFalse = false;
    let negativeOrPositive = false;
    let posCalculoTouF = false;


    $input.value = 0;

    function calculo(operacao, n){
        if(n === undefined){
            arr.push(operacao);
            return;
        }
        arr.push(operacao, n);
    }

    function posCalculo(){
        arr = [];
        posCalculoTouF = true;
    }

    function configNumeros(numero){
        numero = parseFloat(numero);
        return numero.toLocaleString('pt-BR');
    }

    let VouF = undefined;


    function configButton(operacao, btnClicado){
                    if(VouF == undefined){
                        trueOrFalse = true;
                        let btns = document.querySelectorAll('button');
                        x = 0;


                        while(x < btns.length){
                            if(btns[x].getAttribute('value')){
                                btns[x].removeAttribute('value', 'true');
                            }
                            
                            x++;
                        }


                        document.querySelector('#' + operacao).setAttribute('value', 'true');  

                        VouF = btnClicado;
                    }else{
                        btnClicado.setAttribute('value', 'true');
                        VouF.removeAttribute('value', 'true');
                        VouF = undefined;
                        trueOrFalse = false;
                    }

                    
    }



    $simbo.addEventListener('click', function(e){
        let $numero = e.target;

        function clean(){
            $inputCalc.value = "";
            $input.value = "";
            $input.value = 0;
        }


        if($numero.getAttribute('class') == 'element'){

            if(posCalculoTouF == true){
                posCalculoTouF = false;
                $input.value = 0;
                $inputCalc.value = 0;
            }

            $numero = $numero.textContent;
            $inputCalc.value += $numero;


            let numerosInputCalc = configNumeros($inputCalc.value);
            $input.value = numerosInputCalc;  


            if(trueOrFalse){
                clean();
                $input.value = $numero;
                $inputCalc.value += $numero;
                trueOrFalse = false;
            }
            
            return;
        }

        if($numero.getAttribute('class') == 'limpar'){
            clean();
            return;
        }

        if($numero.getAttribute('class') == 'calc'){

            $numero = $numero.textContent;
            
            switch($numero){
                case "+":
                    let SinputNumero = $inputCalc.value;
                    SinputNumero = parseFloat(SinputNumero);

                    calculo('soma', SinputNumero);

                    configButton('mais', e.target);


                    break;
                case "-":
                    let SubinputNumero = $inputCalc.value;
                    SubinputNumero = parseFloat(SubinputNumero);

                    calculo('sub', SubinputNumero);

                    configButton('sub', e.target);

                    break;
                case "X":
                    let VezesinputNumero = $inputCalc.value;
                    VezesinputNumero = parseFloat(VezesinputNumero);

                    calculo('vezes', VezesinputNumero);

                    configButton('vezes', e.target);

                
                    break;
                case "/":
                    let DivinputNumero = $inputCalc.value;
                    DivinputNumero = parseFloat(DivinputNumero);

                    calculo('div', DivinputNumero);

                    configButton('div', e.target);

                    break;
                case "%":
                    let PinputNumero = $inputCalc.value;
                    PinputNumer = parseFloat(PinputNumero);
                    

                    let numeroPorc = PinputNumero / 100;
                    $inputCalc.value = numeroPorc; 

                    numeroPorc = numeroPorc.toString();
                    numeroPorc = numeroPorc.replace('.', ',');
                   

                    $input.value = numeroPorc;
                    break;
                case "+/-":
                    let MMinputNumero = $inputCalc.value;
                    MMinputNumero = parseFloat(MMinputNumero);

                    console.log(MMinputNumero);

                    if($input.value == 0){
                        return;
                    }

                    if(!negativeOrPositive){
                        $input.value = - MMinputNumero;
                        $inputCalc.value = - MMinputNumero;
                        negativeOrPositive = false;
                    }else{
                        $input.value = MMinputNumero;
                        $inputCalc.value = MMinputNumero;
                        negativeOrPositive = true;
                    }

                    break;
                case ",":
                    let inputNumero = $inputCalc.value;
                    inputNumero = parseFloat(inputNumero);

                    $input.value = inputNumero + ",";
                    $inputCalc.value = inputNumero + ".";
                    break;
                case "=":
                    let inputNumeroIgual = $inputCalc.value;
                    inputNumeroIgual = parseFloat(inputNumeroIgual);
                    calculo(inputNumeroIgual);

                    let btns = document.querySelectorAll('button');
                    x = 0;


                    while(x < btns.length){
                        if(btns[x].getAttribute('value') || btns[x] != e.target){
                            btns[x].removeAttribute('value', 'true');
                        }
                        
                        x++;
                    }

                    let operacaoMatematica = arr.filter((element) => { 
                        if(typeof element === 'string'){
                            return element;
                        }
                    });

                    let numerosDaOperacao = arr.filter((element) => { 
                        if(typeof element === 'number'){
                            return element;
                        }
                    });

                    operacaoMatematica = operacaoMatematica.pop();
                    numerosDaOperacao = numerosDaOperacao.slice(-2);

                    let result = numerosDaOperacao.reduce((anterior, atual) => {
                        switch(operacaoMatematica){
                            case "soma":
                                posCalculo();
                                return anterior + atual;
                            case "sub":
                                posCalculo();
                                return anterior - atual;
                            case "vezes":
                                posCalculo();
                                return anterior * atual;
                            case "div":
                                posCalculo();
                                return anterior / atual;
                            default:
                                alert("Algo de errado não está certo");
                        }
                    })


                    let numeroInputFinal = configNumeros(result);

                    $input.value = numeroInputFinal;
                    $inputCalc.value = result;

                    break;
                default:
                    alert("Algo de errado não está certo");
            }
        }
        
    })

    
})()