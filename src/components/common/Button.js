export default function Button({
  $target,
  initialState = {
    text: '',
    sortType,
    disabled,
  },
  type = 'button',
  title,
  onClick = () => {},
  disabled,
}) {
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  const $buttonContainer = document.createElement('button')
  $buttonContainer.classList.add('button_container')
  $buttonContainer.type = type
  $buttonContainer.setAttribute('aria-label', title)
  $buttonContainer.setAttribute('title', title)

  this.render = () => {
    const { text, sortType } = this.state
    if (this.state.disabled) {
      $buttonContainer.disabled = 'disabled'
      $buttonContainer.setAttribute('aria-pressed', false)
    } else {
      $buttonContainer.disabled = false
      $buttonContainer.setAttribute('aria-pressed', true)
    }

    $buttonContainer.innerHTML = /*html*/ `
      <span >
        ${text}
      </span>
    `
    if (sortType === text) {
      $buttonContainer.classList.add('active')
    } else {
      $buttonContainer.classList.remove('active')
    }
    $target.appendChild($buttonContainer)
  }

  $buttonContainer.addEventListener('click', (e) => {
    e.preventDefault()
    onClick()
  })

  this.render()
}
