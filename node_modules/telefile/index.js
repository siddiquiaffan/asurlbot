const fs = require('fs')
const { Stream } = require('stream')
const fetch = require('node-fetch')
const FormData = require('form-data')

module.exports = src => {
  if (!src) throw new Error('Missing param')
  if (typeof src === 'string') return uploadByFilename(src)
  switch (true) {
    case !!src.filename: return uploadByFilename(src.filename)
    case !!src.url: return uploadByUrl(src.url)
    case !!src.stream: return uploadByStream(src.stream)
    default: throw new Error('Unknown param')
  }
}

function uploadByFilename(filename) {
  if (!fs.existsSync(filename)) throw new Error(`File not found: "${filename}"`)
  return uploadByStream(fs.createReadStream(filename))
}

function uploadByUrl (url) {
  return fetch(url).then(res => uploadByStream(res.body))
}

function uploadByStream (downloadStream) {
  if (!(downloadStream instanceof Stream)) throw new TypeError('Param is not a stream')
  const form = new FormData()
  form.append('file', downloadStream, 'blob')

  return fetch('https://telegra.ph/upload', {
    method: 'POST',
    headers: { 'Transfer-Encoding': 'chunked' },
    body: form
  })
    .then(res => res.json())
    .then(json => {
      if (json.error) throw json.error
      if (json[0] && json[0].src) return `https://telegra.ph${json[0].src}`
      throw new Error('Unrecognized response')
    })
}
