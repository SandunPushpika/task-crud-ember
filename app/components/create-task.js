import Component from "@glimmer/component"
import { service } from "@ember/service"
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CreateTaskComponent extends Component {
    @tracked title = "";
    @tracked description = "";

    @service store;

    @action
    async createTask() {
        const newTask = this.store.createRecord('task', {
            id: Date.now().toString(),
            title: this.title,
            description: this.description,
            isDone: false
        });
        await newTask.save();
        this.title = "";
        this.description = "";
        if (this.args.onCancel) {
            this.args.onCancel();
        }
    }

    @action
    setTitle(event) {
        this.title = event.target.value;
    }

    @action
    setDescription(event) {
        this.description = event.target.value;
    }
}