using DotNetGraphQL.Models;
using DotNetGraphQL.Services.IdentityManager;

namespace DotNetGraphQL.GraphQL.Queries
{
    public class Query
    {
        public async Task<List<Role>> AllRoles(CancellationToken cancellationToken, [Service] IIdentityManager identityManager)
        {
            var roles = await identityManager.GetRolesAsync();
            return roles;
        }

        public async Task<List<User>> AllUsers(CancellationToken cancellationToken, [Service] IIdentityManager identityManager, bool includeRoles = false)
        {
            var users = await identityManager.GetUsersAsync(includeRoles);
            return users;
        }
    }
}
