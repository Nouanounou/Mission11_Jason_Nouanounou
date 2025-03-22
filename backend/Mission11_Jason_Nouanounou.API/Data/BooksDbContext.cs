using Microsoft.EntityFrameworkCore;

namespace Mission11_Jason_Nouanounou.API.Data
{
    public class BooksDbContext : DbContext
    {
        public BooksDbContext(DbContextOptions<BooksDbContext> options) : base(options)
        {
        }
        public DbSet<Books> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Books>()
                .Property(b => b.Title)
                .IsRequired()
                .HasColumnType("nvarchar(255)"); // Explicitly define the data type

            base.OnModelCreating(modelBuilder);
        }
    }
}
