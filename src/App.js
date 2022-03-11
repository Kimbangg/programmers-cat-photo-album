import CatPhotoAlbum from './pages/CatPhotoAlbum.js';

export default class App {
  constructor($target) {
    this.$target = $target;

    this.init();
  }

  init() {
    this.render();
  }

  render() {
    new CatPhotoAlbum(this.$target);
  }
}
