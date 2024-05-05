// AccountContext.js

import React, { createContext, useContext } from 'react'
import { deleteAccountApi } from '../services/api'
import { useAuth } from './authContext'

const AccountContext = createContext()

const AccountProvider = ({ children }) => {
  const { state: { user, jwt }, logout } = useAuth()

  const deleteAccount = async () => {
    try {
      await deleteAccountApi(user.id, jwt)
      logout() // Déconnecte l'utilisateur après avoir supprimé son compte
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Error deleting account:', error)
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  }

  return (
    <AccountContext.Provider value={{ deleteAccount }}>
      {children}
    </AccountContext.Provider>
  )
}

const useAccount = () => {
  const context = useContext(AccountContext)
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider')
  }
  return context
}

export { AccountProvider, useAccount }
