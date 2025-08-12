import { dadosVendas } from "../services/vendas";
import { produtosVendidos } from "../services/produtosVendidos";
import React from "react";
import { useEffect, useState } from "react";

export const useVendas = () => {

    const [vendas, setVendas] = useState([])
    const [detalhesVenda, setDetalhesVenda] = useState([])



    const carregarVenda = async (url) => {
        const id = Number(url)
        const data = await produtosVendidos(id)
        //console.log('produtos recebidos: ',data)
        setDetalhesVenda(data)
    }

    useEffect(() => {

        const carregar = async () => {
            const data = await dadosVendas()
            setVendas(data)
        }

        carregar()

    }, [detalhesVenda])

    return { vendas, carregarVenda, detalhesVenda }
}