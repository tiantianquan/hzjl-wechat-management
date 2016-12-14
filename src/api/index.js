import axios from 'axios'

class Api {
  // static url = '/getDefaultData'
  // static urlPrex = 'http://localhost:9999/'
  // static urlPrex = 'http://www.reegle.cn/'
  // static urlPrex = 'http://wx.jjhz-tj.gov.cn/'
  static urlPrex = '/'

  static async getWechatAccountList() {
    var url = 'api/WxAccount/'
    var res = await axios.get(this.urlPrex + url)
    return res.data
  }

  static async getWechatAccount(id) {
    var url = `api/WxAccount/Details/${id}`
    var res = await axios.get(this.urlPrex + url)
    return res.data
  }

  static async updateWechatAccount(data) {
    var url = `api/WxAccount/Edit`
    var res = await axios.post(this.urlPrex + url,data)
    return res.data
  }
}

export default Api