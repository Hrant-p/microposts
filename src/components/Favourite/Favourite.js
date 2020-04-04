import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { renderPosts } from '../../helpers/renderPosts';

async function linkOnClick(e) {
  e.preventDefault();
  const { id } = e.target.dataset;
  if (e.target.classList.contains('js-link')) {
    this.$el.innerHTML = '';
    try {
      this.loader.show();
      const post = await apiService.fetchPostById(id);
      console.log(post);
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

const renderList = (list = []) => {
  const p = document.createElement('p');
  p.innerText = 'You are nothing added still';

  if (list.length) {
    const ul = document.createElement('ul');
    p.setAttribute('class', 'center');

    list
      .forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('js-link');
        a.setAttribute('data-id', item.id);
        a.setAttribute('href', '#');
        a.innerText = item.name;
        li.appendChild(a);
        ul.appendChild(li);
      });
    return ul;
  }

  return p;
};


export class Favourite extends Component {
  constructor(id, { loader }) {
    super(id);

    this.loader = loader;
  }

  init() {
    this.$el.addEventListener('click', linkOnClick.bind(this));
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
