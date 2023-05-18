import FilterControl from "./FilterControl";
import SubTitle from "./SubTitle";
import TodoItem from "./TodoItem";

export default function TodoList({ $target }) {
  const $todoList = document.createElement("div");
  $todoList.style = "margin-top:28px";
  const $todoItems = document.createElement("div");
  $todoItems;
  $todoItems.classList.add("todo_list");

  new SubTitle({
    $target: $todoList,
    title: "할 일 목록",
  });

  new FilterControl({
    $target: $todoList,
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
  new TodoItem({
    $target: $todoItems,
    title: "할 일 내용 1",
    time: 60,
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $todoList.append($todoItems);
    $target.append($todoList);
  };

  this.render();
}
