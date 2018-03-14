const fs = require('fs')
const { google } = require('googleapis')

class VideoUploader {

  constructor(auth) {
    this.auth = auth
  }

  insertVideo(requestData) {
    var service = google.youtube('v3')
    var parameters = requestData.params
    parameters.auth = this.auth
    parameters.media = {
      body: fs.createReadStream(requestData.mediaFilename)
    }
    parameters.notifySubscribers = false
    parameters.resource = this.createResource(requestData.properties)
  
    console.log('Insert Video with the following resource parameteres:')
    console.log(parameters.resource)

    return new Promise((resolve, reject) => {
      var req = service.videos.insert(parameters, function(err, resource) {
        if (err) {
          reject(err);
        }
        if (resource) {
          resolve(resource)
        }
      })
    })
  
    /**
    var fileSize = fs.statSync(requestData['mediaFilename']).size;
    // show some progress
    var id = setInterval(function () {
      var uploadedBytes = req.req.connection._bytesDispatched;
      var uploadedMBytes = uploadedBytes / 1000000;
      var progress = uploadedBytes > fileSize
          ? 100 : (uploadedBytes / fileSize) * 100;
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(uploadedMBytes.toFixed(2) + ' MBs uploaded. ' +
         progress.toFixed(2) + '% completed.');
      if (progress === 100) {
        process.stdout.write('Done uploading, waiting for response...');
        clearInterval(id);
      }
    }, 250);
     */
  }

  createResource(properties) {
    var resource = {}
    var normalizedProps = properties
    for (var p in properties) {
      var value = properties[p]
      if (p && p.substr(-2, 2) == '[]') {
        var adjustedName = p.replace('[]', '')
        if (value) {
          normalizedProps[adjustedName] = value.split(',')
        }
        delete normalizedProps[p]
      }
    }
    for (var p in normalizedProps) {
      // Leave properties that don't have values out of inserted resource.
      if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
        var propArray = p.split('.')
        var ref = resource
        for (var pa = 0; pa < propArray.length; pa++) {
          var key = propArray[pa]
          if (pa == propArray.length - 1) {
            ref[key] = normalizedProps[p]
          } else {
            ref = ref[key] = ref[key] || {}
          }
        }
      };
    }
    return resource
  }
}

module.exports = VideoUploader
