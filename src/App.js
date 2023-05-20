import Heading from "./components/common/Heading.js";
import TodoListContainer from "./components/layouts/TodoListContainer.js";
import DoneTodoContainer from "./components/layouts/DoneTodoContainer.js";
import { getItem, setItem, removeItem } from "./utils/storage.js";

export default function App({ $target }) {
  this.state = getItem("store", {
    todoList: [],
    sortType: "입력한 순",
    input: {
      title: "",
      time: 0,
    },
    checkedTodoList: [],
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $target.style = "max-height:100vh; overflow: auto;";
  const $main = document.createElement("section");
  $main.id = "page";
  const $todoWrap = document.createElement("div");
  $todoWrap.classList.add("todo_wrap");

  const handleClickAddTodo = () => {
    const uuid = self.crypto.randomUUID();
    const newPayload = {
      ...this.state.input,
      date: Date.now(),
      id: uuid,
      isEnd: false,
    };
    const todoList = newPayload;
    this.state.todoList.unshift(todoList);
    this.setState({
      ...this.state,
      input: { title: "", time: 0 },
    });
    setItem("store", this.state);
  };

  const handleChangeTodoInput = ({ target: { name, value } }) => {
    const newState = {
      ...this.state,
      input: { ...this.state.input, [name]: value },
    };
    this.setState(newState);
  };

  const handleClickFilterIndex = () => {
    const sortItem = this.state.todoList.sort((a, b) => a.date - b.date);
    console.log(sortItem);
    const newState = {
      ...this.state,
      todoList: sortItem,
      sortType: "입력한 순",
    };
    this.setState(newState);
    setItem("store", this.state);
  };

  const handleClickFilterLimitTime = () => {
    const sortItem = this.state.todoList.sort(
      (a, b) => Number(a.time) - Number(b.time)
    );
    const newState = {
      ...this.state,
      todoList: sortItem,
      sortType: "남은 시간 순",
    };
    this.setState(newState);
    setItem("store", this.state);
  };

  const handleClickAllDone = () => {
    const filter = this.state.todoList.map((todo) => ({
      ...todo,
      isEnd: true,
    }));
    const newState = {
      ...this.state,
      todoList: filter,
    };
    this.setState(newState);
    setItem("store", this.state);
  };

  const handleClickCheckListDone = () => {
    const filter = this.state.todoList.map((todo) => ({
      ...todo,
      isEnd: this.state.checkedTodoList.includes(todo.id),
    }));
    const newState = {
      ...this.state,
      todoList: filter,
    };
    this.setState(newState);
    setItem("store", this.state);
  };

  const handleClickCheckList = ({ target }) => {
    const { id, checked } = target;
    if (checked) {
      const checkedTodo = this.state.todoList.find((todo) => todo.id === id);
      const tempList = [...this.state.checkedTodoList, checkedTodo.id];
      const checkedTodoList = Array.from(new Set(tempList));
      this.state.checkedTodoList = checkedTodoList;
    } else {
      const todoIndex = this.state.checkedTodoList.findIndex(
        (uuid) => uuid === id
      );
      this.state.checkedTodoList.splice(todoIndex, 1);
    }
    this.setState(this.state);
    setItem("store", this.state);
  };

  const heading = new Heading({
    $target: $target,
    title: "밀리의 서재 사전 과제",
    size: "h2",
  });

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
  });
  const doneTodoContainer = new DoneTodoContainer({
    $target: $todoWrap,
    initialState: this.state,
  });

  this.render = () => {
    heading.render();
    $target.appendChild($todoWrap);
    todoListContainer.setState(this.state);
    doneTodoContainer.setState(this.state);
  };

  this.render();
}
