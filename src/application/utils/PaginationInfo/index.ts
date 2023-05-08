class PaginationInfo {
  constructor(
    public totalItems: number,
    public totalPages: number,
    public currentPage: number,
    public perPage: number,
    public nextPage: number | null,
    public prevPage: number | null
  ) {}
}

export default PaginationInfo
