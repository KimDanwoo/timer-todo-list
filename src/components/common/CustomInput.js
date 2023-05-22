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
  $input.value = value
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

  $input.addEventListener('change', (e) => {
    onChange(e)
  })

  this.render()
}
