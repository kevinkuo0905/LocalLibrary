function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id)
}

function findBookById(books, id) {
  return books.find((book) => book.id == id)
}

const isBookReturned = ({ borrows }) => borrows[0].returned

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter((book) => !isBookReturned(book))
  const notBorrowed = books.filter((book) => isBookReturned(book))
  return [borrowed, notBorrowed]
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book
  const result = []
  for (let i = 0; i < Math.min(borrows.length, 10); i++) {
    result.push(accounts.find((account) => account.id == borrows[i].id))
    result[i].returned = borrows[i].returned
  }
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}
