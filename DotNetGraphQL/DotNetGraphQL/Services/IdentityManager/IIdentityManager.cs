using DotNetGraphQL.Models;

namespace DotNetGraphQL.Services.IdentityManager
{
    public interface IIdentityManager
    {
        Task<List<Role>> GetRolesAsync();
        Task<List<User>> GetUsersAsync(bool includeRoles = false);
        Task<User> CreateUserAsync(User user);
        Task<User> ModifyUserAsync(User user);
        Task<User> RemoveUserAsync(long userId);
    }
}
