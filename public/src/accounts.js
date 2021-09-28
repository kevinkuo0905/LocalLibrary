function findAccountById(accounts, id) {
  return accounts.find((account) => account.id == id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => (account1.name.last > account2.name.last ? 1 : -1))
}

function getTotalNumberOfBorrows(account, books) {
  const allBorrows = books.reduce((array, book) => array.concat(book.borrows), [])
  return allBorrows.filter((borrow) => borrow.id == account.id).length
}

function getBooksPossessedByAccount(account, books, authors) {
  books = books.filter((book) =>
    book.borrows.some((borrow) => borrow.id == account.id && borrow.returned == false)
  )
  books.forEach((book) => (book["author"] = authors.find((author) => author.id == book.authorId)))
  return books
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
}
