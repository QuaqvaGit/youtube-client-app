import { SearchItem } from './search-item.model';

export type SearchResponse = {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchItem[];
};

type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};
