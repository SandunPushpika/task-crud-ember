import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksRoute extends Route {
    @service store;

    async model() {
        let data = await this.store.findAll('task');
        return data;
    }
}
