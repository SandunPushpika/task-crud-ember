import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TasksController extends Controller {
    @tracked isAddTaskOpen = false;
    @tracked searchQuery = '';

    @service store;

    @action
    setAddTaskOpen(value) {
        this.isAddTaskOpen = value;
    }

    @action
    async setSearchQuery(event) {
        this.searchQuery = event.target.value;
        console.log('Search Query:', this.searchQuery);
        this.model = (await this.store.findAll('task')).filter(task => 
            task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

}
