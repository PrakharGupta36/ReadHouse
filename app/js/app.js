let list = document.getElementById("list");
let apiKey = "AIzaSyBdxd2uCim-XmaBIBc5w6cVQJpcwHtf560";
let input = document.getElementById("input");
let submit = document.getElementById("submit");

function main(data) {
  let items = data.items;
  items.forEach((element) => {
    console.log(element);
    let booksCard = document.createElement("div");
    let booksImg = document.createElement("img");
    let booksDetails = document.createElement("div");
    let booksTitle = document.createElement("h4");
    let link = document.createElement("a");
    let bookInfo = document.createElement("p");
    let booksRating = document.createElement("p");
    let bookPageCount = document.createElement("p");

    booksCard.setAttribute("class", "card");
    booksImg.setAttribute("alt", "img");
    booksDetails.setAttribute("class", "cardDetails");
    booksTitle.setAttribute("class", "cardTitle");
    link.setAttribute("target", "_blank");

    booksImg.src = `${element.volumeInfo.imageLinks.thumbnail}`;
    booksTitle.textContent = element.volumeInfo.title;
    link.href = `${element.volumeInfo.canonicalVolumeLink}`;
    bookInfo.textContent = element.volumeInfo.description;
    if (element.volumeInfo.averageRating !== undefined) {
      booksRating.textContent = `Rating : ${element.volumeInfo.averageRating} ⭐️`;
    } else {
      booksRating.textContent = `Rating : Not available`;
    }
    if (element.volumeInfo.pageCount !== undefined) {
      bookPageCount.textContent = ` Page Count : ${element.volumeInfo.pageCount}`;
    } else {
      bookPageCount.textContent = `Page Count : Not available`;
    }

    // bookPageCount.textContent = `Page Count ${element.volumeInfo.}`

    list.appendChild(link);
    link.appendChild(booksCard);
    booksCard.appendChild(booksImg);
    booksCard.appendChild(booksDetails);
    booksDetails.appendChild(booksTitle);
    booksDetails.appendChild(booksRating);
    booksDetails.appendChild(bookPageCount);

    input.value = ""
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

submit.onclick = () => {
  if (input.value.length > 0) {
    removeAllChildNodes(list);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input.value}&printType=books&maxResults=40&key=${apiKey}&startIndex=0&orderBy=relevance`
    )
      .then((response) => response.json())
      .then((data) => {
        new main(data);
      });
  }
};

input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    submit.onclick();
  }
});
