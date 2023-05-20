export default function Heading({
  $target,
  title = "밀리의 서재 사전 과제",
  size,
}) {
  const $heading = document.createElement(size);
  $heading.textContent = title;

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.append($heading);
  };
  this.render();
}
