import { useEffect, useState } from "react"
import { IProduct } from "../models"
import axios, { AxiosError } from "axios"

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    async function fetchProducts() {
      try {
        setError('')
        setLoading(true)
        const responce = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
        setProducts(responce.data)
        setLoading(false)
      } catch(e : unknown) {
        const error = e as AxiosError
        setLoading(false)
        setError(error.message)
      }
    }

    function addProduct(product: IProduct) {
      setProducts(prev => [...prev, product])
    }
  
    useEffect(() => {
      fetchProducts() 
    }, [])
    
    return {products, error, loading, addProduct}
}