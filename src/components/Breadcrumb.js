import BaseComponent from '../core/Component.js';

export default class Breadcrumb extends BaseComponent {
  setup() {
    const { filePath } = this.props;

    this.state = {
      filePath,
    };
  }

  template() {
    const { filePath } = this.state;

    return `
            <div>root</div>
            ${filePath
              .map(
                path => `
                <div data-node-id="${path.id}">
                    ${path.name}
                </div>
            `
              )
              .join('')}
        `;
  }

  componentDidUpdate() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    const { onClickFilePath } = this.props;

    this.$target.addEventListener('click', event => {
      const $node = event.target.closest('div');

      const { nodeId } = $node.dataset;

      onClickFilePath(nodeId);
    });
  }
}
