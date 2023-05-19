import { observable, observe } from "./observer.js";

export function createComponent($el, props) {
  let state = observable(initState());

  function setup() {
    observe(() => {
      render();
      setEvent();
      mounted();
    });
  }

  function initState() {
    return {};
  }

  function template() {
    return "";
  }

  function render() {
    $el.innerHTML = template();
  }

  function setEvent() {}

  function mounted() {}

  setup();

  return {
    getState: () => state,
    setState: (newState) => (state = observable(newState)),
  };
}
