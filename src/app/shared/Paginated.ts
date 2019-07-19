export class Paginated<T> {
  constructor(public data: T[], public links, public meta) {}
}
