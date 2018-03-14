const getAuthClient = require('./lib/authentication')
const ChannelManager = require('./lib/ChannelManager')


console.log('Get Auth Client...')

getAuthClient()
  .then((oauth2Client) => {
    console.log('Got Auth Client.')
    console.log('Get Channel Info...')
    return (new ChannelManager(oauth2Client)).getChannelInfo()
  })
  .then((channels) => {
    console.log('Successfully loaded channel info:')
    console.log(channels)
  })
  .catch((error) => {
    console.log('Error while getting channel info:', error)
  })