using Microsoft.EntityFrameworkCore;
using Mission11_Jason_Nouanounou.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// This code adds our Bookstore database context to the services collection.
builder.Services.AddDbContext<BooksDbContext>(options =>
{
    // Get the connection string named "BooksConnection" from the  appsettings.json
    options.UseSqlite(builder.Configuration.GetConnectionString("BooksConnection"));
});

builder.Services.AddCors(options => 
{
    options.AddPolicy("This is the new policy",
    policy => {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("This is the new policy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
