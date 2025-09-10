// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/image', "@nuxtjs/tailwindcss", '@pinia/nuxt', 'nuxt-toast'],

  imports: {
    dirs: ['stores']
  },

  runtimeConfig: {
    apiSecret: import.meta.env.NUXT_API_SECRET_KEY,
    public: {
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/variables/colors" as *;
          `,
        },
      },
    }
  }
})