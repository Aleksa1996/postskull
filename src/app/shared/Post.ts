export class Post {
  constructor(
    public id?,
    public image?,
    public sensitive?,
    public title?,
    public description?,
    public comments_count?,
    public likes?,
    public tags?: any[],
    public user?,
    public isYour?,
    public comments?: any[],
    public liked?,
    public section_id?: any
  ) {}
}
// public created_at, public updated_at, public posts_count
