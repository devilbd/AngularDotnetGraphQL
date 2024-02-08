using Microsoft.EntityFrameworkCore;

namespace DotNetGraphQL.Data
{
    public class Migrator
    {
        IServiceScopeFactory _ServiceScopeFactory;

        public Migrator(IServiceScopeFactory serviceScopeFactory)
        {
            _ServiceScopeFactory = serviceScopeFactory;
        }

        public async Task MigrateAsync()
        {
            try
            {
                using var serviceScope = _ServiceScopeFactory.CreateScope();
                using var context = serviceScope.ServiceProvider.GetService<PostgreSQLDbContext>();
                await context.Database.MigrateAsync();
            }
            catch (Exception ex)
            {

            }
        }
    }
}
