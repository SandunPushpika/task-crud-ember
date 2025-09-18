import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class TaskItemComponent extends Component{
    @service store;

    @action
    async toggleCompletion() {
        this.args.task.completed = !this.args.task.completed;
        this.store.findRecord('task', this.args.task.id).then((task) => {
            task.isDone = !this.args.task.isDone;
            task.save();
        });
    }

    @action
    async deleteTask() {
        await this.args.task.destroyRecord();
        //  this.store.deleteRecord('task', this.args.task);
    }
}