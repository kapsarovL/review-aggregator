document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({active: true, currentWindow: true},tabs => {
        const tab = tabs[0];
        const productId = extractProductId(tab.url);

        chrome.runtime.sendMessage({action: "fetchReviews", productId}, response => {
            if (response.error) {
                displayError(response.error);
            }else if (response.reviews) {
                displayReviews(response.reviews);
            }
        });
    });
});

function extractProductId(url) {
    // Implement logic to extract ID from the URL
    return "exampleId";
}

function displayReviews(reviews) {
    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = '';

    reviews.forEach(review => {
        const li = document.createElement('li');
        li.className = 'review-item';
        li.textContent = review;
        reviewsList.appendChild(li);
    });
}

function displayError(error) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = error;
}