import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { TransformService } from '../../services/TransformService';
import { renderPosts } from '../../helpers/renderPosts';

function onClick(event) {
  const $el = event.target;
  const { id, name } = $el.dataset;

  if (id) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.filter(item => item.id === id).length) {
      $el.textContent = 'Save';
      $el.classList.add('button-primary');
      $el.classList.remove('button-danger');
      favourites = favourites.filter(item => item.id !== id);
    } else {
      $el.classList.remove('button-primary');
      $el.classList.add('button-danger');
      $el.textContent = 'Delete';
      favourites.push({ id, name });
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }
}

export class Posts extends Component {
  constructor(id, { loader }) {
    super(id);

    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', onClick.bind(this));
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPosts(post, {
      withButtons: true
    }));
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}
