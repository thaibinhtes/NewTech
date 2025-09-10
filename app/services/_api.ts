import axios from 'axios'

export default function useApiClient() {
  const config = useRuntimeConfig()

  const apiClient = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return apiClient
}
