export enum Sort {
  UNSORTED = 'UNSORTED',
  ASC = 'ASC',
  DESC = 'DESC',
}

export type PageRequestDTO = {
  page: number;
  size: number;
  sort: Sort;
};

export type PageResponseDTO<T> = {
  numberOfItems: number;
  numberOfPages: number;
  page: number;
  size: number;
  sort: Sort;
  overviewItems: T[];
};
