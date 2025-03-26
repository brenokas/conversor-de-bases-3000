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

    // Verifica se o valor inserido é vazio ou não é um número válido
    if (input === "" || isNaN(input)) {
        document.getElementById("resultado").innerHTML = "<p style='color: red;'>Por favor, insira um número válido para a base selecionada!</p>";
        return; // Sai da função se o número for inválido
    }
    // Com base na baseSelecionada, converte o valor inserido para decimal.
    try {
        switch (baseSelecionada) {
            case "decimal":
                decimal = parseInt(input, 10);  // Converte para decimal
                break;
            case "binario":
                decimal = parseInt(input, 2);   // Converte de binário para decimal
                break;
            case "octal":
                decimal = parseInt(input, 8);   // Converte de octal para decimal
                break;
            case "hexadecimal":
                decimal = parseInt(input, 16);  // Converte de hexadecimal para decimal
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

        // Exibe os resultados, convertendo para a base necessária
        if (baseSelecionada === "binario") {
            document.querySelectorAll(".outputResultado")[0].textContent = octal;        // Decimal
            document.querySelectorAll(".outputResultado")[1].textContent = hexadecimal;         // Octal
            document.querySelectorAll(".outputResultado")[2].textContent = decimal;  // Hexadecimal
        } else if (baseSelecionada === "octal") {
            document.querySelectorAll(".outputResultado")[0].textContent = binario;      // Binário
            document.querySelectorAll(".outputResultado")[1].textContent = decimal;      // Decimal
            document.querySelectorAll(".outputResultado")[2].textContent = hexadecimal;  // Hexadecimal
        } else if (baseSelecionada === "hexadecimal") {
            document.querySelectorAll(".outputResultado")[0].textContent = binario;      // Binário
            document.querySelectorAll(".outputResultado")[1].textContent = octal;        // Octal
            document.querySelectorAll(".outputResultado")[2].textContent = decimal;      // Decimal
        } else if (baseSelecionada === "decimal") {
            document.querySelectorAll(".outputResultado")[0].textContent = octal;        // Octal
            document.querySelectorAll(".outputResultado")[1].textContent = hexadecimal;  // Hexadecimal
            document.querySelectorAll(".outputResultado")[2].textContent = binario;      // Binário
        }

    } catch (error) {
        document.getElementById("resultado").innerHTML = `<p style='color: red;'>${error.message}</p>`;
    }
}
