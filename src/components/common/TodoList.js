import TodoItem from "./TodoItem";
import { store } from "../../store/index";

export default function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $todoList.style = "margin-top:28px";
  const $todoItems = document.createElement("div");
  $todoItems;
  $todoItems.classList.add("todo_list");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new TodoItem({
    $target: $todoItems,
    title: store.state.a,
    time: store.state.b,
  });

  new TodoItem({
    $target: $todoItems,
    title: "할 일 내용 1",
    time: 60,
  });
  new TodoItem({
    $target: $todoItems,
    title: "할 일 내용 1",
    time: 60,
  });

  this.render = () => {
    $todoList.append($todoItems);
    // $todoList.innerHTML = `
    // <ul>
    // ${this.state.map((item) => `<li>${item}</li>`)}
    //   </ul>
    // `;
    $target.append($todoList);
  };

  this.render();
}
