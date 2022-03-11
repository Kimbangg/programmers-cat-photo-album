import { request, qs } from '../utils/index.js';
import BaseComponent from '../core/Component.js';
import Nodes from '../components/Nodes.js';
import ImageViewer from '../components/ImageViewer.js';
import Breadcrumb from '../components/BreadCrumb.js';
import Loading from '../components/Loading.js';

export default class CatPhotoAlbum extends BaseComponent {
  setup() {
    this.state = {
      isRoot: true,
      nodes: [],
      filePath: [],
      selectedNode: null,
      isLoading: false,
      isInit: false,
    };
  }

  async init() {
    await this.fetchNodes();
  }

  template() {
    return `
            <nav class="Breadcrumb"></nav>
            <div class="Nodes"></div>
            <div class="ImageViewer Modal"></div>
            <div class="Loading Modal"></div>
        `;
  }

  selectDom() {
    this.$breadcrumb = qs('.Breadcrumb', this.$target);
    this.$nodes = qs('.Nodes', this.$target);
    this.$imageViewer = qs('.ImageViewer', this.$target);
    this.$loading = qs('.Loading', this.$target);
  }

  render() {
    const { filePath, isRoot, nodes, selectedNode, isLoading } = this.state;

    this.$target.innerHTML = this.template();

    this.selectDom();

    this.breadcrumb = new Breadcrumb(this.$breadcrumb, {
      filePath,
      onClickFilePath: this.onClickFilePath.bind(this),
    });

    this.nodes = new Nodes(this.$nodes, {
      isRoot,
      nodes,
      onClickNode: this.onClickNode.bind(this),
      onClickBackButton: this.onClickBackButton.bind(this),
    });

    this.imageViewer = new ImageViewer(this.$imageViewer, {
      selectedNode,
      onCloseModal: this.onCloseModal.bind(this),
    });

    this.loading = new Loading(this.$loading, {
      isLoading,
    });
  }

  componentDidUpdate() {
    const { filePath, isRoot, nodes, selectedNode, isLoading } = this.state;

    if (!this.state.isInit) {
      this.render();

      this.setState({
        ...this.state,
        isInit: true,
      });

      return;
    }

    this.breadcrumb.setState({
      filePath,
    });

    this.nodes.setState({
      isRoot,
      nodes,
    });

    this.imageViewer.setState({
      selectedNode,
    });

    this.loading.setState({
      isLoading,
    });
  }

  async fetchNodes(id) {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const { isError, data: nodes } = await request(id ? `/${id}` : '');

    if (!isError) {
      this.setState({
        ...this.state,
        isRoot: id ? false : true,
        isLoading: false,
        nodes,
      });
    } else {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }

  async onClickNode(node) {
    if (node.type === 'DIRECTORY') {
      await this.fetchNodes(node.id);

      this.setState({
        ...this.state,
        filePath: [...this.state.filePath, node],
      });
    } else if (node.type === 'FILE') {
      this.setState({
        ...this.state,
        selectedNode: node,
      });
    }
  }

  onCloseModal() {
    this.setState({
      ...this.state,
      selectedNode: null,
    });
  }

  async onClickBackButton() {
    const nextFilePath = [...this.state.filePath];

    nextFilePath.pop();

    const hasHistory = nextFilePath.length === 0 ? false : true;

    await this.fetchNodes(
      hasHistory ? `/${nextFilePath[nextFilePath.length - 1].id}` : ''
    );
    this.setState({
      ...this.state,
      filePath: nextFilePath,
    });
  }

  async onClickFilePath(nodeId) {
    await this.fetchNodes(nodeId);

    if (nodeId) {
      const nextFilePath = [...this.state.filePath];

      const idx = nextFilePath.findIndex(node => node.id === nodeId);

      this.setState({
        ...this.state,
        filePath: nextFilePath.slice(0, idx + 1),
      });
    } else {
      this.setState({
        ...this.state,
        filePath: [],
      });
    }
  }
}
