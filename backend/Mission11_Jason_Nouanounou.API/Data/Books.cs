using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mission11_Jason_Nouanounou.API.Data
{
        public class Books
        {
            [Key]
            public int BookID { get; set; }

            [Required(ErrorMessage = "Please enter the title of the book.")]
            public required string Title { get; set; }

            [Required(ErrorMessage = "Don't forget to mention the author.")]
            public required string Author { get; set; }

            [Required(ErrorMessage = "Please enter the publisher.")]
            public required string Publisher { get; set; }

            [Required(ErrorMessage = "An ISBN is needed.")]
            public required string ISBN { get; set; }

            [Required(ErrorMessage = "Please specify the book's classification or category.")]
            public required string Classification { get; set; }

            [Required(ErrorMessage = "Please specify the category of the book.")]
            public required string Category { get; set; }

            [Required(ErrorMessage = "Please provide the number of pages.")]
            public required int PageCount { get; set; }

            [Required(ErrorMessage = "Don't forget the price.")]
            public required decimal Price { get; set; }
        }
    
}
