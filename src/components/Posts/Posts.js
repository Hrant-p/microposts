import Component from '../../core/Component';
import { apiService } from '../../services/api';

export class Posts extends Component {
  constructor(id) {
    super(id);
  }

  async onShow() {
    const data = await apiService.fetchPosts();
    console.log(data);
  }
}
