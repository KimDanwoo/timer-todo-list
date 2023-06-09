export default function Heading({ $target, title, size }) {
  const $heading = document.createElement(size)
  $heading.textContent = title

  this.setState = () => {
    this.render()
  }

  this.render = () => {
    $target.append($heading)
  }
  this.render()
}
