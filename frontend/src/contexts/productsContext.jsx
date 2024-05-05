import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { addProductApi, deleteProductApi } from '../services/api' // Ensure APIs are imported correctly

const ProductContext = createContext()

const actionTypes = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  ERROR: 'ERROR',
  LOADING: 'LOADING'
}

const initialState = {
  products: [],
  loading: false,
  error: null
}

const productReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return { ...state, products: action.payload, loading: false }
    case actionTypes.CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload], loading: false }
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? action.payload : product),
        loading: false
      }
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: false
      }
    case actionTypes.ERROR:
      return { ...state, error: action.payload, loading: false }
    case actionTypes.LOADING:
      return { ...state, loading: true }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const productFactory = (dispatch) => ({

  createProduct: async (productData) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const response = await addProductApi(productData)
      if (response.status === 200) {
        dispatch({ type: actionTypes.CREATE_PRODUCT, payload: response.data })
        toast.success('Produit ajouté avec succès!')
      } else {
        throw new Error('Failed to create product')
      }
    } catch (error) {
      dispatch({ type: actionTypes.ERROR, payload: error.message })
      toast.error('Erreur lors de la création du produit: ' + error.message)
    }
  },

  deleteProduct: async (productId, jwt) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      await deleteProductApi(productId, jwt)
      dispatch({
        type: actionTypes.DELETE_PRODUCT
      })
    } catch (error) {
      dispatch({ type: actionTypes.ERROR, payload: error.message })
      toast.error('Erreur lors de la suppréssion du produit: ' + error.message)
    }
  }
})
const ProductProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(productReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <ProductContext.Provider value={{ ...state, ...productFactory(dispatch) }}>
      {children}
    </ProductContext.Provider>
  )
}

const useProduct = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider')
  }
  return context
}

export { ProductProvider, useProduct }
