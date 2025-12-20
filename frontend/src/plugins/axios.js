import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log(`[REQUEST] ${config.method.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data
    })

    return config
  },
  (error) => {
    console.error('[REQUEST ERROR]', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[RESPONSE] ${response.status} ${response.config.url}`, response.data)
    return response.data
  },
  (error) => {
    if (error.response) {
      console.error('[RESPONSE ERROR]', error.response.status, error.response.data)

      if (error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    } else if (error.request) {
      console.error('[NO RESPONSE]', error.request)
    } else {
      console.error('[ERROR]', error.message)
    }

    return Promise.reject(error)
  }
)

const testConnection = async () => {
  try {
    const response = await apiClient.get('/health')
    console.log('Backend tersedia:', response)
    return true
  } catch (err) {
    console.warn('Backend tidak tersedia di', BASE_URL)
    return false
  }
}

testConnection()

export default apiClient