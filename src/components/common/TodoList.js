import TodoItem from './TodoItem'

export default function TodoList({
  $target,
  initialState,
  className,
  handleClickCheckList,
  handleChangeOpenModal,
  handleClickDone,
  handleClickRestoreTodo,
  handleClickChangeTodoItem,
  handleChangeTodoItem,
}) {
  const $article = document.createElement('article')
  const $todoList = document.createElement('ul')
  $article.classList.add(className)
  $todoList.classList.add('todo_list')
  $todoList.classList.add(className)
  this.state = initialState
  this.timerIds = {}
  this.timeList = {}

  this.setState = (nextState) => {
    Object.values(this.timerIds).forEach((timerId) => {
      clearInterval(timerId)
    })
    Object.keys(this.timeList).forEach((timeId) => {
      if (!nextState.todoList.find((todo) => todo.id === timeId)) {
        delete this.timeList[timeId]
      }
    })
    this.timerIds = {}
    this.state = nextState
    this.render()
    if (handleClickCheckList) {
      const checkboxes = document.querySelectorAll('.todo-checkbox')
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
          handleClickCheckList(e)
        })
      })
    }
  }

  this.updateCountdown = (startTime, { time, id, title }) => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000)
    let timer = time - elapsedTime
    const $actualTimerSpan = document.querySelector(`[data-id='${id}']`)
    if (timer > 1 || !isNaN(time)) {
      if ($actualTimerSpan) {
        this.timeList[id] = timer
        $actualTimerSpan.innerText = `${timer}초`
      }
    }
    if (timer <= 5 || this.timeList[id] <= 5) {
      const $li = document.querySelector(`[data-parent='${id}']`)
      $li.classList?.add('active')
    }
    if (timer <= 1 && elapsedTime >= timer) {
      timer = 0
      this.resetTimer(id)
      setTimeout(() => {
        handleChangeOpenModal({ time, id, title })
      }, 500)
    }
  }

  this.resetTimer = (id) => {
    clearInterval(this.timerIds[id])
    delete this.timerIds[id]
  }

  const createTodoList = () => {
    this.state.todoList.forEach((todo) => {
      const $todoItem = new TodoItem({
        todo: todo,
        handleChangeOpenModal,
        handleClickDone,
        value: this.timeList[todo.id],
        isChangeItem: this.state.isChangeMode,
        handleClickRestoreTodo,
        handleClickChangeTodoItem,
        handleChangeTodoItem,
      })

      if (todo.isEnd && this.timerIds[todo.id] && this.state.isChangeMode) {
        this.resetTimer(todo.id)
      }
      if (!todo.isEnd && !this.timerIds[todo.id] && !this.state.isChangeMode) {
        this.timerIds[todo.id] = setInterval(() => {
          this.updateCountdown(
            className !== 'done' ? this.state.timers[todo?.id] : 0,
            todo
          )
        }, 1000)
      }

      $todoList.appendChild($todoItem)
    })
  }

  const nullList = () => {
    const nullClass =
      className === 'done' ? '할일을 마무리해보세요!' : `할일을 만들어보세요!`
    $todoList.classList.add('no_list')
    $todoList.innerHTML = `
    <li class="no_title">
    <h4>${nullClass}</h4 >
    </li>
  `
  }

  this.render = () => {
    while ($todoList.firstChild) {
      $todoList.removeChild($todoList.firstChild)
    }
    if (this.state.todoList.length) {
      createTodoList()
    } else {
      nullList()
    }
    $article.append($todoList)
    $target.append($article)
  }

  this.render()
}
