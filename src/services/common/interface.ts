export interface Pagioantion {
  page: number;
  size: number;
  total: number;
}

export interface Paginated<T> {
  items: T[];
  pagination: Pagioantion;
}

export interface SignFileParams {
  filename?: string;
  valid_duration_in_seconds?: number;
}
