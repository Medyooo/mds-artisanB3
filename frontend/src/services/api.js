import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

/**
 * Call API Login route
 * @param {object} credentials { identifier, password }
 * @return {object} { jwt, user }
 */
const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/local', credentials)
  return response?.data
}

/**
 * Call API Register route
 * @param {object} userInfos { firstName, lastName, phoneNumber, email, password }
 * @return {object} { jwt, user }
 */
const registerApi = async (userInfos, artisanData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  const userData = new FormData()
  for (const key in userInfos) {
    userData.append(key, userInfos[key])
  }

  try {
    const userResponse = await axiosInstance.post('/auth/local/register', userData, config)

    if (artisanData && userResponse?.data?.user?.id) {
      const artisanFormData = new FormData()
      artisanFormData.append('data', JSON.stringify({
        name: artisanData.name,
        description: artisanData.description,
        user: userResponse.data.user.id
      }))

      if (artisanData.profilePicture) {
        artisanFormData.append('files.profilePicture', artisanData.profilePicture, artisanData.profilePicture.name)
      }

      const artisanConfig = {
        headers: {
          Authorization: `Bearer ${userResponse.data.jwt}`,
          'Content-Type': 'multipart/form-data'
        }
      }

      await axiosInstance.post('/artisans', artisanFormData, artisanConfig)
      console.log('Artisan registration successful')
    }

    return userResponse?.data
  } catch (error) {
    console.error('Registration API error:', error.response || error)
    throw error
  }
}

/**
 * Call API to update user information
 * @param {object} userInfo { firstName, lastName, etc. }
 * @param {string} userId L'ID de l'utilisateur à mettre à jour
 * @param {string} jwt Le token JWT pour l'authentification de la requête
 * @return {object} { jwt, user }
 */
const updateUserInfoApi = async (userInfo, userId, jwt) => {
  const response = await axiosInstance.put(`/users/${userId}`, userInfo, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json'

    }
  })
  return response.data
}

const deleteAccountApi = async (userId, jwt) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'

      }
    })
    return response.data
  } catch (error) {
    // Gérer les erreurs ici
    throw new Error('Une erreur s\'est produite lors de la suppression du compte utilisateur.')
  }
}

const addProductApi = async (formData, jwt) => {
  return await axiosInstance.post('/products', formData, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
}

const updateProductApi = async (productId, product) => {
  return await axiosInstance.put(`/products/${productId}`, product)
}
const deleteProductApi = async (productId, jwt) => {
  const response = await axiosInstance.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  return response?.data
}

export {
  loginApi,
  registerApi,
  updateUserInfoApi,
  addProductApi,
  updateProductApi,
  deleteAccountApi,
  deleteProductApi

}
