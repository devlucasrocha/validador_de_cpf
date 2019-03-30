const cpf = document.getElementById('cpf')

function getLenOf(cpf) {
    return cpf.value.length
}

cpf.addEventListener('input', () => {
    if (getLenOf(cpf) === 14) {
        const valido = validate_cpf(cpf.value)
        if (valido) {
            setStatus('CPF VÁLIDO')
            $("#main-box").removeClass("border-success")
            $("#main-box").addClass("border-success")
        } else {
            setStatus('CPF INVÁLIDO')
            $("#main-box").addClass("border-danger")
        }
    } else {
        setStatus('...')
        $("#main-box").removeClass("border-success")
        $("#main-box").removeClass("border-danger")
        $("#main-box").addClass("border-secondary")

    }
})

function validate_cpf(cpf) {
    let cpf_array = []
    cpf_array = cpf.split('')
    const getNumbers = e => e != '.' && e != '-'
    cpf_array = cpf_array.filter(getNumbers).map((e) => parseInt(e))

    let primeiro_digito = getPrimeiroDigito(cpf_array) * 10 % 11
    let segundo_digito = getSegundoDigito(cpf_array) * 10 % 11

    primeiro_digito = primeiro_digito === 10 ? 0 : primeiro_digito
    segundo_digito = segundo_digito === 10 ? 0 : segundo_digito
    console.log(`d1: ${primeiro_digito} d2: ${segundo_digito}`)

    function todosIguais(count = 0) {
        for (let i = 9; i >= 0; i--) {
            count = cpf_array.filter(x => x == i).length
            if (count == 11) {
                break
            }
        }
        if (count == 11) {
            return true
        }
    }

    function getSegundoDigito(cpf_array, dec11 = 11, calc = 0) {
        for (let c = 0; c < cpf_array.length - 1; c++) {
            calc += cpf_array[c] * dec11
            dec11--
        }
        return calc
    }

    function getPrimeiroDigito(cpf_array, dec10 = 10, calc = 0) {
        for (let c = 0; c < cpf_array.length - 2; c++) {
            calc += cpf_array[c] * dec10
            dec10--
        }
        return calc
    }

    const validacao = primeiro_digito === cpf_array[9] && segundo_digito === cpf_array[10] && !todosIguais()
    return validacao
}

function setStatus(status_msg) {
    $('#status').html(status_msg)
    if (status_msg.includes(' VÁLIDO')) {
        $('#status').removeClass('text-danger')
        $('#status').addClass('text-success')
    } else if (status_msg.includes('INVÁLIDO')) {
        $('#status').removeClass('text-success')
        $('#status').addClass('text-danger')
    } else {
        $('#status').removeClass('text-danger')
        $('#status').removeClass('text-success')
        $('#status').addClass('text-secondary')
    }
}