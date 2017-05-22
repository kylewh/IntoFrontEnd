document.onreadystatechange = function () {
  switch (document.readyState) {
    case 'loading':
      break
    case 'interactive':
      console.log('DOMContentLoaded --- readyState: interactive')
      break
    case 'complete':
      console.log('document loaded --- readyState: complete')
      break
    default:
      return
  }
}
window.onload = () => {
  console.log('document loaded --- load Event')
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded --- DOMContentLoaded Event')
})

