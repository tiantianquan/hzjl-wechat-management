import axios from 'axios'
class Common {
  // static url = '/getDefaultData'
  // static urlPrex = 'http://localhost:9999/'
  // static urlPrex = 'http://www.reegle.cn/'
  // static urlPrex = 'http://wx.jjhz-tj.gov.cn/'

  static urlPrex = '/'

  static async getList() {
    var url = `api/${this.apiTo}/`
    var res = await axios.get(this.urlPrex + url)
    return res.data
  }

  static async get(id) {
    var url = `api/${this.apiTo}/Details/${id}`
    var res = await axios.get(this.urlPrex + url)
    return res.data
  }

  static async update(data) {
    var url = `api/${this.apiTo}/Edit`
    var res = await axios.post(this.urlPrex + url, data)
    return res.data
  }

  static async add(data) {
    var url = `api/${this.apiTo}/Create`
    var res = await axios.post(this.urlPrex + url, data)
    return res.data
  }

  static async delete(id) {
    var url = `api/${this.apiTo}/Delete`
    var res = await axios.post(this.urlPrex + url, {
      id
    })
    return res.data
  }
}

export default Common