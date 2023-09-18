import { useToast } from 'balm-ui/plugins/toast'

import { createFetch } from '@vueuse/core'
import type { SearchData, ToastOptions } from '@/types'
import i18n from '@/locale'

const CODEMESSAGE: SearchData = {
  400: i18n.global.t('httpErrorStatus.400'),
  401: i18n.global.t('httpErrorStatus.401'),
  403: i18n.global.t('httpErrorStatus.403'),
  404: i18n.global.t('httpErrorStatus.404'),
  406: i18n.global.t('httpErrorStatus.406'),
  410: i18n.global.t('httpErrorStatus.410'),
  500: i18n.global.t('httpErrorStatus.500'),
  502: i18n.global.t('httpErrorStatus.502'),
  503: i18n.global.t('httpErrorStatus.503'),
  504: i18n.global.t('httpErrorStatus.504'),
}

const $toast = useToast()
const errorToastOptions = reactive<ToastOptions>({
  message: '请求失败!',
  position: 'top',
  timeoutMs: 2000,
  className: 'toast-error',
})

const BASE_URL = `${window.g.protocol}://${window.g.address}:${window.g.port}`

const TIME_OUT = +`${window.g.timeout}`

const $fetch = createFetch({
  // baseUrl: BASE_URL,
  options: {
    timeout: TIME_OUT,
    refetch: true,
    beforeFetch({ options, cancel }) {
      // const myToken = localStorage.getItem('aiumsToken')
      // if (!myToken) {
      //   errorToastOptions.message = 'token not found' || ''
      //   $toast(errorToastOptions)
      //
      //   cancel()
      // }
      // if (myToken) {
      //   options.headers = {
      //     ...options.headers,
      //     Authorization: `Bearer ${myToken}`,
      //   }
      // }
      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

export default $fetch
