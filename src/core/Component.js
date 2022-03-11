import { checkSame } from '../utils/index.js';

export default class BaseComponent {
  constructor($target, props) {
    this.state = {};
    this.props = props;
    this.$target = $target;

    this.setup();
    this.init();
  }

  init() {
    this.render();
  }

  setup() {}

  selectDom() {}

  template() {
    return '';
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    this.$target.innerHTML = this.template();

    this.selectDom();
    this.setEvent();

    this.componentDidMount();
  }

  setEvent() {}

  setState(newState) {
    const nextState = { ...this.state, ...newState };

    if (checkSame(this.state, nextState)) return;

    this.state = { ...this.state, ...newState };

    this.componentDidUpdate();
  }
}
