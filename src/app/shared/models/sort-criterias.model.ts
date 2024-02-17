export enum SortCriterias {
  Date = 'Date',
  ViewsCount = 'Views count',
}

export type SortOrder = 'ASC' | 'DESC';

export type SortParams = {
  order: SortOrder;
  criteria: SortCriterias;
  filterBy: string;
};
