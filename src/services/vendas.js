import React from "react"

const url = 'http://localhost:3000/vendas'

//rota que recebe vendas efetuadas

export const dadosVendas = async () => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })
        const data = await res.json()

        const newDate = data.map(array => ({
            id: array.id_vendas,
            funcionario: array.funcionarios.nome_funcionarios,
            data: new Date(array.data_vendas).toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo" // garante que use o fuso correto
            })
        }))

        console.log('vendas rebidas:', newDate)
        return newDate
    } catch (err) {
        alert(err.message)
    }
}