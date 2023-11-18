import React from 'react'
import { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import consultarBDD from '../../assets/funciones.js'
import { useParams } from 'react-router-dom'
const ItemListContainer = () => {

    const [productos, setProductos] = useState([])
    const {category} = useParams()
    useEffect(() => {
        if(category) {
            const timer = setTimeout(() => {
                consultarBDD('../json/productos.json').then(products => {
                    const productList = products.filter(prod => prod.stock > 0).filter(prod => prod.idCategoria === parseInt(category))
                    const cardProductos = ItemList({productList})
                    setProductos(cardProductos)
                })
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                consultarBDD('./json/productos.json').then(products => {
                    const productList = products.filter(prod => prod.stock > 0)
                    const cardProductos = ItemList({productList})
                    setProductos(cardProductos)
                })
            }, 2000);
            return () => clearTimeout(timer);
        }
        
    }, [category])
    return (
        <>
            <main className='relative z-0 mb-10'>

                <div className='lg-min:flex lg-min:justify-center min-w-0 min-h-0 flex md:flex md:justify-center sm-max:justify-center sm-max:flex'>
                    <div className='lg-min:block lg-min:w-full min-w-0 min-h-0 flex md:block md:w-full md:max-w-[1248px] sm-max:block sm-max:w-full sm-max:max-w-[1248px] '>
                        <div className='lg-min:px-8 lg-min:max-w-[1504px] w-full mx-auto md:px-4 sm-max:px-4'>
                            <div className='lg-min:flex lg-min:items-center lg-min:flex-col lg-min:mb-16 lg-min:mt-24 flex min-h-0 min-w-0 md:items-center md:flex-col md:flex md:mb-16 md:mt-24 sm-max:mb-16 sm-max:mt-24 sm-max:items-center sm-max:flex sm-max:flex-col'>
                                <h1 className='lg-min:text-center lg-min:text-5xl lg-min:font-medium outline-none text-dark-gray-text md:text-center md:text-5xl md:font-medium sm-max:text-center sm-max:font-medium sm-max:text-4xl'>Peluches de Touhou Project</h1>
                                <div className='lg-min:block lg-min:mt-4 lg-min:max-w-full min-w-0 min-h-0 flex md:mt-4 md:block md:max-w-full sm-max:mt-4 sm-max:block sm-max:max-w-[315px]'>
                                    <span className='lg-min:font-normal lg-min:text-base text-dark-gray-text md:text-center md:text-base md:font-normal sm-max:text-center sm-max:text-base sm-max:font-normal text-center'>Nueva colección de fumofumo en oferta!</span>
                                </div>
                            </div>
                            <div className='-mt-2 flex shrink-0 grow basis-full flex-wrap'>
                                {productos}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ItemListContainer