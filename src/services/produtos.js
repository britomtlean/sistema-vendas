
const url = 'http://localhost:3000/produtos'

//rota para receber produtos

export const getProdutos = async () => {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()
    console.log('produtos recebidos: ', data)
    return data
}
