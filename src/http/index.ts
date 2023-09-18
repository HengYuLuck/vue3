import {useToast} from 'balm-ui/plugins/toast'
import {ref} from "vue";
import axios from "axios";
import type {ToastOptions} from "@/types/types";

export interface HttpResponse<T = unknown> {
    status: number
    msg?: string
    code?: number
    data: T
}


const $toast = useToast()
const errorToastOptions = ref<ToastOptions>({
    message: '请求失败!',
    position: 'top',
    timeoutMs: 2000,
    className: 'toast-error',
})

const BASE_URL = `${window.g.protocol}://${window.g.address}:${window.g.port}`

const TIME_OUT = +`${window.g.timeout}`
const http = axios.create({
    baseURL: BASE_URL,
    // baseURL: 'api',
    timeout: TIME_OUT,
})

// http.interceptors.request.use(
//     (config) => {
//         // 登录流程控制中，根据本地是否存在token判断用户的登录情况
//         // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//         // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//         // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
//         let token = ''
//         if (localStorage.getItem('portalToken'))
//             token = localStorage.getItem('portalToken')!
//
//         token && (config.headers.Authorization = `Bearer ${token}`)
//         return config
//     },
//     (error) => {
//         // do something
//         return Promise.reject(error)
//     },
// )
// add response interceptors
http.interceptors.response.use(
    (response: any) => {
        if (response.status !== 200) {
            errorToastOptions.message = response.data.msg || ''
            $toast(errorToastOptions)
        }
        return response
    },
    (error) => {
        const {response} = error
        if (response.status === 401) {
            // try {
            //     localStorage.removeItem('portalToken')
            //     setTimeout(() => {
            //         router.replace('/login')
            //     }, 3000)
            // } catch {
            //     console.error('err: ', response)
            // }
        }
        errorToastOptions.message = response.statusText
        $toast(errorToastOptions)
        return Promise.reject(error)
    },
)
export default http
