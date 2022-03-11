import BaseComponent from '../core/Component.js';

const IMAGE_ENDPOINT =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default class ImageViewer extends BaseComponent {
  setup() {
    const { selectedNode } = this.props;

    this.state = {
      selectedNode,
    };
  }

  init() {
    this.render();
    this.setEvent();
  }

  template() {
    const { selectedNode } = this.state;

    return `
            ${
              selectedNode &&
              `
            <div class="content">
                <img src="${IMAGE_ENDPOINT}${selectedNode.filePath}">
             </div>
            `
            }
        `;
  }

  setEvent() {
    const { onCloseModal } = this.props;

    window.addEventListener('keyup', event => {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    });

    this.$target.addEventListener('click', event => {
      if (Array.from(event.target.classList).includes('Modal')) {
        onCloseModal();
      }
    });
  }

  render() {
    const { selectedNode } = this.state;

    this.$target.innerHTML = this.template();

    this.$target.style.display = selectedNode ? 'block' : 'none';
  }

  componentDidUpdate() {
    this.render();
  }
}
