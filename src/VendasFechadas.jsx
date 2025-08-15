import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { contextVenda } from "./context/contextVenda";
import { useVendas } from "./controller/vendascontroller";
import DataTable from "react-data-table-component";
import { Link} from "react-router";
import { retornarVenda } from './services/vendas'

const Vendas = () => {
    const { vendas} = useVendas();
    const { produtos, setProdutos, component, setComponent } = useContext(contextVenda)

    const vendasFechadas = vendas.filter(array => array.status ==  true)

useEffect(() => {

    vendasFechadas

},[vendasFechadas])


    // Definindo colunas para o DataTable
    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true, // permite ordenar
        },
        {
            name: "Funcionário",
            selector: row => row.funcionario,
            sortable: true,
        },
                {
            name: "Valor",
            selector: row => parseFloat(row.valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            sortable: true,
        },
                {
            name: "Data",
            selector: row => row.data,
            sortable: true,
        },
        {
            name:"Abrir Venda",
            selector: row => <Link to = {`/vendas/${row.id}`}>Detalhes</Link>,
            sortable: true,
        },
        {
            name: "Ações",
            selector: row => <button className=" bg-blue-600 px-1.5 py-1 text-white rounded-[8px]" onClick={() => {row.status == false ? alert('Esta venda já esta fechada!') : retornarVenda(row.id)}}>Devolver</button>,
            sortable: true, // permite ordenar
        },

    ];

    return (
        <div className="w-full min-h-dvh flex flex-col gap-2 justify-center items-center mx-auto">
            {vendas.length <= 0 ? (
                <div>Carregando...</div>
            ) : (
                <div className="w-4/5">
                    <DataTable
                        title="Vendas Fechadas"
                        columns={columns}
                        data={vendasFechadas}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        striped
                    />
                </div>
            )}
            <button className='bg-blue-500 text-white font-bold py-2 px-6 rounded shadow-md hover:cursor-pointer active:scale-95 transition-transform duration-100 active:shadow-inner w-1/8'
                onClick={(e) => { e.preventDefault(); setComponent('x') }}>Painel</button>

                
        </div>
    );
};

export default Vendas;
