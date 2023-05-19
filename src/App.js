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

  this.state = [
    { id: 1, title: "빨래 하기", time: 60, createAt: 1, isEnd: false },
    { id: 2, title: "청소 하기", time: 50, createAt: 2, isEnd: false },
    { id: 3, title: "노래 하기", time: 20, createAt: 3, isEnd: true },
    { id: 4, title: "공부 하기", time: 60, createAt: 4, isEnd: false },
    { id: 5, title: "코딩 하기", time: 20, createAt: 5, isEnd: true },
    { id: 6, title: "저녁 하기", time: 15, createAt: 6, isEnd: false },
  ];

  const onClickAddTodoItem = (payload) => {
    const getTodos = getItem("todo", []);
    const newPayload = { ...payload, date: Date.now() };
    console.log(getTodos);
    const todos = [...getTodos, newPayload];
    setItem("todo", todos);
  };

  const heading = new Heading({
    $target: $target,
    title: "밀리의 서재 사전 과제",
    size: "h2",
  });

  const createTodoLayout = new CreateTodoLayout({
    $target: $todoWrap,
    initialState: this.state,
    onClickAddTodoItem,
  });
  const endTodoLayout = new EndTodoLayout({
    $target: $todoWrap,
    initialState: this.state,
  });

  this.render = () => {
    heading.render();
    // $main.appendChild($todoWrap);
    createTodoLayout.render();
    endTodoLayout.render();
    $target.appendChild($todoWrap);
  };

  this.render();
}
