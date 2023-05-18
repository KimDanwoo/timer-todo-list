import MainTitle from "../components/common/MainTitle.js";
import TodoWrap from "../components/layouts/TodoWrap.js";
export default function HomePage({
  $target,
  onClickListItemAdd,
  onClickViewAllFolderOpen,
}) {
  const $page = document.createElement("div");
  $page.id = "page";

  const mainTitle = new MainTitle({
    $target: $page,
    title: "밀리의 서재 사전 과제",
  });

  const todoWrap = new TodoWrap({
    $target: $page,
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    mainTitle.render();
    todoWrap.render();
    $target.appendChild($page);
  };
}
