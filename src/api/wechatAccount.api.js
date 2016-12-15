import Common from './common.api'

class WechatAccount extends Common {
  static apiTo = 'WxAccount'

  // static async getList() {
  //   var url = 'api/WxAccount/'
  //   var res = await axios.get(this.urlPrex + url)
  //   return res.data
  // }

  // static async get(id) {
  //   var url = `api/WxAccount/Details/${id}`
  //   var res = await axios.get(this.urlPrex + url)
  //   return res.data
  // }

  // static async update(data) {
  //   var url = `api/WxAccount/Edit`
  //   var res = await axios.post(this.urlPrex + url, data)
  //   return res.data
  // }

  // static async add(data) {
  //   var url = `api/WxAccount/Create`
  //   var res = await axios.post(this.urlPrex + url, data)
  //   return res.data
  // }

  // static async delete(id){
  //   var url = `api/WxAccount/Delete`
  //   var res = await axios.post(this.urlPrex + url, {id})
  //   return res.data
  // }
}

export default WechatAccount