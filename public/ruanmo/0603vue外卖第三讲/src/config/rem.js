+function () {
  function reSize () {
    var baseFont = 100 // 100px 1rem // 可以改变的  100是为了便于计算
    var designWidth = 750 // 7.5rem
    var width = window.innerWidth
    var currentWidth = (width / designWidth) * baseFont
    document.querySelector('html').style.fontSize = currentWidth + 'px'

  }
  window.addEventListener('resize', reSize)
  document.addEventListener('DOMContentLoaded', reSize)
}()