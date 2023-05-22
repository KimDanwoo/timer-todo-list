import Heading from '../common/Heading'
import TodoList from '../common/TodoList'

export default function DoneTodoContainer({
  $target,
  initialState,
  handleClickRestoreTodo,
}) {
  const $doneTodoContainer = document.createElement('section')
  $doneTodoContainer.classList.add('right')
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const subTitle = new Heading({
    $target: $doneTodoContainer,
    title: '종료된 할 일',
    size: 'h3',
  })

  const todoList = new TodoList({
    $target: $doneTodoContainer,
    initialState: {
      todoList: this.state.todoList.filter(({ isEnd }) => isEnd),
      isChangeMode: this.state.isChangeMode,
    },
    className: 'done',
    handleClickRestoreTodo,
  })

  this.render = () => {
    subTitle.render()
    todoList.render()
    todoList.setState({
      todoList: this.state.doneTodoList,
      timers: this.state.timers,
      handleClickRestoreTodo,
      isChangeMode: this.state.isChangeMode,
    })
    $target.append($doneTodoContainer)
  }

  this.render()
}
