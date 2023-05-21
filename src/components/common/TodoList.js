import TodoItem from "./TodoItem";

export default function TodoList({
  $target,
  initialState,
  className,
  handleClickCheckList,
  handleChangeOpenModal,
}) {
  const $article = document.createElement("article");
  const $todoList = document.createElement("ul");
  $article.classList.add(className);
  $todoList.classList.add("todo_list");
  $todoList.classList.add(className);
  this.state = {
    ...initialState,
    items: initialState.todoList.map(
      (todo, index) =>
        new TodoItem({
          initialState: { item: todo },
          startTime: className !== "done" ? initialState.timers[todo?.id] : 0,
          handleChangeOpenModal,
          handleItemDone: () => {},
        })
    ),
  };

  this.setState = (nextState) => {
    this.state = nextState;

    if (handleClickCheckList) {
      const checkboxes = document.querySelectorAll(".todo-checkbox");
      checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener("click", (e) => {
          handleClickCheckList(e);
          if (nextState.checkedTodoList.length) {
            e.target.checked = nextState.checkedTodoList.includes(e.target.id);
          }
        });
      });
    }

    this.state.items = nextState.todoList.map(
      (todo, index) =>
        new TodoItem({
          initialState: { item: todo },
          startTime: className !== "done" ? nextState.timers[todo?.id] : 0,
          handleChangeOpenModal,
          handleItemDone: () => {
            this.state.items[index].resetTimer();
          },
        })
    );
    console.log(this.state.items);
    this.render();
  };

  this.render = () => {
    while ($todoList.firstChild) {
      $todoList.removeChild($todoList.firstChild);
    }
    const nullClass =
      className === "done" ? "할일을 마무리해보세요!" : `할일을 만들어보세요!`;
    if (this.state.todoList.length) {
      // const inner = this.state.todoList
      //   ?.map(
      //     (todo) =>
      //       new TodoItem({
      //         initialState: { item: todo },
      //         startTime: className !== "done" ? this.state.timers[todo?.id] : 0,
      //         handleChangeOpenModal,
      //       }).outerHTML
      //   )
      //   .join("");
      // $todoList.innerHTML = inner;
      const inner = this.state.items.map((item) => item.outerHTML).join("");
      $todoList.innerHTML = inner;
    } else {
      $todoList.classList.add("no_list");
      $todoList.innerHTML = `
        <h4 class="no_title">${nullClass}</h4 >
      `;
    }
    $article.append($todoList);
    $target.append($article);
  };

  this.render();
}
