export default function TodoItem({ item, handleClickDone }) {
  const $todoItem = document.createElement('li')
  const $timerSpan = document.createElement('span')
  const $doneSpan = document.createElement('span')
  $todoItem.classList.add('todo_item')
  $timerSpan.setAttribute('data-time', item.time)
  $timerSpan.setAttribute('data-id', item.id)
  $todoItem.setAttribute('data-parent', `${item.id}`)
  this.timerId = null

  this.setState = (newState) => {
    this.state = newState
    this.render()
  }

  this.render = () => {
    if (!$timerSpan.innerText) {
      $timerSpan.innerText = item.time
    }
    const $checkbox = item.isEnd ? '' : document.createElement('input')
    if ($checkbox) {
      $checkbox.setAttribute('type', 'checkbox')
      $checkbox.classList.add('todo-checkbox')
      $checkbox.id = item.id
      if (item.checked) {
        $checkbox.setAttribute('checked', '')
      }
    }
    const $title = document.createElement('p')
    $title.innerText = item.title

    $todoItem.append($checkbox, $title)

    if (!item.isEnd) {
      const $button = document.createElement('button')
      $button.setAttribute('type', 'button')
      $button.innerText = '종료'
      $todoItem.append($timerSpan)
      $todoItem.append($button)
      $button.addEventListener('click', (e) => {
        e.preventDefault()
        handleClickDone(item)
      })
    } else {
      $todoItem.append($doneSpan)
      $doneSpan.innerText = item.time
    }
  }

  this.render()
  return $todoItem
}
