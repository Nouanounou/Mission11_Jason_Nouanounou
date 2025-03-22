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

            [Required(ErrorMessage = "Please enter the title of the book. Books are a great way to acquire wisdom!")]
            public string Title { get; set; }

            [Required(ErrorMessage = "Don't forget to mention the author. Authors bring stories to life!")]
            public string Author { get; set; }

            [Required(ErrorMessage = "Please enter the publisher. They make books available for all!")]
            public string Publisher { get; set; }

            [Required(ErrorMessage = "An ISBN is needed. It helps identify the book, just like a fingerprint!")]
            public string ISBN { get; set; }

            [Required(ErrorMessage = "Please specify the book's classification or category. It helps categorize the knowledge!")]
            public string Classification { get; set; }

            [Required(ErrorMessage = "Please specify the category of the book. It helps to organize the library!")]
            public string Category { get; set; }

            [Required(ErrorMessage = "Please provide the number of pages. It gives a sense of the book's journey!")]
            public int PageCount { get; set; }

            [Required(ErrorMessage = "Don't forget the price. Books should have value, just like the wisdom they hold!")]
            public decimal Price { get; set; }
        }
    
}
