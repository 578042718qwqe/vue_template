import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/test2/list',
    method: 'get',
    params: {}
  })
}

