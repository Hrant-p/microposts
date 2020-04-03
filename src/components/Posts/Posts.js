import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { TransformService } from '../../services/TransformService';

function onClick(event) {
  const $el = event.target;
  const { id } = $el.dataset;

  if (id) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.includes(id)) {
      $el.textContent = 'Save';
      $el.classList.add('button-primary');
      $el.classList.remove('button-danger');
      favourites = favourites.filter(fId => fId !== id);
    } else {
      $el.classList.remove('button-primary');
      $el.classList.add('button-danger');
      $el.textContent = 'Delete';
      favourites.push(id);
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
    const html = posts.map(post => renderPosts(post));
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
  }

  onHide() {
    this.$el.innerHTML = '';
  }
}

function renderPosts(post) {
  const tag = post.type === 'news'
    ? '<li class="tag tag-blue tag-rounded">News</li>'
    : '<li class="tag tag-rounded tag-rounded">Note</li>';

  const button = JSON.parse(localStorage.getItem('favourites') || []).includes(post.id)
    ? `<button class="button-round button-small button-danger" data-id="${post.id}">Delete</button>`
    : `<button class="button-round button-small button-primary" data-id="${post.id}">Save</button>`;

  return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
      <small>${post.date}</small>
      ${button}
      </div>
    </div>`;
}
