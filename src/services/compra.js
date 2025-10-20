import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";




const url = 'https://servidor-sistema-vendas.up.railway.app/'

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

        /***************************************************************************************** */
        // Enviar dados so pedido via socket

        if (res.ok) {

            const socket = io("https://vendas-config.onrender.com", {
                transports: ["websocket"], // força uso de websocket puro
                withCredentials: true
            });

            socket.on("connect", () => {
                console.log("✅ Conectado com ID:", socket.id);
            });

            socket.on("connect_error", (err) => {
                console.error("❌ Erro na conexão:", err.message);
            });

            socket.emit("mensagem", produtos);
            return true

            /*********************************************************************************** */

        } else {
            return false
        }

    } catch (err) {
        console.log('erro ao enviar', err.message)
        alert(err.message) //resposta do meu servidor
        return false

    }
}