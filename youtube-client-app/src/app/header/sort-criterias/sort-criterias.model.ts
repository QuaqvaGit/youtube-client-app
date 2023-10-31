export enum SortCriterias {
  Date = 'Date',
  ViewsCount = 'Views count',
  WordOrSentence = 'Word or sentence',
}

export type SortOrder = 'ASC' | 'DESC';

export type SortParams = {
  order: SortOrder;
  criteria: string;
};
