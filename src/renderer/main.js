import url from 'url'
import path from 'path'

window.addEventListener('load', () => {
  addImagesEvent()
  searchImagesEvent()
})

function addImagesEvent () {
  const thumbs = document.querySelectorAll('li.list-group-item')

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      changeImage(this)
    })
  })
}

function changeImage (node) {
  document.querySelector('li.selected').classList.remove('selected')
  node.classList.add('selected')
  document.getElementById('image-displayed').src = node.querySelector('img').src
}

function searchImagesEvent () {
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')
    if (this.value > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img')
      thumbs.forEach(thumb => {
        const fileURL = url.parse(thumb.src)
        const fileName = path.basename(fileURL.pathname)
        if (fileName.match(regex)) {
          thumb.parentNode.classList.remove('hidden')
        } else {
          thumb.parentNode.classList.add('hidden')
        }
      })
      selectFirstImage()
    } else {
      const thumbs = document.querySelectorAll('li.list-group-item img')
      thumbs.forEach(thumb => {
        thumb.parentNode.classList.remove('hidden')
      })
    }
  })
}

function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
