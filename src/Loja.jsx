import React, { useEffect, useState } from "react";

const Loja = () => {

    const [mensagem, setMensagem] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Receber mensagens do servidor
        socket.on("mensagem_retorno", (data) => {
            setChat((prev) => [...prev, data]);
        });

        // Limpar evento ao desmontar
        return () => socket.off("mensagem_retorno");
    }, []);

    const enviarMensagem = () => {
        socket.emit("mensagem", mensagem);
        setMensagem("");
    };

    return (
        <div className='flex flex-col items-center justify-center gap-4 border-1 w-[90vw] h-[40vh] bg-gray-500'>
            <h1>Pedidos</h1>

            <input
                className='border-1 bg-gray-300 rounded-2xl '
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite uma mensagem" />

            <button className='p-1 bg-gray-300 rounded-[8px] w-40 border-1' onClick={enviarMensagem}>Enviar</button>

            <ul>
                {chat.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    )
}

export default Loja