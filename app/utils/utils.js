import axios from 'axios'

// helper function: generate a new file from base64 String
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}

// generate file from base64 string
const file = dataURLtoFile('data:image/png;base64,iVBORw0KGgoAAAANSUhEU...')
// put file into form data
const data = new FormData()
data.append('img', file, file.name)

// now upload
const config = {
  headers: { 'Content-Type': 'multipart/form-data' }
}
axios.post('/path/to/upload', data, config).then(response => {
  console.log(response.data)
})
