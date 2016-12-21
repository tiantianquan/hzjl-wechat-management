import Common from './common.api'
import axios from 'axios'

class News extends Common {
  static apiTo = 'News'

  static async getListByParams(params) {
    var url = `api/${this.apiTo}/`
    var res = await axios.post(
      this.urlPrex + url, params)
    return res.data
  }
}

export default News