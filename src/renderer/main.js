window.addEventListener('load', () => {
  addImagesEvent()
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
