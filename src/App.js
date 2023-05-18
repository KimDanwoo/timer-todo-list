import HomePage from "./HomePage";

export default function App({ $target }) {
  const homePage = new HomePage({
    $target,
    onClickListItemAdd,
    onClickViewAllFolderOpen,
  });
  this.render = () => {
    homePage.setState();
  };
}
