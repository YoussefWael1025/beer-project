// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@vee-validate/nuxt','@nuxtjs/tailwindcss','nuxt-primevue','@pinia/nuxt'],
  primevue: {
    usePrimeVue:true,
    components: {
      include:['Paginator','Dialog','Skeleton','InputText','Sidebar','Button','DataTable','Column','Dropdown','Breadcrumb','RadioButton','InputMask','Checkbox','Accordion','AccordionTab','Toast']
    }
  },
  plugins:[{src: './plugins/cart-watcher.js', mode: 'client'}],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  css: ['primevue/resources/themes/saga-blue/theme.css','primeicons/primeicons.css']
  
})
