const { google } = require('googleapis')

class ChannelManager {

  constructor(auth) {
    this.auth = auth
  }

  getChannelInfo() {
    const service = google.youtube('v3')
    return new Promise((resolve, reject) => {
      const parameters = {
        auth: this.auth,
        part: 'snippet,contentDetails,statistics',
        mine: true
      }
      const callback = (err, response) => {
        if (err) {
          reject(err)
        } else {
          var channels = response.data.items
          resolve(channels)
        }
      }
      service.channels.list(parameters, callback)
    })
  }

  getCategoriesList() {
    const service = google.youtube('v3')
    return new Promise((resolve, reject) => {
      const parameters = {
        auth: this.auth,
        part: 'snippet',
        regionCode: 'DE'
      }
      const callback = (err, response) => {
        if (err) {
          reject(err)
        } else {
          var channels = response.data.items
          resolve(channels)
        }
      }
      service.videoCategories.list(parameters, callback)
    })
  }
}

module.exports = ChannelManager
