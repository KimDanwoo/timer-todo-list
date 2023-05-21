export default function TodoItem({
  initialState,
  startTime = 0,
  handleChangeOpenModal,
}) {
  const $todoItem = document.createElement("li");
  const $timerSpan = document.createElement("span");
  const $doneSpan = document.createElement("span");
  $todoItem.classList.add("todo_item");
  this.state = initialState;
  const { item } = this.state;
  $timerSpan.setAttribute("data-time", item.time);
  $timerSpan.setAttribute("data-id", item.id);
  this.timerId = null;

  function updateCountdown(timerId) {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    let timeLeft = item.time - elapsedTime;
    if (timeLeft > 0) {
      const $actualTimerSpan = document.querySelector(`[data-id='${item.id}']`);
      if ($actualTimerSpan) {
        $actualTimerSpan.innerText = `${timeLeft}`;
      }
    }
    if (timeLeft === 0 && elapsedTime >= item.time) {
      clearInterval(timerId);
      handleChangeOpenModal(item);
    }
  }

  this.render = () => {
    if (!$timerSpan.innerText) {
      $timerSpan.innerText = item.time;
    }
    const $checkbox = item.isEnd ? "" : document.createElement("input");
    if ($checkbox) {
      $checkbox.setAttribute("type", "checkbox");
      $checkbox.classList.add("todo-checkbox");
      $checkbox.id = item.id;
      if (item.checked) {
        $checkbox.setAttribute("checked", "");
      }
    }
    const $title = document.createElement("p");
    $title.innerText = item.title;

    $todoItem.append($checkbox, $title);

    if (!item.isEnd) {
      const $button = document.createElement("button");
      $button.setAttribute("type", "button");
      $button.innerText = "종료";
      $todoItem.append($timerSpan);
      $todoItem.append($button);

      if (this.timerId) {
        clearInterval(this.timerId);
      }

      this.timerId = setInterval(() => {
        updateCountdown(this.timerId);
      }, 1000);
    } else {
      clearInterval(this.timerId);
      $todoItem.append($doneSpan);
      $doneSpan.innerText = item.time;
    }
  };

  this.render();
  return $todoItem;
}
