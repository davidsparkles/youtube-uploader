const requestData = require('./input/requestData')
const getAuthClient = require('./lib/authentication')
const VideoUploader = require('./lib/VideoUploader')
const _ = require('lodash')

getAuthClient()
  .then((oauth2Client) => {
    return (new VideoUploader(oauth2Client)).insertVideo(requestData)
  })
  .then((resource) => {
    console.log('Successfully uploaded Video. Resource:')
    console.log(_.pick(resource, ['status', 'statusText', 'data']))
  })
  .catch((error) => {
    console.log('Error while uploading video:', error)
  })
