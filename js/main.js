function converter(baseSelecionada) {
    var input;

    switch (baseSelecionada) {
        case "decimal":
            input = document.getElementById("iptDecimalNumber").value.trim(); // Para decimal
            break;
        case "binario":
            input = document.getElementById("iptBinarioNumber").value.trim(); // Para binário
            break;
        case "octal":
            input = document.getElementById("iptOctalNumber").value.trim(); // Para octal
            break;
        case "hexadecimal":
            input = document.getElementById("iptHexadecimalNumber").value.trim(); // Para hexadecimal
            break;
        default:
            document.getElementById("resultado").innerHTML = "<p style='color: red;'>Base inválida</p>";
            return;
    }

    // Limpa qualquer mensagem de erro anterior
    document.getElementById("resultado").innerHTML = '';

    // Converte input para maiúsculas 
    input = input.toUpperCase();

    // Validação para cada base
    let valido = true;

    if (input === "") {
        valido = false;
    } else if (baseSelecionada === "hexadecimal") {
        for (let char of input) {
            if (!("0123456789ABCDEF".includes(char))) {
                valido = false;
                break;
            }
        }
    } else if (baseSelecionada === "binario") {
        for (let char of input) {
            if (char !== "0" && char !== "1") {
                valido = false;
                break;
            }
        }
    } else if (baseSelecionada === "octal") {
        for (let char of input) {
            if (!("01234567".includes(char))) {
                valido = false;
                break;
            }
        }
    } else if (isNaN(input)) {
        valido = false;
    }

    // Se a validação falhar, exibe erro e interrompe a função
    if (!valido) {
        document.getElementById("resultado").innerHTML = "<p style='color: red;'>Por favor, insira um número válido para a base selecionada!</p>";
        return;
    }

    // Converte o valor para decimal
    try {
        let decimal;
        switch (baseSelecionada) {
            case "decimal":
                decimal = parseInt(input, 10);
                break;
            case "binario":
                decimal = parseInt(input, 2);
                break;
            case "octal":
                decimal = parseInt(input, 8);
                break;
            case "hexadecimal":
                decimal = parseInt(input, 16);
                break;
            default:
                throw new Error("Base inválida");
        }

        // Verifica se a conversão foi bem-sucedida
        if (isNaN(decimal)) {
            throw new Error("Número inválido para a base selecionada");
        }

        // Converte para as outras bases
        var binario = decimal.toString(2);
        var octal = decimal.toString(8);
        var hexadecimal = decimal.toString(16).toUpperCase();

        // Exibe os resultados corretamente
        if (baseSelecionada === "binario") {
            document.querySelectorAll(".outputResultado")[0].textContent = octal;      // Decimal
            document.querySelectorAll(".outputResultado")[1].textContent = hexadecimal;        // Octal
            document.querySelectorAll(".outputResultado")[2].textContent = decimal;  // Hexadecimal
        } else if (baseSelecionada === "octal") {
            document.querySelectorAll(".outputResultado")[0].textContent = binario;      // Binario
            document.querySelectorAll(".outputResultado")[1].textContent = hexadecimal;      // Hexadecimal
            document.querySelectorAll(".outputResultado")[2].textContent = decimal;  // Decimal
        } else if (baseSelecionada === "hexadecimal") {
            document.querySelectorAll(".outputResultado")[0].textContent = octal;      // Octal
            document.querySelectorAll(".outputResultado")[1].textContent = binario;      // Binário
            document.querySelectorAll(".outputResultado")[2].textContent = decimal;        // Hexadecimal
        } else if (baseSelecionada === "decimal") {
            document.querySelectorAll(".outputResultado")[0].textContent = octal;      // octal
            document.querySelectorAll(".outputResultado")[1].textContent = hexadecimal;        // hexadecimal
            document.querySelectorAll(".outputResultado")[2].textContent = binario;  // binario
        }

    } catch (error) {
        document.getElementById("resultado").innerHTML = `<p style='color: red;'>${error.message}</p>`;
    }
}

function calcular(operacao) {
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);
    let resultado;

    if (isNaN(num1) || isNaN(num2)) {
        document.querySelector(".spanResultado").textContent = "Erro: Insira números válidos";
        return;
    }

    switch (operacao) {
        case "soma":
            resultado = num1 + num2;
            break;
        case "subtracao":
            resultado = num1 - num2;
            break;
        case "multiplicacao":
            resultado = num1 * num2;
            break;
        case "divisao":
            if (num2 === 0) {
                document.querySelector(".spanResultado").textContent = "Erro: Divisão por zero!";
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            resultado = "Operação inválida";
    }

    if (typeof resultado === 'number' && !isNaN(resultado)) {
        // Exibindo os resultados em diferentes bases
        let binario = resultado.toString(2);
        let hexa = resultado.toString(16).toUpperCase();
        let octal = resultado.toString(8);
        
        // Atualizando o conteúdo da tela
        document.querySelector(".spanResultado").innerHTML = `${resultado} (Decimal)<br> ${binario} (Binário)<br> ${hexa} (Hexadecimal)<br> ${octal} (Octal)`;
    } else {
        document.querySelector(".spanResultado").innerHTML = resultado;
    }
}
function calcular2(operacao) {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let resultado;
    let valido = true;

    // Verificando se os números são binários usando o código fornecido
    for (let char of num1) {
        if (char !== "0" && char !== "1") {
            valido = false;
            break;
        }
    }

    for (let char of num2) {
        if (char !== "0" && char !== "1") {
            valido = false;
            break;
        }
    }

    // Se algum número não for binário, exibe erro
    if (!valido) {
        document.querySelector(".spanResultado").textContent = "Erro: Digite apenas números binários (0 ou 1)";
        return;
    }

    // Convertendo os números binários para decimal
    num1 = parseInt(num1, 2);
    num2 = parseInt(num2, 2);

    // Realizando a operação
    switch (operacao) {
        case "soma":
            resultado = num1 + num2;
            break;
        case "subtracao":
            resultado = num1 - num2;
            break;
        case "multiplicacao":
            resultado = num1 * num2;
            break;
        case "divisao":
            if (num2 === 0) {
                document.querySelector(".spanResultado").textContent = "Erro: Divisão por zero!";
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            resultado = "Operação inválida";
    }

    // Exibindo o resultado nas 4 bases
    if (typeof resultado === 'number' && !isNaN(resultado)) {
        let binario = resultado.toString(2);
        let hexa = resultado.toString(16).toUpperCase();
        let octal = resultado.toString(8);
        
        document.querySelector(".spanResultado").innerHTML = `${resultado} (Decimal)<br> ${binario} (Binário)<br> ${hexa} (Hexadecimal)<br> ${octal} (Octal)`;
    } else {
        document.querySelector(".spanResultado").innerHTML = resultado;
    }
}

function calcular3(operacao) {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let resultado;
    let valido = true;

    // Verificando se os números são hexadecimais
    for (let char of num1) {
        if (!("0123456789ABCDEF".includes(char.toUpperCase()))) {
            valido = false;
            break;
        }
    }

    for (let char of num2) {
        if (!("0123456789ABCDEF".includes(char.toUpperCase()))) {
            valido = false;
            break;
        }
    }

    // Se algum número não for hexadecimal, exibe erro
    if (!valido) {
        document.querySelector(".spanResultado").textContent = "Erro: Digite apenas números hexadecimais (0-9, A-F)";
        return;
    }

    // Convertendo os números hexadecimais para decimal
    num1 = parseInt(num1, 16);
    num2 = parseInt(num2, 16);

    // Realizando a operação
    switch (operacao) {
        case "soma":
            resultado = num1 + num2;
            break;
        case "subtracao":
            resultado = num1 - num2;
            break;
        case "multiplicacao":
            resultado = num1 * num2;
            break;
        case "divisao":
            if (num2 === 0) {
                document.querySelector(".spanResultado").textContent = "Erro: Divisão por zero!";
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            resultado = "Operação inválida";
    }

    // Exibindo o resultado nas 4 bases
    if (typeof resultado === 'number' && !isNaN(resultado)) {
        let binario = resultado.toString(2);
        let hexa = resultado.toString(16).toUpperCase();
        let octal = resultado.toString(8);
        
        document.querySelector(".spanResultado").innerHTML = `${resultado} (Decimal)<br> ${binario} (Binário)<br> ${hexa} (Hexadecimal)<br> ${octal} (Octal)`;
    } else {
        document.querySelector(".spanResultado").innerHTML = resultado;
    }
}
function calcular4(operacao) {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let resultado;
    let valido = true;

    // Verificando se os números são octais
    for (let char of num1) {
        if (!("01234567".includes(char))) {
            valido = false;
            break;
        }
    }

    for (let char of num2) {
        if (!("01234567".includes(char))) {
            valido = false;
            break;
        }
    }

    // Se algum número não for octal, exibe erro
    if (!valido) {
        document.querySelector(".spanResultado").textContent = "Erro: Digite apenas números octais (0-7)";
        return;
    }

    // Convertendo os números octais para decimal
    num1 = parseInt(num1, 8);
    num2 = parseInt(num2, 8);

    // Realizando a operação
    switch (operacao) {
        case "soma":
            resultado = num1 + num2;
            break;
        case "subtracao":
            resultado = num1 - num2;
            break;
        case "multiplicacao":
            resultado = num1 * num2;
            break;
        case "divisao":
            if (num2 === 0) {
                document.querySelector(".spanResultado").textContent = "Erro: Divisão por zero!";
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            resultado = "Operação inválida";
    }

    // Exibindo o resultado nas 4 bases
    if (typeof resultado === 'number' && !isNaN(resultado)) {
        let binario = resultado.toString(2);
        let hexa = resultado.toString(16).toUpperCase();
        let octal = resultado.toString(8);
        
        document.querySelector(".spanResultado").innerHTML = `${resultado} (Decimal)<br> ${binario} (Binário)<br> ${hexa} (Hexadecimal)<br> ${octal} (Octal)`;
    } else {
        document.querySelector(".spanResultado").innerHTML = resultado;
    }
}
