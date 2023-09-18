import http from '@/http'

/**
 * 重点点位管理清单列表
 * @param params
 */
export const getTableData = (params?: any) => http.get('/table/data', {params})
