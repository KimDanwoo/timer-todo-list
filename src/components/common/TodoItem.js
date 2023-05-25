import Button from './Button'
import CustomInput from './CustomInput'

export default function TodoItem({
  todo,
  handleClickDone,
  value,
  isChangeItem,
  handleClickRestoreTodo,
  handleClickChangeTodoItem,
  handleChangeTodoItem,
}) {
  const $todoItem = document.createElement('li')
  $todoItem.classList.add('todo_item')
  $todoItem.setAttribute('data-parent', `${todo.id}`)

  const isChangeMode = () => {
    const changeValue = {
      title: todo.title,
      time: todo.time,
    }
    const handleChangeValue = (e) => {
      const { name, value } = e.target
      changeValue[name] = value
    }
    const createInput = ({ title, type, value }) => {
      return new CustomInput({
        $target: $todoItem,
        title: title,
        name: value,
        type: type,
        value: changeValue[value],
        onChange: handleChangeValue,
      })
    }

    createInput({ title: '할 일', value: 'title', type: 'text' })
    createInput({ title: '종료 시간(초)', value: 'time', type: 'number' })

    new Button({
      $target: $todoItem,
      initialState: { text: '저장' },
      type: 'button',
      onClick: () => handleChangeTodoItem(todo, changeValue),
    })
  }

  const activeTodoList = () => {
    const $timerSpan = document.createElement('span')
    $timerSpan.setAttribute('data-id', todo.id)
    const timerValue = value < 1 || todo.item < 1 ? 1 : value ?? todo.time
    $timerSpan.innerText = `${timerValue}초`

    const $checkbox = document.createElement('input')
    $checkbox.setAttribute('type', 'checkbox')
    $checkbox.classList.add('todo-checkbox')
    $checkbox.id = todo.id
    if (todo.checked) {
      $checkbox.setAttribute('checked', '')
    }
    const $title = document.createElement('p')
    $title.innerText = todo.title

    const $label = document.createElement('label')
    $label.setAttribute('for', todo.id)
    $label.append($title, $timerSpan)

    const createButton = (title, handleClick) => {
      const $button = document.createElement('button')
      $button.setAttribute('type', 'button')
      $button.setAttribute('aria-label', `항목 ${title}`)
      $button.setAttribute('title', `항목 ${title}`)
      $button.innerText = title
      $button.addEventListener('click', (e) => {
        e.preventDefault()
        handleClick(todo)
      })

      return $button
    }

    const $doneButton = createButton('종료', handleClickDone)
    const $changeButton = createButton('수정', handleClickChangeTodoItem)

    if (isChangeItem) {
      $changeButton.disabled = true
      $changeButton.setAttribute('aria-pressed', false)
    } else {
      $changeButton.setAttribute('aria-pressed', true)
    }

    $todoItem.append($checkbox, $label, $changeButton, $doneButton)
  }

  const doneTodoList = () => {
    const $doneSpan = document.createElement('span')
    $doneSpan.innerText = `${todo.time}초`
    const $title = document.createElement('p')
    $title.innerText = todo.title
    const $restoreBtn = document.createElement('button')
    $restoreBtn.setAttribute('aria-label', '항목 복원')
    $restoreBtn.setAttribute('title', '항목 복원')
    $restoreBtn.innerText = '복원'
    if (handleClickRestoreTodo) {
      $restoreBtn.addEventListener('click', (e) => {
        e.preventDefault()
        handleClickRestoreTodo(todo)
      })
    }
    $todoItem.append($title, $doneSpan, $restoreBtn)
  }

  this.render = () => {
    if (todo.isChange) {
      isChangeMode()
    }
    if (!todo.isEnd && !todo.isChange) {
      activeTodoList()
    }
    if (todo.isEnd && !todo.isChange) {
      doneTodoList()
    }
  }

  this.render()
  return $todoItem
}
