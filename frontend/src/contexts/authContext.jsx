import { createContext, useContext, useEffect, useReducer } from 'react'
import { deleteAccountApi, loginApi, registerApi, updateUserInfoApi } from '../services/api'
import { toast } from 'react-toastify'

const AuthContext = createContext()

const actionTypes = {
  LOGIN: 'LOGIN', // Connecté avec succès
  REGISTER: 'REGISTER', // Inscrit + connecté avec succès
  LOGOUT: 'LOGOUT', // Déconnecté
  LOADING: 'LOADING', // Chargement
  ERROR: 'ERROR', // Erreur
  RESET: 'RESET', // Réinitialisation de l'état
  UPDATE_USER_INFO: 'UPDATE_USER_INFO', // Ajout pour la mise à jour des informations de l'utilisateur
  DELETE_ACCOUNT: 'DELETE_ACCOUNT'

}

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null
}

/**
 * @param prevState Etat précédent l'action
 * @param action Action pour mettre à jour l'état = { type, data? = { jwt, user, error } }
 */
const authReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER:
    case actionTypes.LOGIN:
      return {
        jwt: action.data.jwt,
        user: action.data.user,
        isLoggedIn: true,
        loading: false,
        error: null
      }
    case actionTypes.ERROR:
      return {
        jwt: null,
        user: null,
        loading: false,
        isLoggedIn: false,
        error: action.data.error
      }
    case actionTypes.LOADING:
      return {
        ...prevState, // Recopie de l'état précédent
        loading: true
      }
    case actionTypes.UPDATE_USER_INFO:
      return {
        ...prevState,
        user: {
          ...prevState.user,
          ...action.data // Met à jour les informations de l'utilisateur avec celles fournies
        }
      }
    case actionTypes.DELETE_ACCOUNT:
    case actionTypes.RESET:
    case actionTypes.LOGOUT:
      return initialState

    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const authFactory = (dispatch) => ({
  // credentials = { identifier, password }
  login: async (credentials) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await loginApi(credentials)
      dispatch({
        type: actionTypes.LOGIN,
        data: {
          user: result.user,
          jwt: result.jwt
        }
      })
    } catch (error) {
      toast.error('Identfiant ou mot de passe incorrect')
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: 'Identifiant ou mot de passe incorrect'
        }
      })
    }
  },

  register: async (userInfos, artisanInfos) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const result = await registerApi(userInfos, artisanInfos)
      if (result.user && result.jwt) {
        dispatch({
          type: actionTypes.REGISTER,
          data: {
            user: result.user,
            jwt: result.jwt
          }
        })
      } else {
        throw new Error('Registration incomplete: Missing user or JWT data.')
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || 'Erreur lors de la création du compte'
      toast.error(errorMessage)
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: errorMessage
        }
      })
    }
  },

  updateUserInfo: async (userInfo, jwt, userId) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      const response = await updateUserInfoApi(userInfo, jwt, userId)
      dispatch({
        type: actionTypes.UPDATE_USER_INFO,
        data: response

      })

      toast.success('Vos informations ont été mises à jour avec succès.')
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message
      toast.error('Une erreur s\'est produite lors de la mise à jour de vos informations.' + errorMessage)
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: errorMessage
        }
      })
    }
  },

  deleteAccount: async (userId, jwt) => {
    dispatch({ type: actionTypes.LOADING })
    try {
      await deleteAccountApi(userId, jwt)
      dispatch({ type: actionTypes.DELETE_ACCOUNT })
      toast.success('Account successfully deleted.')
      // Optionally navigate the user to a login or home page
    } catch (error) {
      toast.error('Failed to delete account: ' + error.message)
      dispatch({
        type: actionTypes.ERROR,
        data: {
          error: error.message
        }
      })
    }
  },

  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  }

})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState

  const [state, dispatch] = useReducer(authReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...authFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>')
  return context
}

export {
  AuthProvider,
  useAuth
}
