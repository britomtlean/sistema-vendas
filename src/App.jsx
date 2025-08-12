import { useState, useEffect, useContext } from 'react'
import { contextVenda } from './context/contextVenda';
import { useProducts } from './controller/produtosController'
import { vender } from './services/compra'
import DataTable from 'react-data-table-component';
import Vendas from './Vendas';



function App() {

  const [search, setSearch] = useState('')
  const [quantidade, setQuantidade] = useState({})
  const [valoTotal, setValorTotal] = useState({})
  const [produtos, setProdutos,] = useState([])

  const { component, setComponent } = useContext(contextVenda)
  const { items } = useProducts()

  const createProduct = (e, array,) => {
    e.preventDefault()


    // Verifica se o produto já existe no carrinho
    const jaExiste = produtos.some(prod => prod.id === array.id_produtos);
    if (jaExiste) {
      alert('Este produto já está no carrinho!');
      return;
    } //feito por IA

    const quantidadeValor = 1

    const newProduct = {
      id: array.id_produtos,
      nome: array.produto_produtos,
      valorUni: parseFloat(array.valor_produtos.replace(',', '.')),
      quantidade: quantidadeValor,
      total: (parseFloat(array.valor_produtos.replace(',', '.')) * quantidadeValor)
    }


    setProdutos((prevProdutos) => ([...prevProdutos, newProduct]))
  }


  /******************************************************************************** */

  const addProduct = (e, array, index) => {
    e.preventDefault();
    console.log('array: ', produtos)
    produtos.forEach((array, i) => {
      if (i == index) {
        array.quantidade += 1
        array.total = array.valorUni * array.quantidade

        setQuantidade(prev => ({
          ...prev,
          [array.id]: array.quantidade
        }))

        setValorTotal(prev => ({
          ...prev,
          [array.id]: array.total
        }))

        console.log(array)
        //console.log('objeto selecionado: ',quantidade[array.id])  
      }
    })
  }

  const subProduct = (e, array, index) => {
    e.preventDefault();
    //console.log('array: ',produtos)
    produtos.forEach((array, i) => {
      if (i == index) {
        array.quantidade = array.quantidade <= 1 ? 1 : array.quantidade - 1
        array.total = array.valorUni * array.quantidade

        setQuantidade(prev => ({
          ...prev,
          [array.id]: array.quantidade
        }))

        setValorTotal(prev => ({
          ...prev,
          [array.id]: array.total
        }))

        console.log(array)
        //console.log('objeto selecionado: ',quantidade[array.id])  
      }
    })
  }


  return (

    (items.length <= 0) ? <><strong>Carregando...</strong></>
      : (component == 'vendas') ? <Vendas /> :

        <>
          <header className='mx-auto flex flex-col gap-3.5 justify-center items-center w-[100vw] min-h-[5rem] bg-gray-900'>
            <h1 className='text-amber-300 text-[2rem]'>Painel de vendas</h1>
          </header>

          <section className='mx-auto flex flex-col gap-3.5 justify-center items-center w-[80vw] min-h-[100vh] border-1'>

            <form className=' flex flex-col gap-1.5 items-center justify-start  text-black text-[1.2rem]  w-2/3 min-h-[320px]'>
              <strong className='text-white text-3xl ' htmlFor="produto">Pesquisar</strong>
              <input type="text"
                name="produto"
                id="produto"
                placeholder='Pesquise o produto'
                onChange={(e) => { setSearch(e.target.value.toLowerCase()) }}

                className='outline-none bg-gray-100 rounded-[0.8rem] px-1.5 py-2 w-[70%] mb-4' />

              {/*****************************************************PRODUTOS********************************************************** */}

              <div className='w-3/3 min-h-[280px] p-2 flex flex-col items-center justify-start bg-gray-100 rounded-[8px]' >
                {
                  items.filter((array) => (array.produto_produtos.toLowerCase().includes(search)))
                    .map((array, index) => {
                      //const object = array.id_produtos
                      //const valor = (!quantidade[object]) ? 1 : quantidade[object]
                      return (
                        <ul className='bg-gray-100 mb-1.5 border-b-1 w-full flex justify-between items-center flex-wrap text-center min-h-14 rounded-[8px]' key={array.id_produtos}>
                          <li className='flex-1/4'>{array.produto_produtos}</li>

                          <li className='flex-1/4'>Valor: R$ {array.valor_produtos}</li>

                          <li className='flex-1/4'>Estoque: {array.estoque_produtos}
                            {/* 
                            <button className='bg-blue-500 w-7 h-7 rounded-[30%] hover:cursor-pointer'
                              onClick={(e) => { addProduct(e, object) }}>+</button>*/}
                          </li>
                          <button className='flex-1/9 h-[56px] bg-blue-500 hover:cursor-pointer rounded-[8px]'
                            onClick={(e) => {
                              createProduct(e, array, index)
                              /*
                              if (!valor) {
                                alert('Insira uma quantidade');
                                e.preventDefault();
                              } else {
                                createProduct(e, array);
                              }
                                */
                            }}
                          >Adicionar</button>
                        </ul>
                      )
                    })}
              </div>
            </form>

            <div className='w-2/3 p-2 flex flex-col items-center justify-center bg-gray-500' >
              <strong>Carrinho</strong>

              {/*<DataTable className='w-2/3 p-2 flex flex-col items-center justify-center text-centertext-[1.2rem]'
                title="Produtos Selecionados"
                columns={[
                  { name: 'ID', selector: row => row.id, sortable: true },
                  { name: 'Produto', selector: row => row.nome, sortable: true },
                  { name: 'Valor', selector: row => row.valorUni.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), sortable: true },
                  { name: 'Quantidade', selector: row => row.quantidade, sortable: true },
                  { name: 'Total', selector: row => row.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), sortable: true },
                ]}
                data={produtos}
                pagination
              />*/}
              {/***********************************************************CARRINHO************************************************************************ */}
              {
                produtos.map((array, index) => {

                  return (
                    <ul className='flex justify-between items-center p-1.5 w-4/5 text-center border-1 bg-gray-100' key={array.id}>
                      <li className='flex-1/4'>{array.nome}</li>
                      <li className='flex-1/4'>{array.valorUni.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                      <li className='flex-1/4 flex gap-1.5'>
                        {
                          <button className='bg-blue-500 w-6 h-6 rounded-[30%] hover:cursor-pointer'
                            onClick={(e) => { subProduct(e, array, index) }}>-
                          </button>
                        }
                        <span>{(quantidade[array.id] || array.quantidade)}</span>
                        {
                          <button className='bg-blue-500 w-6 h-6 rounded-[30%] hover:cursor-pointer'
                            onClick={(e) => { addProduct(e, array, index) }}>+
                          </button>
                        }
                      </li>
                      <li className='flex-1/4'>{(valoTotal[array.id]) && valoTotal[array.id].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || array.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                    </ul>
                  )
                })
              }

            </div>

            <div className='flex gap-1.5'>

              <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:cursor-pointer active:scale-95 transition-transform duration-100 active:shadow-inner'
                onClick={() => {
                  if(produtos.length > 0){
                  const funcionario = Number(prompt('Insira o seu ID'))
                  vender(funcionario, produtos)
                  console.log('você comprou:', produtos);
                  }else{
                    alert('Insira um produto')
                  } 
                }}
              >Finalizar
              </button>

              <button className='bg-blue-500 text-white font-bold py-2 px-6 rounded shadow-md hover:cursor-pointer active:scale-95 transition-transform duration-100 active:shadow-inner'
                onClick={(e) => { e.preventDefault(); setComponent('vendas') }}>Vendas
              </button>

            </div>

          </section>
        </>
  )
}

export default App
