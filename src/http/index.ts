import JSONbig from 'json-bigint'
import {ref} from "vue";
import type {ToastOptions} from '@/types/types';
import axios from "axios";

export interface HttpResponse<T = unknown> {
    status: number
    msg?: string
    code?: number
    data: T
}


const errorToastOptions = ref<ToastOptions>({
    message: '请求失败!',
    position: 'top',
    timeoutMs: 2000,
    className: 'toast-error',
})

const BASE_URL = `${window.g.protocol}://${window.g.address}:${window.g.port}`
console.log(window, '1212');
// const TIME_OUT = +`${window.g.timeout}`
const http = axios.create({
    baseURL: BASE_URL,
    // baseURL: '/api',
    // baseURL: '',
    timeout: 15000,
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return JSONbig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data,
            }
        }
    }],
})
http.interceptors.request.use(
    (config) => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        let token = ''
        if (localStorage.getItem('aiumsToken'))
            token = `Bearer ${localStorage.getItem('aiumsToken')!}`
        token && (config.headers.Authorization = token)
        return config
    },
    (error) => {
        // do something
        return Promise.reject(error)
    },
)
// add response interceptors
http.interceptors.response.use(
    (response: any) => {
        if (response.data.code !== 200)
            // errorToastOptions.message = response.data.msg || ''
            console.log('interceptors: ', response)
        return response
    },
    (error) => {
        const {response} = error
        console.log('response in axios :', response)
        // errorToastOptions.message = CODEMESSAGE[response.status] || response.statusText || response.message
        // $toast(errorToastOptions)
        // return Promise.reject(error)
    },
)
export default http
