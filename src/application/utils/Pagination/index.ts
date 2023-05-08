import PaginationInfo from '../PaginationInfo'

interface PaginationOptions {
  limit: () => number
  getCurrentPage: () => number
}

class PaginationData<T> {
  paginationOptions: PaginationOptions
  itemCount: number
  items: T[]

  constructor(paginationOptions: PaginationOptions, itemCount: number) {
    this.paginationOptions = paginationOptions
    this.itemCount = itemCount
    this.items = []
  }

  totalPages(): number {
    return Math.ceil(this.itemCount / this.paginationOptions.limit())
  }

  addItem(item: T): void {
    this.items.push(item)
  }

  hasNext(): boolean {
    return this.paginationOptions.getCurrentPage() < this.totalPages()
  }

  nextPage(): number {
    return this.paginationOptions.getCurrentPage() + 1
  }

  hasPrev(): boolean {
    return this.paginationOptions.getCurrentPage() > 1
  }

  prevPage(): number {
    return this.paginationOptions.getCurrentPage() - 1
  }

  getPaginatedData(): { status: string; paginationInfo: PaginationInfo; data: T[] } {
    const paginationInfo = new PaginationInfo(
      this.itemCount,
      this.totalPages(),
      this.paginationOptions.getCurrentPage(),
      this.paginationOptions.limit(),
      this.hasNext() ? this.nextPage() : null,
      this.hasPrev() ? this.prevPage() : null
    )

    return {
      status: 'success',
      paginationInfo,
      data: this.items,
    }
  }
}

export default PaginationData
