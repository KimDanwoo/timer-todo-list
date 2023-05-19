import Heading from "./components/common/Heading.js";
import CreateTodoLayout from "./components/layouts/CreateTodoLayout.js";
import EndTodoLayout from "./components/layouts/EndTodoLayout.js";
import { getItem, setItem, removeItem } from "./utils/storage.js";

export default function App({ $target }) {
  $target.style = "max-height:100vh; overflow: auto;";
  const $main = document.createElement("section");
  $main.id = "page";
  const $todoWrap = document.createElement("div");
  $todoWrap.classList.add("todo_wrap");

  const onClickAddTodoItem = (payload) => {
    const getTodos = getItem("todo", []);
    const newPayload = { ...payload, date: Date.now() };
    console.log(getTodos);
    const todos = [...getTodos, newPayload];
    setItem("todo", todos);
  };

  const heading = new Heading({
    $target: $main,
    title: "밀리의 서재 사전 과제",
    size: "h2",
  });

  const createTodoLayout = new CreateTodoLayout({
    $target: $todoWrap,
    onClickAddTodoItem,
  });
  const endTodoLayout = new EndTodoLayout({
    $target: $todoWrap,
  });

  this.render = () => {
    $main.appendChild($todoWrap);
    heading.render();
    createTodoLayout.render();
    endTodoLayout.render();
    $target.appendChild($main);
  };

  this.render();
}
