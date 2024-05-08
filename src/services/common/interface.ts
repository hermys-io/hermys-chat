export interface Pagioantion {
  page: number;
  size: number;
  total: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagioantion;
}
