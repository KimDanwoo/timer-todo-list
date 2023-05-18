import Home from "./pages/Home.js";

export default function App({ $target }) {
  $target.style = "max-height:100vh; overflow: auto;";

  const home = new Home({
    $target,
  });

  home.setState();
}
