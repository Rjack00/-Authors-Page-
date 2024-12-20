# Author Display Page

This is a simple JavaScript project that fetches author data from a given API and displays it on a webpage. It allows users to view a list of authors, with a "Load More" button to paginate through the data.

## Features
- **Load Author Data**: Fetches a list of authors from an external API.
- **Pagination**: Displays authors in batches of 8 at a time, with the ability to load more authors as the user clicks the "Load More" button.
- **Error Handling**: If the data cannot be fetched, an error message is displayed to the user.
- **Responsive Display**: Displays author information including name, bio (truncated if too long), image, and a link to the author's page.

## File Structure

The project consists of the following components:

- **HTML**: Structure for displaying authors and the "Load More" button.
- **CSS**: Styles for author cards, the "Load More" button, and error messages.
- **JavaScript**: Handles fetching, displaying, and paginating through author data.

### Example of HTML structure

```html
<div id="author-container"></div>
<button id="load-more-btn">Load More</button>
```

## JavaScript Code Overview

### 1. **Fetching Author Data**
The author data is fetched from a public JSON API using the `fetch` method. Once the data is successfully retrieved, it is stored in the `authorDataArr` array, and the first 8 authors are displayed.

```javascript
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json())  
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  })
  .catch((err) => {
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });
```

### 2. **Displaying Authors**
The `displayAuthors` function loops through the authors, creating a user card for each one. The author's information, including name, bio (shortened if needed), image, and a link to their page, is dynamically inserted into the HTML.

```javascript
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `  
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};
```

### 3. **Pagination Logic**
The `fetchMoreAuthors` function is called when the "Load More" button is clicked. It updates the `startingIndex` and `endingIndex` to display the next set of 8 authors, and disables the button if there are no more authors to display.

```javascript
const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.cursor = "not-allowed";
    loadMoreBtn.textContent = 'No more data to load';
  }
};
```

### 4. **Handling "Load More" Button**
An event listener is added to the "Load More" button, so that when it's clicked, the `fetchMoreAuthors` function is triggered, displaying more authors.

```javascript
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
```

## How to Use
1. When the page loads, the first 8 authors will be displayed. To view more, click the "Load More" button.
