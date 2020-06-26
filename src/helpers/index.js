
export function dateToSQL(data) { // converte a data no padrão 'dd/mm/aaaa' para o SQL 'aaaa-mm-dd'
let ps = data.split('/')
return `${ps[2]}-${ps[1]}-${ps[0]}`
}

export function dateToSQL2(data) {
let ps = data.split('-')
return `${ps[0]}-${ps[1]}-${ps[2].split('T')[0]}`
}

export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

export function moneyToAPI(val) {
    const inteiros = val.substring(0, val.length-2)
    const decimais = val.substring(val.length-2)
    const new_val = `${inteiros}.${decimais}`
    return new_val
}

export function qtdToAPI(val) {
    const inteiros = val.substring(0, val.length-3)
    const decimais = val.substring(val.length-3)
    const new_val = `${inteiros}.${decimais}`
    return new_val
}