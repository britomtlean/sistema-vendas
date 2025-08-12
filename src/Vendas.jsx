import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { contextVenda } from "./context/contextVenda";
import { useVendas } from "./controller/vendascontroller";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router";

const Vendas = () => {
    const { vendas, detalhesVenda, carregarVenda } = useVendas();
    const { produtos, setProdutos, component, setComponent } = useContext(contextVenda)

    const navigate = useNavigate()


useEffect(() => {
    carregarVenda(31)
},[])


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
            name: "Data",
            selector: row => row.data,
            sortable: true,
        },
        {
            name:"Detalhes",
            selector: row => <Link to = {`/vendas/${row.id}`}>Abrir</Link>,
            sortable: true,
        }

    ];

    return (
        <div className="w-full min-h-dvh flex flex-col gap-2 justify-center items-center mx-auto">
            {vendas.length <= 0 ? (
                <div>Carregando...</div>
            ) : (
                <div className="w-4/5">
                    <DataTable
                        title="Lista de Vendas"
                        columns={columns}
                        data={vendas}
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
