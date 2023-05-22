import Heading from './components/common/Heading.js'
import TodoListContainer from './components/layouts/TodoListContainer.js'
import DoneTodoContainer from './components/layouts/DoneTodoContainer.js'
import { getItem, setItem, removeItem } from './utils/storage.js'
import Modal from './components/common/Modal.js'

export default function App({ $target }) {
  $target.style = 'max-height:100vh; overflow: auto;'
  const $main = document.createElement('section')
  const $todoWrap = document.createElement('div')
  $todoWrap.classList.add('todo_wrap')
  $main.id = 'page'
  this.state = getItem('store', {
    isOpenModal: false,
    sortType: '입력한 순',
    input: {
      title: '',
      time: 0,
    },
    todoList: [],
    doneTodoList: [],
    timers: {},
    modalContents: [],
    isChangeMode: false,
    startChangeTime: 0,
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  this.setFormState = (nextState) => {
    this.state = nextState
    this.formRender()
  }

  const handleClickAddTodo = () => {
    const uuid = self.crypto.randomUUID()
    const newPayload = {
      ...this.state.input,
      date: Date.now(),
      id: uuid,
      isEnd: false,
      checked: false,
      isChange: false,
    }
    this.state.timers[newPayload.id] = Date.now()

    const todoList = newPayload
    this.state.todoList.push(todoList)
    if (this.state.sortType === '남은 시간 순') {
      this.state.todoList.sort((a, b) => Number(a.time) - Number(b.time))
    }
    this.setState({
      ...this.state,
      input: { title: '', time: 0 },
    })
    setItem('store', this.state)
  }

  const handleChangeTodoInput = ({ target: { name, value } }) => {
    const newState = {
      ...this.state,
      input: { ...this.state.input, [name]: value },
    }
    this.setFormState(newState)
  }

  const handleClickFilterIndex = () => {
    const sortItem = this.state.todoList.sort((a, b) => a.date - b.date)
    const newState = {
      ...this.state,
      todoList: sortItem,
      sortType: '입력한 순',
    }
    this.setState(newState)
    setItem('store', this.state)
  }

  const handleClickFilterLimitTime = () => {
    const sortItem = this.state.todoList.sort(
      (a, b) => Number(a.time) - Number(b.time)
    )
    const newState = {
      ...this.state,
      todoList: sortItem,
      sortType: '남은 시간 순',
    }
    this.setState(newState)
    setItem('store', this.state)
  }

  const handleClickAllDone = () => {
    const filter = this.state.todoList.map((todo) => ({
      ...todo,
      isEnd: true,
    }))
    const newState = {
      ...this.state,
      todoList: [],
      doneTodoList: [...this.state.doneTodoList, ...filter],
    }
    this.state.timers = {}
    this.setState(newState)
    setItem('store', this.state)
  }

  const handleClickCheckListDone = () => {
    const checkTodo = this.state.todoList.map((todo) => ({
      ...todo,
      isEnd: todo.checked,
    }))
    for (let x of checkTodo) {
      delete this.state.timers[x.id]
    }
    const doneList = [
      ...this.state.doneTodoList,
      ...checkTodo.filter((item) => item.isEnd),
    ]
    const newState = {
      ...this.state,
      todoList: checkTodo.filter((item) => !item.isEnd),
      doneTodoList: doneList,
    }
    this.setState(newState)
    setItem('store', this.state)
  }

  const handleClickDone = (todo) => {
    const { todoList, doneTodoList } = this.state
    const map = todoList.map((e) => ({
      ...e,
      isEnd: e.id === todo.id,
    }))
    this.state.todoList = map.filter((e) => !e.isEnd)
    this.state.doneTodoList = [...doneTodoList, ...map.filter((e) => e.isEnd)]
    delete this.state.timers[todo.id]
    this.setState(this.state)
    setItem('store', this.state)
  }

  const handleClickCheckList = ({ target }) => {
    const { id, checked } = target
    if (checked) {
      this.state.todoList = this.state.todoList.map((todo) => ({
        ...todo,
        checked: todo.id === id ? true : todo.checked,
      }))
    } else {
      this.state.todoList = this.state.todoList.map((todo) => ({
        ...todo,
        checked: todo.id === id ? false : todo.checked,
      }))
    }
    this.setState(this.state)
    setItem('store', this.state)
  }

  const handleClickRestoreTodo = (item) => {
    const mapTodo = this.state.doneTodoList.map((todo) => ({
      ...todo,
      isEnd: item.id === todo.id ? false : todo.isEnd,
      checked: item.id === todo.id ? false : todo.checked,
      date: item.id === todo.id ? Date.now() : todo.date,
    }))
    this.state.todoList = [
      ...this.state.todoList,
      ...mapTodo.filter((item) => !item.isEnd),
    ]
    this.state.timers[item.id] = Date.now()
    this.state.doneTodoList = mapTodo.filter((item) => item.isEnd)
    this.setState(this.state)
    setItem('store', this.state)
  }

  const handleClickChangeTodoItem = (item) => {
    this.state.isChangeMode = true
    const index = this.state.todoList.findIndex((todo) => todo.id === item.id)
    this.state.todoList[index].isChange = true
    this.state.startChangeTime = Date.now()
    this.setState(this.state)
  }

  const handleChangeTodoItem = (item, { title, time }) => {
    const index = this.state.todoList.findIndex((todo) => todo.id === item.id)
    this.state.todoList[index] = {
      ...this.state.todoList[index],
      title,
      time,
      isChange: false,
    }
    this.state.isChangeMode = false
    this.state.todoList.forEach((item) => {
      const delayTime = Date.now() - this.state.startChangeTime
      this.state.timers[item.id] = this.state.timers[item.id] + delayTime
    })
    this.setState(this.state)
    setItem('store', this.state)
  }

  const handleChangeOpenModal = (doneItem) => {
    this.state.isOpenModal = true
    const doneTodo = this.state.todoList.map((todo) => ({
      ...todo,
      isEnd: doneItem.id === todo.id,
    }))

    this.state.doneTodoList = [
      ...this.state.doneTodoList,
      ...doneTodo.filter((item) => item.isEnd),
    ]
    this.state.todoList = doneTodo.filter((item) => !item.isEnd)
    delete this.state.timers[doneItem.id]
    this.state.modalContents = [...this.state.modalContents, doneItem.title]
    todoExpirationModal.setState({
      isOpen: this.state.isOpenModal,
      modalContents: this.state.modalContents,
    })
    setItem('store', this.state)
  }

  const handleChangeCloseModal = () => {
    this.state.isOpenModal = false
    this.state.modalContents = []
    this.setState(this.state)
    setItem('store', this.state)
  }

  new Heading({
    $target: $target,
    title: '밀리의 서재 사전 과제',
    size: 'h2',
  })

  $target.appendChild($todoWrap)

  const todoExpirationModal = new Modal({
    $target: $target,
    handleChangeCloseModal,
  })

  const todoListContainer = new TodoListContainer({
    $target: $todoWrap,
    initialState: this.state,
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
  })
  const doneTodoContainer = new DoneTodoContainer({
    $target: $todoWrap,
    initialState: this.state,
    handleClickRestoreTodo,
  })

  this.formRender = () => {
    todoListContainer.setFormState(this.state)
  }

  this.render = () => {
    todoListContainer.setState(this.state)
    doneTodoContainer.setState(this.state)
  }

  this.render()
}
