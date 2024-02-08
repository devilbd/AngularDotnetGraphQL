using DotNetGraphQL.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetGraphQL.Data
{
    public class PostgreSQLDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserToRoles> UsersToRoles { get; set; }

        public PostgreSQLDbContext(DbContextOptions<PostgreSQLDbContext> options) : base(options) 
        { 
        
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(x => x.Roles)
                .WithMany(x => x.Users)                
                .UsingEntity<UserToRoles>();
        }
    }
}
