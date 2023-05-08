class PaginationInfo {
  totalItems: number
  totalPages: number
  currentPage: number
  perPage: number
  nextPage: number | null
  prevPage: number | null

  constructor(
    totalItems: number,
    totalPages: number,
    currentPage: number,
    perPage: number,
    nextPage: number | null,
    prevPage: number | null
  ) {
    this.totalItems = totalItems
    this.totalPages = totalPages
    this.currentPage = currentPage
    this.perPage = perPage
    this.nextPage = nextPage
    this.prevPage = prevPage
  }
}

export default PaginationInfo
