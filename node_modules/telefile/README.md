# telefile

Uploading media files to [telegra.ph](https://telegra.ph)

## Install

```sh
npm i telefile
```

## Usage

Always returns promise with link to media file like `https://telegra.ph/file/hash.jpg`

### Common

NOTE: Just specify the file name

```js
const link = await telefile('cat.jpg')
console.log(link)
```

### Custom

Specify other type of source via object

#### file name

```js
telefile({ source: 'kitten.jpg' })
```

#### url

```js
telefile({ url: 'https://placekitten.com/300/200' })
```

#### stream

```js
telefile({ stream: fs.createReadStream('kitten.jpg') })
```
