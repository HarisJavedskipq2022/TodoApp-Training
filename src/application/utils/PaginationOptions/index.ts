class PaginationOptions {
  constructor(public currentPage = 1, public perPage = 20) {}

  limit(): number {
    return this.perPage
  }

  getCurrentPage(): number {
    return this.currentPage
  }

  offset(): number {
    return (this.currentPage - 1) * this.limit()
  }
}

export default PaginationOptions
