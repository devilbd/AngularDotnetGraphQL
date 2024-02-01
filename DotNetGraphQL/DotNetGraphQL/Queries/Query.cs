using DotNetGraphQL.Models;
using DotNetGraphQL.Services.IdentityManager;

namespace DotNetGraphQL.Queries
{
    public class Query
    {
        public async Task<List<Role>> UserRoles(CancellationToken cancellationToken, [Service] IIdentityManager identityManager)
        {
            // just simulation of delayed response
            await Task.Delay(1000);
            return identityManager.Roles;
        }

        public async Task<List<User>> UsersAsync(CancellationToken cancellationToken, [Service] IIdentityManager identityManager)
        {
            await Task.Delay(1000);
            return identityManager.Users;
        }
    }
}
