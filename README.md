# QuotingDojo

We used MongoDB, Node, Express, EJS, for this assignment

The 'add my quote' button should add the user's quote to the database, but the 'skip to quotes' button should take the user directly to the main page.  

Use the following URLs for your project:

GET ' / ' for the screen on top
POST '/quotes' for the method of the form to make a new quote.
GET '/quotes' for the screen on the right (where all the quotes are rendered).
When you create a new quote, if there are errors in the .save() method, use flash messages to display the errors.
