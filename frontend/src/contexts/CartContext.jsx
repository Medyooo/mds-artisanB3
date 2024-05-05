import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  RESET: 'RESET'
}

const initialState = {
  items: [], // [{item: {id: number, price: number}, qty: number}]
  total: 0
}

const cartReducer = (state, action) => {
  let updatedItems = []
  let newTotal = 0

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      updatedItems = state.items.some(cartItem => cartItem.item.id === action.data.item.id)
        ? state.items.map(cartItem => {
          if (cartItem.item.id === action.data.item.id) {
            return { ...cartItem, qty: cartItem.qty + 1 }
          }
          return cartItem
        })
        : [...state.items, { item: action.data.item, qty: 1 }]

      newTotal = updatedItems.reduce((acc, cartItem) => {
        console.log('price:', cartItem.item)
        const itemTotal = Number(cartItem.item.attributes.price) * Number(cartItem.qty)
        console.log(`Calculating: price=${cartItem.item.price}, qty=${cartItem.qty}, itemTotal=${itemTotal}`)
        return acc + itemTotal
      }, 0)

      console.log('New Total:', newTotal)
      return {
        ...state,
        items: updatedItems,
        total: newTotal
      }
    case actionTypes.REMOVE_FROM_CART:
      updatedItems = state.items.filter(cartItem => action.data.id !== cartItem.item.id)
      newTotal = updatedItems.reduce((acc, cartItem) => acc + Number(cartItem.item.attributes.price) * Number(cartItem.qty), 0)
      return {
        ...state,
        items: updatedItems,
        total: newTotal
      }
    case actionTypes.RESET:
      return initialState // Reset state to initial state
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const cartFactory = (dispatch) => ({
  addToCart: (item) => {
    dispatch({
      type: actionTypes.ADD_TO_CART,
      data: { item }
    })
  },
  removeFromCart: (id) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      data: { id }
    })
  },

  resetCart: () => dispatch({ type: actionTypes.RESET }) // Add this line

})

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  return (
    <CartContext.Provider value={{ state, ...cartFactory(dispatch) }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart muse be used inside a CartProvider')
  return context
}

export {
  CartProvider,
  useCart
}
