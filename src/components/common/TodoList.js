import { getItem } from "../../utils/storage";
import FilterControl from "./FilterControl";
import SubTitle from "./SubTitle";
import TodoItem from "./TodoItem";
import { store } from "../../store/index";
import Button from "./Button";

export default function TodoList({ $target, initialState }) {
  const $todoList = document.createElement("div");
  $todoList.style = "margin-top:28px";
  const $todoItems = document.createElement("div");
  $todoItems;
  $todoItems.classList.add("todo_list");

  this.state = initialState;

  const list = getItem("todo");

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  new SubTitle({
    $target: $todoList,
    title: "할 일 목록",
  });

  new FilterControl({
    $target: $todoList,
  });

  list.map((item) => {
    new TodoItem({
      $target: $todoItems,
      title: item.title,
      time: item.time,
    });
  });

  new TodoItem({
    $target: $todoItems,
    title: store.state.a,
    time: store.state.b,
  });

  // new Button({

  // })
  // new TodoItem({
  //   $target: $todoItems,
  //   title: "할 일 내용 1",
  //   time: 60,
  // });
  // new TodoItem({
  //   $target: $todoItems,
  //   title: "할 일 내용 1",
  //   time: 60,
  // });

  this.render = () => {
    $todoList.append($todoItems);
    $target.append($todoList);
  };

  this.render();
}
