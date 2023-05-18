export default function HomePage({
  $target,
  onClickListItemAdd,
  onClickViewAllFolderOpen,
}) {
  const $page = document.createElement("div");
  $page.innerHTML = "하이루";

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
