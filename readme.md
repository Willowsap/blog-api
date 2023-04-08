# REST API for a simple Blog Application

Getting Started:<br>
1. Clone this repository
2. Run npm install
3. Run npm run start

The API is hosted at localhost:3000
The following endpoints are available

GET /api/blog<br>
Returns the list of posts<br><br>
GET /api/blog/:postTitle<br>
Returns the post with the given title<br><br>
POST /api/blog<br>
Adds a new post to the database<br>
Requires body in the form: 
{
    postTitle,
    postContents,
    postAuthor,
    postDate,
}
