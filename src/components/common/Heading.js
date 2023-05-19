export default function Heading({
  $target,
  title = "밀리의 서재 사전 과제",
  size,
}) {
  const $mainTitle = document.createElement("div");
  const $heading = document.createElement(size);
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
