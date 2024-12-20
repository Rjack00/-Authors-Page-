// Get references to the HTML elements for displaying authors and the "Load More" button
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initialize variables for pagination
let startingIndex = 0;  // Index to start displaying authors
let endingIndex = 8;    // Index to stop displaying authors
let authorDataArr = []; // Array to hold author data fetched from the API

// Fetch the author data from the given API
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json())  // Convert the response to JSON
  .then((data) => {
    authorDataArr = data;  // Store the fetched data in the authorDataArr
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  // Display the first set of authors
  })
  .catch((err) => {  // Handle errors if fetching data fails
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Function to load and display more authors when the "Load More" button is clicked
const fetchMoreAuthors = () => {
  // Update the starting and ending indices for the next batch of authors
  startingIndex += 8;
  endingIndex += 8;

  // Display the next set of authors based on the updated indices
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Disable the "Load More" button if there are no more authors to load
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true; // Disable the button
    loadMoreBtn.style.cursor = "not-allowed"; // Change cursor to indicate button is disabled
    loadMoreBtn.textContent = 'No more data to load'; // Update button text
  }
};

// Function to display authors on the page
const displayAuthors = (authors) => {
  // Loop through each author and create a user card for them
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

// Event listener to call fetchMoreAuthors when the "Load More" button is clicked
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
