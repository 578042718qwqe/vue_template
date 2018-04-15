

import request from '@/utils/request'


export function fetchList() {
  return request({
    url: '/admin/mgr/list',
    method: 'post'
  })
}

