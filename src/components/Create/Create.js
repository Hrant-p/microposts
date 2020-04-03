import Component from '../../core/Component';
import { Form } from '../../core/Form';
import { Validators } from '../../core/Validators';
import { apiService } from '../../services/api';

async function onSubmit(e) {
  e.preventDefault();

  if (this.form.isValid()) {
    const formData = {
      type: this.$el.type.value,
      date: new Date().toLocaleDateString(),
      ...this.form.value()
    };

    await apiService.createPost(formData);
    this.form.clear();
    alert('Created Post in DB');
  }
}

export class Create extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    this.$el.addEventListener('submit', onSubmit.bind(this));

    this.form = new Form(this.$el, {
      title: [Validators.required, Validators.minLength(5)],
      fulltext: [Validators.required, Validators.minLength(5)]
    });
  }
}
