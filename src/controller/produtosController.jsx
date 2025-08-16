import React from "react";
import { useEffect, useState } from "react";
import { getProdutos } from "../services/produtos";

export const useProducts = () => {
    const [items, setItems] = useState([])

    useEffect(() => {

        const carregar = async () => {
            try {
                const data = await getProdutos()
                try {
                    setItems(data)
                } catch (err) {
                    console.log('erro em setItems')
                }
            } catch (err) {
                console.log('erro em data', err)
            }
        }
        carregar()
    }, [])

    return { items, setItems }
}