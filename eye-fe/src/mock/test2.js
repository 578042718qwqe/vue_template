// import Mock from 'mockjs'

export default{
  getList: config => {
    console.log(config)
    return { rows: [
      { id: 1, code: 'a1', name: 'n1', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' },
      { id: 2, code: 'a2', name: 'n2', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' },
      { id: 3, code: 'a3', name: 'n3', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' },
      { id: 4, code: 'a4', name: 'n4', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' },
      { id: 5, code: 'a5', name: 'n5', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' },
      { id: 6, code: 'a6', name: 'n6', img: 'http://pic36.photophoto.cn/20150715/0007020080742327_b.jpg' }
    ], total: 10 }
  }
}












