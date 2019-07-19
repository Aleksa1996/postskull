export class User {
  constructor(
    public id?,
    public username?,
    public email?,
    public image?,
    public description?,
    public role?,
    public created_at?,
    public posts?: any[],
    public posts_count?,
    public comments_count?
  ) {}
}
