import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { renderPosts } from '../../helpers/renderPosts';
import renderList from '../../helpers/renderList';

async function postOnClick(e) {
  e.preventDefault();
  const { id } = e.target.dataset;
  if (e.target.classList.contains('js-link')) {
    this.$el.innerHTML = '';
    try {
      this.loader.show();
      const post = await apiService.fetchPostById(id);
      this.$el.insertAdjacentHTML('afterbegin', renderPosts(post, {
        withButtons: false
      }));
      this.loader.hide();
    } catch (error) {
      console.error(error);
      this.loader.hide();
    }
  }
}

export class Favourite extends Component {
  constructor(id, { loader }) {
    super(id);

    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', postOnClick.bind(this));
  }

  onShow() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const html = renderList(favourites);
    this.$el.insertAdjacentElement('afterbegin', html);
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}
