import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { contextVenda } from "./context/contextVenda";
import { useVendas } from "./controller/vendascontroller";
import DataTable from "react-data-table-component";
import { Link } from "react-router";

const Vendas = () => {
    const { vendas } = useVendas();
    const { produtos, setProdutos, component, setComponent } = useContext(contextVenda)

    const devolucoes = vendas.filter(array => array.status == false)

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
            name: "Informações",
            selector: row => <Link to={`/vendas/${row.id}`}>Detalhes</Link>,
            sortable: true,
        },
    ];

    return (
        <div className="w-full min-h-dvh flex flex-col gap-2 justify-center items-center mx-auto">
            {vendas.length <= 0 ? (
                <div className="flex justify-center items-center text-3xl text-white w-full h-dvh">carregando...</div>
            ) : (
                <div className="w-4/5">
                    <DataTable
                        title="Devoluções"
                        columns={columns}
                        data={devolucoes}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        striped
                    />
                </div>
            )}
            <button className='bg-blue-500 w-[200px] text-white font-bold py-2 rounded shadow-md hover:cursor-pointer active:scale-95 transition-transform duration-100 active:shadow-inner md:w-1/8'
                onClick={(e) => { e.preventDefault(); setComponent('x') }}>Painel</button>


        </div>
    );
};

export default Vendas;
