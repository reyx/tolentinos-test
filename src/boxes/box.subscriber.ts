import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BoxHistory } from './box-history.entity';
import { Box } from './box.entity';
import { AuthService } from '../auth/auth.service';

@EventSubscriber()
export class BoxSubscriber implements EntitySubscriberInterface<Box> {
  constructor(readonly connection: Connection, private auth: AuthService) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Box;
  }

  async afterInsert(event: InsertEvent<Box>) {
    const history = new BoxHistory();
    history.action = 'CREATED';
    history.user = this.auth.user;
    history.box = event.entity;

    await event.manager.save(history);
  }
}
