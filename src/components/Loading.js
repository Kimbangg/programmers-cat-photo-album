import BaseComponent from '../core/Component.js';

export default class Loading extends BaseComponent {
  setup() {
    const { isLoading } = this.props;

    this.state = {
      isLoading,
    };
  }

  template() {
    return `
            <div class="content">
                <img width="100%" src="./assets/nyan-cat.gif">
            </div>
        `;
  }

  render() {
    const { isLoading } = this.state;

    this.$target.innerHTML = this.template();

    this.$target.style.display = isLoading ? 'block' : 'none';
  }

  componentDidUpdate() {
    const { isLoading } = this.state;

    this.$target.style.display = isLoading ? 'block' : 'none';
  }
}
