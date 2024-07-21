chrome.runtime.onMessage.addListener((request, sender, sendRequest) => {
    if (request.action === "fetchReviews") {
        const cacheKey = `reviews_${request.productId}`;
        chrome.storage.local.get([cacheKey], result => {
            if (result[cacheKey]) {
                sendResponse({reviews: result[cacheKey] });
            } else {
                fetchReviews(request.productId).then(reviews => {
                    chrome.storage.local.set({ [cacheKey]: reviews });
                    sendResponse({ reviews });
                }).catch(error => {
                    sendResponse({ error: error.message });
                });
            }
        });
        return true; // Keeps the messaging channel open for sendResponse
    }
});

async function fetchReviews(productId) {
    try {
        const reviews = [];

        const amazonReviews = await fetchAmazonReviews(productId);
        const ebayReviews = await fetchEbayReviews(productId);
        const walmartReviews = await fetchWalmartReviews(productId);

        reviews.push(...amazonReviews, ...ebayReviews, ...walmartReviews);

        return reviews;
    } catch (error) {
        throw new Error('Failed to fetch reviews');
    }
}

async function fetchAmazonReviews(productId) {
    // Fetch reviews from Amazon
    return ["Amazon review 1", "Amazon review 2"]; // Placeholder
}

async function fetchEbayReviews(productId) {
    // Fetch reviews from eBay
    return ["eBay review 1", "eBay review 2"]; // Placeholder
}

async function fetchWalmartReviews(productId) {
    // Fetch reviews from Walmart
    return ["Walmart review 1", "Walmart review 2"]; // Placeholder
}
