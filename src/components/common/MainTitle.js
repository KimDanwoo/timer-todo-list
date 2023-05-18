export default function MainTitle({
  $target,
  title = "밀리의 서재 사전 과제",
}) {
  const $mainTitle = document.createElement("div");
  const $heading = document.createElement("h2");
  $mainTitle.classList.add("title_wrap");
  $heading.textContent = title;

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $mainTitle.appendChild($heading);
    $target.prepend($mainTitle);
  };
  this.render();
}
