import url from 'url'
import path from 'path'
import applyFilter from './filters'

window.addEventListener('load', () => {
  addImagesEvent()
  searchImagesEvent()
  selectEvent()
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
  if (node) {
    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

function searchImagesEvent () {
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', function () {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')
    if (this.value.length > 0) {
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
      const hiddenThumbs = document.querySelectorAll('li.hidden')
      hiddenThumbs.forEach(hiddenThumb => {
        hiddenThumb.classList.remove('hidden')
      })
    }
  })
}

function selectFirstImage () {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}

function selectEvent () {
  const select = document.getElementById('filters')
  select.addEventListener('change', function () {
    applyFilter(this.value, document.getElementById('image-displayed'))
  })
}
