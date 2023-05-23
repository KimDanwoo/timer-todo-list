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
    new CustomInput({
      $target: $todoItem,
      title: '할 일',
      name: 'title',
      type: 'text',
      value: changeValue.title,
      onChange: handleChangeValue,
    })
    new CustomInput({
      $target: $todoItem,
      title: '종료 시간(초)',
      name: 'time',
      type: 'number',
      value: changeValue.time,
      onChange: handleChangeValue,
    })
    new Button({
      $target: $todoItem,
      initialState: { text: '저장' },
      type: 'button',
      onClick: () => handleChangeTodoItem(todo, changeValue),
    })
  }

  const activeTodoList = () => {
    const $timerSpan = document.createElement('span')
    $timerSpan.setAttribute('data-time', todo.time)
    $timerSpan.setAttribute('data-id', todo.id)
    if (value < 1 || todo.item < 1) {
      $timerSpan.innerText = `${1}초`
    } else {
      $timerSpan.innerText = `${value ?? todo.time}초`
    }
    const $checkbox = todo.isEnd ? '' : document.createElement('input')
    if ($checkbox) {
      $checkbox.setAttribute('type', 'checkbox')
      $checkbox.classList.add('todo-checkbox')
      $checkbox.id = todo.id
      if (todo.checked) {
        $checkbox.setAttribute('checked', '')
      }
    }
    const $title = document.createElement('p')
    $title.innerText = todo.title
    $todoItem.append($checkbox, $title)
    const $button = document.createElement('button')
    const $changeBtn = document.createElement('button')
    $button.setAttribute('type', 'button')
    $changeBtn.setAttribute('type', 'button')
    $button.setAttribute('aria-label', '항목 종료')
    $changeBtn.setAttribute('aria-label', '항목 수정')
    $button.setAttribute('title', '항목 종료')
    $changeBtn.setAttribute('title', '항목 수정')
    $button.innerText = '종료'
    $changeBtn.innerText = '수정'
    if (isChangeItem) {
      $changeBtn.disabled = true
      $changeBtn.setAttribute('aria-pressed', false)
    } else {
      $changeBtn.setAttribute('aria-pressed', true)
    }
    $todoItem.append($timerSpan)
    $todoItem.append($changeBtn)
    $todoItem.append($button)
    $button.addEventListener('click', (e) => {
      e.preventDefault()
      handleClickDone(todo)
    })
    $changeBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleClickChangeTodoItem(todo)
    })
  }

  const doneTodoList = () => {
    const $doneSpan = document.createElement('span')
    const $title = document.createElement('p')
    $title.innerText = todo.title
    const $restoreBtn = document.createElement('button')
    $restoreBtn.setAttribute('aria-label', '항목 복원')
    $restoreBtn.setAttribute('title', '항목 복원')
    $restoreBtn.innerText = '복원'
    $todoItem.append($title)
    $todoItem.append($doneSpan)
    $todoItem.append($restoreBtn)
    $doneSpan.innerText = `${todo.time}초`
    if (handleClickRestoreTodo) {
      $restoreBtn.addEventListener('click', (e) => {
        e.preventDefault()
        handleClickRestoreTodo(todo)
      })
    }
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
