const cpf = document.getElementById('cpf')

function getLenOf(cpf) {
    return cpf.value.length
}
cpf.addEventListener('input', () => {
    if (getLenOf(cpf) === 14) {
        const valido = validate_CPF(cpf.value)
        if (valido) {
            status('CPF VÁLIDO')
            document.getElementById('main-box').classList.remove('border-danger')
            document.getElementById('main-box').classList.add('border-success')
        } else {
            status('CPF INVÁLIDO')
            document.getElementById('main-box').classList.add('border-danger')
        }
    } else {
        status('...')
        document.getElementById('main-box').classList.remove('border-danger')
        document.getElementById('main-box').classList.remove('border-success')
        document.getElementById('main-box').classList.add('border-secondary')
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

    const valido = cpf[12] == primeiro_digito && cpf[13] == segundo_digito

    if (valido) {
        return true
    } else {
        return false
    }
}

function status(status_msg) {
    const status = document.getElementById('status')
    status.innerHTML = status_msg
    if (status_msg.includes(' VÁLIDO')) {
        status.classList.remove('text-danger')
        status.classList.add('text-success')
    } else if (status_msg.includes('INVÁLIDO')) {
        status.classList.remove('text-success')
        status.classList.add('text-danger')
    } else {
        status.classList.remove('text-success')
        status.classList.remove('text-danger')
        status.classList.add('text-secondary')
    }
}