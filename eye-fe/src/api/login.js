import request from '@/utils/request'

export function loginByUsername(usercode, password) {
  const data = {
    usercode,
    password
  }
  return request({
    url: '/admin/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/admin/login/getUserInfo',
    method: 'post',
    params: { token: token }
  })
}

