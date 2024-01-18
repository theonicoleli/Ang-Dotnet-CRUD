using Microsoft.EntityFrameworkCore;

namespace CrudAPI.CrudAPI.pages.models 
{
    public class Context : DbContext
    {
        public DbSet<Person> People { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}   