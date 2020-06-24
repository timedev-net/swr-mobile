

export function dateToSQL(data) { // converte a data no padrão 'dd/mm/aaaa' para o SQL 'aaaa-mm-dd'
  let ps = data.split('/')
  return `${ps[2]}-${ps[1]}-${ps[0]}`
}

export function dateToSQL2(data) {
  let ps = data.split('-')
  return `${ps[0]}-${ps[1]}-${ps[2].split('T')[0]}`
}
