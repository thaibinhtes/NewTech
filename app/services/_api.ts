import axios from 'axios'

export default function useApiClient() {
  const config = useRuntimeConfig()

  const apiClient = axios.create({
    baseURL: import.meta.env.NUXT_PUBLIC_API_BASE,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return apiClient
}
