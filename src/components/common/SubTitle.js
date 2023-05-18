export default function SubTitle({ $target, title }) {
  const $subTitle = document.createElement("div");
  const $heading = document.createElement("h3");
  $heading.textContent = title;
  this.setState = () => {
    this.render();
  };
  this.render = () => {
    $subTitle.appendChild($heading);
    $target.prepend($subTitle);
  };
  this.render();
}
