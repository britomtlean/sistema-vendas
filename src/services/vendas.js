import React from "react"
import { baixaProdutos, devolverProdutos } from "./produtos"

const url = 'http://localhost:3000/vendas/'

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
            }),
            valorTotal: array.valorTotal_vendas,
            status: array.status
        }))

        console.log('vendas rebidas:', newDate)
        return newDate
    } catch (err) {
        alert(err.message)
    }
}

//rota para atualizar status da venda

export const fecharVenda = async (id) => {
    try {
        const res = await fetch(url + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: true })
        })

        const data = await res.json()

        if (res.ok) {
            try {
                baixaProdutos(id)
            } catch (err) {
                alert(JSON.stringify(data) || 'Erro ao dar baixa')
            }
        } else {
            alert('Erro na resposta')
        }

    } catch (err) {
        alert('Erro na execução')
        console.log(err)
    }
}

export const retornarVenda = async (id) => {
    try {
        const res = await fetch(url + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: false })
        })

        const data = await res.json()

        if (res.ok) {
            try {
                devolverProdutos(id)
            } catch (err) {
                alert(JSON.stringify(data) || 'Erro na devolução')
            }
        } else {
            alert('Erro na resposta')
        }

    } catch (err) {
        alert('Erro na execução')
        console.log(err)
    }
}