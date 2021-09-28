function getTotalBooksCount(books) {
  return books.reduce((sum, book) => sum + !!book, 0)
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((sum, account) => sum + !!account, 0)
}

function getBooksBorrowedCount(books) {
  return books.reduce((sum, book) => sum + !book.borrows[0].returned, 0)
}

function getMostCommonGenres(books) {
  let result = []
  books.forEach((book) => {
    let currentGenre = 0
    if (
      result.some((genre, index) => {
        currentGenre = index
        return genre.name == book.genre
      })
    ) {
      result[currentGenre].count++
    } else {
      result.push({ name: book.genre, count: 1 })
    }
  })
  result.sort((genre1, genre2) => (genre1.count < genre2.count ? 1 : -1))
  return result.slice(0, 5)
}

const getTotalBookBorrows = ({ borrows }) => {
  return borrows.reduce((sum, borrow) => sum + !!borrow, 0)
}

function getMostPopularBooks(books) {
  let result = books.map((book) => {
    let bookObject = {}
    bookObject["name"] = book.title
    bookObject["count"] = getTotalBookBorrows(book)
    return bookObject
  })
  result.sort((book1, book2) => (book1.count < book2.count ? 1 : -1))
  return result.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let result = authors.map((author) => {
    let authorObject = {}
    authorObject["name"] = `${author.name.first} ${author.name.last}`
    authorObject["count"] = books
      .filter((book) => book.authorId == author.id)
      .reduce((count, book) => count + getTotalBookBorrows(book), 0)
    return authorObject
  })
  result.sort((author1, author2) => (author1.count < author2.count ? 1 : -1))
  return result.slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
}
