let list = document.getElementById("list")
let apiKey = "AIzaSyBdxd2uCim-XmaBIBc5w6cVQJpcwHtf560";

fetch(
  `https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=40&key=${apiKey}`
)
  .then((response) => response.json())
  .then((data) => {
    let items = data.items;
    console.log(data);
    items.forEach((element) => {
      console.log(element.volumeInfo);
      let booksTitle = document.createElement("li");
      booksTitle.textContent = element.volumeInfo.title;
      list.appendChild(booksTitle);
    });
  });
