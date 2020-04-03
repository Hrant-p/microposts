class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.init();
  }

  onHide() {

  }

  onShow() {

  }

  init() {
    console.log(this.$el);
  }

  hide() {
    this.$el.classList.add('hide');
    this.onHide();
  }

  show() {
    this.$el.classList.remove('hide');
    this.onShow();
  }
}

export default Component;
