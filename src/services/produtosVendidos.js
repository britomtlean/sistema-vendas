const url = 'http://localhost:3000/vendas/'

//rota para receber detalhes sobre uma determinada venda

export const produtosVendidos = async (id) => {

    try {
        const res = await fetch(url + id, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })

        const data = await res.json()
        console.log('produtos vendidos: ', data)
        return data

    } catch (err) {
        alert('erro na requisição')
        console.error(err)
    }

}