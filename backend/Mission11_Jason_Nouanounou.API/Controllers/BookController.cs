using Microsoft.AspNetCore.Mvc;  // Import necessary libraries to create a web API
using Mission11_Jason_Nouanounou.API.Data; // Import the database context where the books are stored
using System.Collections.Generic; // Import to use lists of items
using System.Linq; // Import to perform operations like sorting and filtering

namespace BookProject.API.Controllers // This defines the namespace, like a folder for organizing the code
{
    [Route("[controller]")] // This sets the URL route for this controller (this is the endpoint the user will visit)
    [ApiController] // This makes it clear that this class will handle API requests
    public class BookController : ControllerBase // Defines the controller where book-related actions are written
    {
        private readonly BooksDbContext _bookContext; // This is the connection to the database where books are stored

        public BookController(BooksDbContext temp) => _bookContext = temp; // This creates a link between the controller and the database

        [HttpGet("AllBooks")] // This creates an endpoint for getting a list of all books
        // In case nothing is passed, the default value will be 
        public IActionResult GetBooks(int pageSize = 10, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? categories = null) // This function gets books with options to change how many books and in what order
        {
            var booksQuery = _bookContext.Books.AsQueryable(); // Get all the books from the database as a queryable list

            if (sortOrder.ToLower() == "desc") // If the sorting order is descending (from Z to A)
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title); // Sort the books by title, from Z to A
            }
            else // If the sorting order is not "desc", default to ascending order (A to Z)
            {
                booksQuery = booksQuery.OrderBy(b => b.Title); // Sort the books by title, from A to Z
            }

            if (categories != null && categories.Any())
            {
                booksQuery = booksQuery.Where(b => categories.Contains(b.Category));
            }

            var books = booksQuery
                .Skip((pageNum - 1) * pageSize) // Skip the books that are before the current page
                .Take(pageSize) // Only take the number of books for the current page
                .ToList(); // Turn the query result into a list

            var totalNumBooks = _bookContext.Books.Count(); // Get the total number of books in the database

            var result = new // Create a new object to hold the books and the total number of books
            {
                Books = books, // The list of books we retrieved
                TotalNumBooks = totalNumBooks // The total count of books in the database
            };

            return Ok(result); // Return the result as a successful response with the books and total count
        }


        // We are creating a second route to get a list of categories from the books.
        [HttpGet("GetCategories")] // This line creates the URL endpoint that will allow users to request the project types (categories).
        public IActionResult GetCategories()
        {
            // This line starts getting all the books from the database
            var bookCategories = _bookContext.Books
                .Select(b => b.Category) // This line selects only the 'Category' of each book from the database
                .Distinct() // This removes any duplicate categories, so only unique categories are kept
                .ToList(); // This converts the distinct categories into a list

            // This line sends the list of unique categories back to the user
            return Ok(bookCategories);
        }


    }
}