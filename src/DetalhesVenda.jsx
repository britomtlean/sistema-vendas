import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useVendas } from "./controller/vendascontroller";
import DataTable from 'react-data-table-component'


const DetalhesVenda = () => {

  const { carregarVenda, detalhesVenda } = useVendas()
  const url = useParams()
  //console.log(url.id)

  useEffect(() => {
    carregarVenda(url.id)
  }, [])


  const columns = [
    {
      name: 'Produto',
      selector: row => row.produtos.produto_produtos,
      sortable: true
    },
    {
      name: 'Quantidade',
      selector: row => row.quantidade,
      sortable: true
    },
    {
      name: 'Valor Unitário',
      selector: row => row.valorUni.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      sortable: true
    },
    {
      name: 'Valor Total',
      selector: row => row.valorTotal_vendasprodutos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      sortable: true
    }
  ]
  return (
    <div className="w-full min-h-dvh flex flex-col gap-2 justify-center items-center mx-auto">
      <div className="w-4/5">
        <DataTable
          title={`Detalhes da venda: ${url.id}`}
          columns={columns}
          data={detalhesVenda}
          pagination
          highlightOnHover
          pointerOnHover
          striped
        />
      </div>
    </div>
  )
}

export default DetalhesVenda