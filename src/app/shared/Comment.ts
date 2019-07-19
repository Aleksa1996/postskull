import { User } from './User';

export class Comment {
  constructor(
    public id,
    public post_id,
    public body,
    public likes,
    public commented_on,
    public user: User,
    public liked?,
    public isYour?
  ) {}
}
