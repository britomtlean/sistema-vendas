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
  const [valorPedido, setValorPedido] = useState([0.00])

  const { component, setComponent } = useContext(contextVenda)
  const { items } = useProducts()

  useEffect(() => {
    console.log('total de produtos: ', produtos)
    const somaTotal = produtos.reduce((acumulador, item) => acumulador + item.total, 0);
    setValorPedido(somaTotal)
  }, [produtos, quantidade])

  const createProduct = (e, array,) => {
    e.preventDefault()

    // Verifica se o produto já existe no carrinho
    const confirmProduct = produtos.some(prod => prod.id === array.id_produtos);
    if (confirmProduct) {
      alert('Este produto já está no carrinho!');
      return;
    }

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

        console.log('quantidade inserida: ', array)
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

  const removeProduct = (produto) => {
    const produtosFiltrados = produtos.filter(array => {
      if (array.id != produto.id) {
        console.log(array)
        return array
      }
    })
    //console.log(produtosFiltrados)
    setProdutos(produtosFiltrados)
    setQuantidade(prev => ({
      ...prev,
      [produto.id]: 1
    }))

    setValorTotal(prev => ({
      ...prev,
      [produto.id]: produto.valorUni
    }))
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
                        <ul className='bg-gray-100 mb-1.5 p-1.5 border-b-1 w-full flex justify-between items-center flex-wrap text-center h-14 rounded-[8px]' key={array.id_produtos}>
                          <li className='flex-1/4'>{array.produto_produtos}</li>

                          <li className='flex-1/4'>Valor: R$ {array.valor_produtos}</li>

                          <li className='flex-1/4'>Estoque: {array.estoque_produtos}
                            {/* 
                            <button className='bg-blue-500 w-7 h-7 rounded-[30%] hover:cursor-pointer'
                              onClick={(e) => { addProduct(e, object) }}>+</button>*/}
                          </li>
                          <button className='flex-1/9 h-full bg-blue-500 text-white font-bold hover:cursor-pointer rounded-[8px]'
                            onClick={(e) => {
                              createProduct(e, array, index);
                            }}
                          >Adicionar</button>
                        </ul>
                      )
                    })}
              </div>
            </form>

            <div className='w-2/3 py-5 flex flex-col items-center justify-center gap-0.5 bg-gray-600 rounded-[8px]' >
              <strong className='text-2xl mb-2.5 text-white'>Carrinho</strong>

              {/***********************************************************CARRINHO***********************************************************/}
              <ul className='flex justify-between items-center p-1.5 w-4/5 h-14 text-center font-bold border-1 bg-gray-100 rounded-[8px]'>
                <li className='flex-1/7 mr-10'>Id</li>
                <li className='flex-1/6 mr-12 '>Produto</li>
                <li className='flex-1/6 mr-3  '>Valor</li>
                <li className='flex-1/7 mr-12'>Quantidade</li>
                <li className='flex-1/6'>Total</li>
                <li className='flex-1/6'></li>
              </ul>
              {
                produtos.map((array, index) => {
                  return (
                    <ul className='flex justify-between items-center p-1.5 w-4/5 h-14 text-center border-1 bg-gray-100 rounded-[8px]' key={array.id}>
                      <li className='flex-1/7'>{array.id}</li>
                      <li className='flex-1/5'>{array.nome}</li>
                      <li className='flex-1/5'>{array.valorUni.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</li>
                      <li className='flex-1/7 flex gap-2.5'>
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
                      <li className='flex-1/5'>{(valoTotal[array.id]) && valoTotal[array.id].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || array.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </li>
                      <button className=' flex-1/9 bg-red-600 text-white font-bold h-full rounded-[8px] hover:cursor-pointer'
                        onClick={(e) => { removeProduct(array) }}>Remover
                      </button>
                    </ul>
                  )
                })
              }
              <div className='bg-gray-100 p-1.5 w-4/5 flex flex-col gap-0.5 justify-center items-center flex-wrap text-center font-bold h-10 rounded-[8px]'>
                <p>Total:</p>
                <p>{valorPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>

            <div className='flex gap-1.5'>

              <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md hover:cursor-pointer active:scale-95 transition-transform duration-100 active:shadow-inner'
                onClick={() => {
                  if (produtos.length > 0) {
                    const funcionario = Number(prompt('Insira o seu ID'))
                    vender(funcionario, produtos)
                    console.log('você comprou:', produtos);
                  } else {
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
