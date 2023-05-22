import Button from './Button'
import CustomInput from './CustomInput'
import Heading from './Heading'

export default function TodoForm({
  $target,
  initialState,
  handleClickAddTodo,
  handleChangeTodoInput,
}) {
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  const $article = document.createElement('article')
  const $form = document.createElement('form')
  $article.classList.add('form_container')

  const handleSubmit = () => {
    handleClickAddTodo(this.state)
    this.setState({ title: '', time: 0 })
    const $inputs = Array.from($form.querySelectorAll('input'))
    $inputs.forEach(($input) => {
      $input.value = null
    })
  }

  new Heading({
    $target: $target,
    title: '할 일 만들기',
    size: 'h3',
  })

  const writeInput = new CustomInput({
    $target: $form,
    title: '할 일',
    name: 'title',
    type: 'text',
    value: this.state.input.title,
    onChange: handleChangeTodoInput,
  })
  const timerInput = new CustomInput({
    $target: $form,
    title: '종료 시간(초)',
    name: 'time',
    type: 'number',
    value: this.state.input.time,
    onChange: handleChangeTodoInput,
  })

  const button = new Button({
    $target: $form,
    initialState: { text: '추가' },
    type: 'submit',
    title: '할일 및 종료시간 추가',
    onClick: handleSubmit,
  })

  this.render = () => {
    writeInput.render()
    timerInput.render()
    const isDisabled = this.state.input?.time === 0 || !this.state.input?.title
    button.setState({
      text: '추가',
      disabled: isDisabled,
    })
    $article.append($form)
    $target.append($article)
  }
  this.render()

  $form.addEventListener('submit', handleSubmit)
}
