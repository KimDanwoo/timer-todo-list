export default function Modal({ $target, handleChangeCloseModal }) {
  const $modal = document.createElement('div')
  $modal.id = 'modal'

  this.state = { isOpen: false, modalContents: [] }
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  $modal.innerHTML = /*html*/ `
  <div class="modal_content" aria-hidden>
    <div class="modal_header">
      <h4></h4>
    </div>
    <div class="modal_body">
    ${this.state.modalContents
      .map((content) => `[${content}] 아이템이 종료 되었습니다.`)
      .join('')}
    </div>
    <div class="modal_footer">
    <button id="btnClose" type="button">확인</button>
    </div>
  </div>
  `

  this.render = () => {
    $modal.style = `${this.state.isOpen ? '' : 'display:none;'}`
    const $content = document.querySelector('.modal_body')
    if ($content) {
      const content = `<p>
        <b>[${Array.from(new Set(this.state.modalContents))
          .map((content) => `${content}`)
          .join()}]</b> 아이템이 종료 되었습니다.
      </p>`
      $content.innerHTML = content
    }
    $target.appendChild($modal)
  }
  this.render()
  
  this.closeModal = () => this.setState({ ...this.state, isOpen: false })

  const $button = $modal.querySelector('#btnClose')
  $button.addEventListener('click', () => {
    this.closeModal()
    handleChangeCloseModal()
  })
}
