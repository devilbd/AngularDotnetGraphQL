using DotNetGraphQL.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetGraphQL.Data.Seed
{
    public class DataSeeder: IDataSeeder
    {
        private readonly PostgreSQLDbContext _DbContext;
        private readonly IConfiguration _Configuration;

        public DataSeeder(PostgreSQLDbContext dbContext, IConfiguration configuration) 
        { 
            _DbContext = dbContext;
            _Configuration = configuration;
        }

        public async Task SeedAsync()
        {
            try
            {
                var configuredRoles = _Configuration.GetSection("DefaultRoles").Get<List<string>>();

                var rolesForSeed = new List<Role>();
                var anyRoles = await _DbContext.Roles.AnyAsync();
                if (!anyRoles)
                {
                    foreach (var role in configuredRoles)
                    {
                        rolesForSeed.Add(new Role
                        {
                            Name = role
                        });
                    }

                    await _DbContext.Roles.AddRangeAsync(rolesForSeed);
                    await _DbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
