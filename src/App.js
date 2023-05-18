import Home from "./pages/Home.js";
import { getItem, setItem, removeItem } from "./utils/storage.js";

export default function App({ $target }) {
  $target.style = "max-height:100vh; overflow: auto;";

  const onClickAddTodoItem = (payload) => {
    const getTodos = getItem("todo", []);
    const newPayload = { ...payload, date: Date.now() };
    console.log(getTodos);
    const todos = [...getTodos, newPayload];
    setItem("todo", todos);
  };

  const home = new Home({
    $target,
    onClickAddTodoItem,
  });

  home.setState();
}
