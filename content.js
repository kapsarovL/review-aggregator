chrome.runtime.sendMessage({action: "fetchReviews", product: extractProductId(window.location.href) }, response => {
    if (response.error) {
        console.error(response.error);
    } else if (response.reviews) {
        displayReviews(response.reviews);
    }
});

function extractProductId(url) {
    // Implement logic to extract product ID from  the URL
    return "exampleId";
}

function displayReviews(reviews) {
    // Create a container for the reviews
    const reviewsContainer = document.createElement('div');
    reviewsContainer.id = 'aggregated-reviews-contianer';
    reviewsContainer.style =`
    position: fixed;
    bottom: 0;
    right: 0;
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 0 1px rgba(0,0,0,0.5);
    z-index: 1000;
    padding: 10px;
    `;

    // Create a title for the reviews section
    const title = document.createElement('h3');
    title.textContent = 'Aggregated Reviews';
    reviewsContainer.appendChild(title);

    // Create a list to display the reviews
    const reviewList = document.createElement('ul');
    reviewList.style = 'list-style-type: none; padding: 0;';
    reviewsContainer.appendChild(reviewList);

    // Populate the list with reviews
    reviews.forEach(review => {
        const li = document.createElement('li');
        li.style = 'margin-bottom: 10px;';
        li.textContent = review;
        reviewList.appendChild(li);
    });

    // Add the review container to the body of the page
    document.body.appendChild(reviewContainer);
}