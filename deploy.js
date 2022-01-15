/* eslint-disable no-console */
/* eslint-disable no-undef */
const fs = require("fs")
const FtpClient = require("ftp")
const glob = require("glob")

const basePath = "./build"
const destinationPath = "/htdocs"
const config = {
  host: process.env.FTP_HOST,
  password: process.env.FTP_PASSWORD,
  user: process.env.FTP_USER,
}
const EXPIRATION_DATE_IN_DAYS = process.env.EXPIRATION_DATE_IN_DAYS || 31

const ftpClient = new FtpClient()

ftpClient.on("ready", () => {
  cleanupRemoteDirectory(destinationPath)

  glob.sync(`${basePath}/**/*`).forEach(handlePath)
})

ftpClient.connect(config)

function cleanupRemoteDirectory(directory) {
  return ftpClient.list(directory, (error, pathObjects) => {
    if (error) throw error

    pathObjects.forEach((pathObject) => cleanup(pathObject, directory))
    ftpClient.end()
  })
}

function handlePath(path) {
  const relativeFile = path.replace(`${basePath}/`, "")
  const destination = `${destinationPath}/${relativeFile}`

  if (fs.lstatSync(path).isDirectory()) {
    return createDirectory(destination)
  }

  return uploadFile(path, destination)
}

function createDirectory(destination) {
  return ftpClient.mkdir(destination, true, (error) => {
    if (error) throw error

    ftpClient.end()
  })
}

function cleanup(pathObject, directory) {
  if (pathObject.name === "." || pathObject.name === "..") return

  const path = `${directory}/${pathObject.name}`

  if (pathObject.type === "d") {
    return cleanupRemoteDirectory(path)
  }

  if (isExpired(pathObject.date)) {
    ftpClient.delete(path, (error) => {
      if (error) throw error

      console.log(`Removed: ${path}`)
      ftpClient.end()
    })
  }
}

function isExpired(date) {
  const oneDayInMilliseconds = 86400000
  const timestamp = new Date(date).getTime()
  const expirationTimestamp =
    Date.now() - oneDayInMilliseconds * EXPIRATION_DATE_IN_DAYS

  return timestamp < expirationTimestamp
}

function uploadFile(file, destination) {
  ftpClient.put(file, destination, (error) => {
    if (error) throw error

    console.log(`${file} => ${destination}`)
    ftpClient.end()
  })
}
