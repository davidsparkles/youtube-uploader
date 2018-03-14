const getAuthClient = require('./lib/authentication')
const ChannelManager = require('./lib/ChannelManager')

const service = google.youtube('v3')

getAuthClient()
  .then((oauth2Client) => {
    return (new ChannelManager(oauth2Client)).getCategoriesList()
  })
  .then((categories) => {
    console.log('Successfully loaded categories:')
    console.log(categories)
  })
  .catch((error) => {
    console.log('Error while getting categories:', error)
  })