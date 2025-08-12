const url = 'http://localhost:3000/venderproduto'

//rota para efutuar venda

export const vender = async (idFuncionario, produtos) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idFuncionario, produtos })
        })

        const data = await res.json(); // <== transforma a resposta em objeto

        alert(data.message) //resposta do meu servidor
    } catch (err) {
        console.log('erro ao enviar', err.message)
        alert(err.message) //resposta do meu servidor

    }
}