import Button from './Button'
import Heading from './Heading'

export default function FilterControl({
  $target,
  initialState,
  handleClickFilterLimitTime,
  handleClickFilterIndex,
  handleClickAllDone,
  handleClickCheckListDone,
}) {
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  const $container = document.createElement('article')
  const $btnWrap = document.createElement('div')
  const $leftBox = document.createElement('div')
  const $rightBox = document.createElement('div')
  $container.classList.add('filter_control')
  $btnWrap.classList.add('filter_buttons')

  new Heading({
    $target: $container,
    title: '할 일 목록',
    size: 'h3',
  })

  const sortIndexButton = new Button({
    $target: $leftBox,
    initialState: { text: '입력한 순', sortType: this.state.sortType },
    type: 'button',
    title: '입력한 순서로 정렬',
    onClick: handleClickFilterIndex,
  })
  const sortTimeButton = new Button({
    $target: $leftBox,
    initialState: { text: '남은 시간 순', sortType: this.state.sortType },
    type: 'button',
    title: '남은 시간 순서로 정렬',
    onClick: handleClickFilterLimitTime,
  })

  new Button({
    $target: $rightBox,
    initialState: { text: '전체 종료' },
    type: 'button',
    title: '할 일 목록 전체 종료',
    onClick: handleClickAllDone,
  })

  const selectDoneTodo = new Button({
    $target: $rightBox,
    initialState: { text: '선택 종료' },
    type: 'button',
    title: '체크된 항목 종료',
    onClick: handleClickCheckListDone,
  })

  this.render = () => {
    $btnWrap.append($leftBox)
    $btnWrap.append($rightBox)
    $container.append($btnWrap)
    sortIndexButton.setState({
      text: '입력한 순',
      sortType: this.state.sortType,
    })
    sortTimeButton.setState({
      text: '남은 시간 순',
      sortType: this.state.sortType,
    })
    selectDoneTodo.setState({
      text: '선택 종료',
      disabled: this.state.disabled,
    })
    $target.appendChild($container)
  }

  this.render()
}
