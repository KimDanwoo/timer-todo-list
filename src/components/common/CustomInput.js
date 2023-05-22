export default function CustomInput({
  $target,
  title,
  name,
  value,
  type,
  onChange,
}) {
  this.state = { name, value }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const $div = document.createElement('div')
  const $label = document.createElement('label')
  const $inner = document.createElement('div')
  const $inputContainer = document.createElement('div')
  const $input = document.createElement('input')
  const $span = document.createElement('span')
  $div.classList.add('input_container')
  $inner.classList.add('inner')
  $inputContainer.classList.add('input')
  $div.append($label)
  $label.append($inner)
  $inner.append($inputContainer)
  $inputContainer.append($span)
  $input.name = name
  $input.value = !value ? '' : value
  $input.type = type
  $span.innerHTML = `${title}*`
  $input.placeholder = `${title}을 입력해주세요`

  this.render = () => {
    $inputContainer.append($input)
    $target.append($div)
    if (type === 'text') {
      $input.focus()
    }
  }

  if (type === 'number') {
    $input.addEventListener('keydown', (e) => {
      var key = e.key

      // 한글 Unicode 범위: AC00-D7A3
      if (
        (key >= '\uAC00' && key <= '\uD7A3') ||
        (key >= '\u3131' && key <= '\u318E')
      ) {
        e.preventDefault()
      }
    })
  }

  $input.addEventListener('change', (e) => {
    onChange(e)
  })

  this.render()
}
