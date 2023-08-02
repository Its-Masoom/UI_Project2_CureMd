$(document).ready(function () {
    // Variable to keep track of the current page number
    var currentPage = 1;

    // Function to fetch the next set of blog posts from the server
    function fetchBlogPosts() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "GET",
            data: { _page: currentPage, _limit: 3 }, // Add _limit parameter to fetch only 3 posts
            dataType: "json",
            success: function (data) {
                // Call the function to append the new blog posts to the page
                appendBlogPosts(data);
                // Increment the current page number for the next fetch
                currentPage++;
            },
            error: function (error) {
                console.log("Error fetching blog posts:", error);
            },
        });
    }

    // Function to append the new blog posts to the page
    function appendBlogPosts(posts) {
        var blogPostsContainer = $("#blogPosts");
        // Create a new container for the new blog posts
        var newPostsContainer = $('<div class="row"></div>');
        // Loop through the retrieved blog posts and create cards for each post
        $.each(posts, function (index, post) {
            var card = `
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Post ID: ${post.id}</h6>
                            <p class="card-text">${post.body}</p>
                            <a href="#" class="card-link">Read more</a>
                        </div>
                    </div>
                </div>
            `;
            // Append the new card to the new container
            newPostsContainer.append(card);
        });

        // Append the new container to the main blogPostsContainer
        blogPostsContainer.append(newPostsContainer);
    }

    // Attach click event handler to the "Load More" button
    $("#loadMoreButton").on("click", function () {
        // Call the function to fetch the next set of blog posts
        fetchBlogPosts();
    });
});
