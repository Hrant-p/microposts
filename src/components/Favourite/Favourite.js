import Component from '../../core/Component';
import { apiService } from '../../services/api';
import { Loader } from '../Loader/Loader';

async function linkOnClick(e) {
  e.preventDefault();
  if (e.target.classList.contains('js-link')) {
    this.loader.show();
    const postId = e.target.textContent;

    const post = await apiService.fetchPostById(postId);
    this.loader.hide();
  }

}

const renderList = (list = []) => {
  if (list.length) {
    return `
        <ul>
            ${list.map(item => `<li><a href="#" class="js-link">${item}</a></li>`).join(' ')}
        </ul>
        `;
  }

  return '<p class="center">You are nothing added still</p>';
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
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    const html = renderList(favourites);
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
}
