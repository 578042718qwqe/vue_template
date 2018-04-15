import request from '@/utils/request'

function saveOne(model) {

  return request({
    url: '/admin/auth/user-manager/saveOne',
    method: 'post',
    params: model
  })
}

export default {
  saveOne: saveOne
}


























