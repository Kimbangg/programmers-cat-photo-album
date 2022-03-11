import BaseComponent from '../core/Component.js';

export default class Nodes extends BaseComponent {
  setup() {
    const { isRoot, nodes } = this.props;

    this.state = {
      isRoot,
      nodes,
    };
  }

  template() {
    const { isRoot, nodes } = this.state;

    return `
            ${
              isRoot
                ? ''
                : `<div class="Node">
                    <img src="./assets/prev.png">
                   </div>`
            }

            ${nodes
              .map(
                ({ id, name, type }) => `
                <div class="Node" data-node-id="${id}">
                    <img src="./assets/${
                      type === 'DIRECTORY' ? 'directory' : 'file'
                    }.png">
                    <div>${name}</div>
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
    const { onClickNode, onClickBackButton } = this.props;

    this.$target.addEventListener('click', event => {
      const $node = event.target.closest('.Node');
      const { nodeId } = $node.dataset;

      const { nodes } = this.state;

      const selectedNode = nodes.find(node => node.id === nodeId);

      if (selectedNode) {
        onClickNode(selectedNode);
      } else {
        onClickBackButton();
      }
    });
  }
}
