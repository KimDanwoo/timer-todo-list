import TodoItem from './TodoItem'

export default function TodoList({
  $target,
  initialState,
  className,
  handleClickCheckList,
  handleChangeOpenModal,
  handleClickDone,
}) {
  const $article = document.createElement('article')
  const $todoList = document.createElement('ul')
  $article.classList.add(className)
  $todoList.classList.add('todo_list')
  $todoList.classList.add(className)
  this.state = initialState
  this.timers = {}

  this.setState = (nextState) => {
    Object.values(this.timers).forEach((timerId) => {
      clearInterval(timerId)
    })
    this.timers = {}
    this.state = nextState
    this.render()
    if (handleClickCheckList) {
      const checkboxes = document.querySelectorAll('.todo-checkbox')
      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', (e) => {
          handleClickCheckList(e)
          if (nextState.checkedTodoList.length) {
            e.target.checked = nextState.checkedTodoList.includes(e.target.id)
          }
        })
      })
    }
  }

  this.updateCountdown = (startTime, item) => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    let timeLeft = item.time - elapsedTime
    const $actualTimerSpan = document.querySelector(`[data-id='${item.id}']`)
    if (timeLeft > 0 || !isNaN(timeLeft)) {
      if ($actualTimerSpan) {
        $actualTimerSpan.innerText = `${timeLeft}`
      }
    }
    if (timeLeft <= 5) {
      const $li = document.querySelector(`[data-parent='${item.id}']`)
      $li.classList?.add('active')
    }
    if (timeLeft === 0 && elapsedTime >= item.time) {
      this.resetTimer(item.id)
      setTimeout(() => {
        handleChangeOpenModal(item)
      }, 500)
    }
  }

  this.resetTimer = (id) => {
    clearInterval(this.timers[id])
    delete this.timers[id]
  }

  this.render = () => {
    while ($todoList.firstChild) {
      $todoList.removeChild($todoList.firstChild)
    }
    const nullClass =
      className === 'done' ? '할일을 마무리해보세요!' : `할일을 만들어보세요!`

    if (this.state.todoList.length) {
      this.state.todoList.forEach((todo) => {
        const $todoItem = new TodoItem({
          item: todo,
          startTime: className !== 'done' ? this.state.timers[todo?.id] : 0,
          handleChangeOpenModal,
          handleClickDone,
        })

        if (todo.isEnd && this.timers[todo.id]) {
          this.resetTimer(todo.id)
        } else if (!todo.isEnd && !this.timers[todo.id]) {
          this.timers[todo.id] = setInterval(() => {
            this.updateCountdown(
              className !== 'done' ? this.state.timers[todo?.id] : 0,
              todo
            )
          }, 1000)
        }

        $todoList.appendChild($todoItem)
      })
    } else {
      $todoList.classList.add('no_list')
      $todoList.innerHTML = `
        <h4 class="no_title">${nullClass}</h4 >
      `
    }
    $article.append($todoList)
    $target.append($article)
  }

  this.render()
}
