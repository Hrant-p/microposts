import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { TransformService } from '../../services/TransformService';

export class Posts extends Component {
  constructor(id, { loader }) {
    super(id);

    this.loader = loader;
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

  const button = '<button class="button-round button-small button-primary">Save</button>';

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
