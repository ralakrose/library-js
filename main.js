//Book Class:reping a book
class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
//UI class:to handle UI tasks

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
      <td> ${book.title}</td>
      <td> ${book.author}</td>
      <td> ${book.pages}</td>
      <td> ${book.status}</td>
    <td>
    <a href="#" class = "btn btn-danger btn-sm delete">X</a>
    </td>
      `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    //Make alert disappear in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#status").value = "";
  }
}
//Store class: takes care of storage(local storage)
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Events:to display books in the table
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//events: add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  //Prevent actual submit
  e.preventDefault();

  //Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#status").value;

  //VAlidate
  if (title === "" || author === "" || pages === "" || status === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //Instantiate book
    const book = new Book(title, author, pages, status);
    console.log(book);

    //Add book to list
    UI.addBookToList(book);

    //Add book to store
    Store.addBook(book);

    //Show success message for adding books
    UI.showAlert(
      "You have successfully added a book to your library!",
      "success"
    );
    //clear fields
    UI.clearFields();
  }
});
//events: remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.deleteBook(e.target); //removes only from UI

  //Remove book from store
  Store.removeBook;
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show success message for removing books
  UI.showAlert(
    "You have successfully removed a book from your library!",
    "warning"
  );
});
