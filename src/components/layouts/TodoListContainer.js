import TodoForm from '../common/TodoForm'
import FilterControl from '../common/FilterControl'
import TodoList from '../common/TodoList'

export default function TodoListContainer({
  $target,
  initialState,
  handleClickAddTodo,
  handleChangeTodoInput,
  handleClickFilterLimitTime,
  handleClickFilterIndex,
  handleClickAllDone,
  handleClickCheckList,
  handleClickCheckListDone,
  handleChangeOpenModal,
  handleClickDone,
  handleClickChangeTodoItem,
  handleChangeTodoItem,
}) {
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.setFormState = (nextState) => {
    this.state = nextState
    this.formRender()
  }

  const $createContainer = document.createElement('div')
  const $createTodo = document.createElement('section')
  $createTodo.append($createContainer)
  $createTodo.classList.add('left')

  const todoForm = new TodoForm({
    $target: $createContainer,
    initialState: this.state,
    handleClickAddTodo,
    handleChangeTodoInput,
  })

  const filterControl = new FilterControl({
    $target: $createTodo,
    initialState: { sortType: this.state.sortType },
    handleClickFilterLimitTime,
    handleClickFilterIndex,
    handleClickAllDone,
    handleClickCheckListDone,
  })

  const todoList = new TodoList({
    $target: $createTodo,
    initialState: {
      todoList: this.state.todoList.filter(({ isEnd }) => !isEnd),
      timers: this.state.timers,
      isChangeMode: this.state.isChangeMode,
    },
    className: 'unfinished',
    handleClickCheckList,
    handleChangeOpenModal,
    handleClickDone,
    handleClickChangeTodoItem,
    handleChangeTodoItem,
  })

  const filteredTodoList = () => {
    const { sortType, todoList } = this.state
    let filteredList = todoList
    if (sortType === '남은 시간 순') {
      filteredList = filteredList.sort((a, b) => a.time - b.time)
    }
    if (sortType === '입력한 순') {
      filteredList = filteredList.sort((a, b) => a.date - b.date)
    }
    return filteredList
  }

  this.formRender = () => {
    todoForm.setState(this.state)
  }

  this.render = () => {
    const filtered = filteredTodoList()
    $target.append($createTodo)
    const isDisabled = this.state.todoList.length
      ? !this.state.todoList.filter((item) => item.checked).length
      : true

    const allDoneDisabled = !this.state.todoList.length ? true : false
    filterControl.setState({
      sortType: this.state.sortType,
      disabled: isDisabled,
      allDoneDisabled: allDoneDisabled,
    })
    todoList.setState({
      todoList: filtered.filter(({ isEnd }) => !isEnd),
      timers: this.state.timers,
      isChangeMode: this.state.isChangeMode,
    })
  }

  this.formRender()
  this.render()
}
