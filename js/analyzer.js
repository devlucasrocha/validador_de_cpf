const cpf = document.getElementById('cpf')

function getLenOf(cpf) {
    return cpf.value.length
}

cpf.addEventListener('input', () => {
    if (getLenOf(cpf) === 14) {
        const valido = validate_CPF(cpf.value)
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

function validate_CPF(cpf) {
    let cpf_array = []
    let primeiro_digito = 0
    let dec10 = 10
    for (let i of cpf) {
        if (i !== '.' && i !== '-') {
            cpf_array.push(parseInt(i))
        }
    }

    for (let i of cpf_array) {
        primeiro_digito += i * dec10
        if (dec10 == 2) {
            break
        }
        dec10--
    }

    primeiro_digito = primeiro_digito * 10 % 11
    if (primeiro_digito === 10) {
        primeiro_digito = 0
    }


    let segundo_digito = 0
    let dec11 = 11
    for (let i of cpf_array) {
        segundo_digito += i * dec11
        if (dec11 === 2) {
            break
        }
        dec11--
    }

    segundo_digito = segundo_digito * 10 % 11
    if (segundo_digito === 10) {
        segundo_digito = 0
    }

    function todosIguais() {
        let count = 0;
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

    const valido = cpf[12] == primeiro_digito && cpf[13] == segundo_digito && !todosIguais()

    if (valido) {
        return true
    } else {
        return false
    }
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