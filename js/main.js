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
