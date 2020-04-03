import {Component} from "../../core/Component";
import {Form} from "../../core/Form";
import { Validators } from '../../core/Validators';

function onSubmit(e) {
    e.preventDefault();

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value
        };
    } else {
        console.warn('form is invalid');
    }
}

export class Create extends Component {
    constructor(id) {
        super(id);

        // this.form = null;
    }

    init() {
        this.$el.addEventListener('submit', onSubmit.bind(this));

        this.form = new Form(this.$el, {
            title: [Validators.required, Validators.minLength(5)],
            fulltext: [Validators.required, Validators.minLength(5)]
        });
    }

}
