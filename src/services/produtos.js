
const url = 'http://localhost:3000/produtos/'

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

export const baixaProdutos = async (id) => {
    try {
        if (!id) {
            return alert('ID não definido')
        }

        const res = await fetch(url + id + '/baixa', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
            // Caso o back retorne erro (404, 400, etc.)
            return alert(data.message || 'Erro desconhecido')
        }

        const data = await res.json()
        alert(JSON.stringify(data.message))

    } catch (err) {
        console.log(err)
        alert('erro', err)
    }
}

export const devolverProdutos = async (id) => {
    try {
        if (!id) {
            return alert('ID não definido')
        }

        const res = await fetch(url + id + '/entrada', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
            // Caso o back retorne erro (404, 400, etc.)
            return alert(data.message || 'Erro desconhecido')
        }

        const data = await res.json()
        alert(JSON.stringify(data.message))

    } catch (err) {
        console.log(err)
        alert('erro', err)
    }
}
