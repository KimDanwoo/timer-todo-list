import Home from "./pages/Home.js";

export default function App({ $target }) {
  $target.style = "max-height:100vh; overflow: auto;";

  const onClickAddTodoItem = (payload) => {
    console.log(payload);
    console.log("ddddd");
  };

  const home = new Home({
    $target,
    onClickAddTodoItem,
  });

  home.setState();
}
