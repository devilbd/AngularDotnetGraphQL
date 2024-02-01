using DotNetGraphQL.Models;

namespace DotNetGraphQL.Services.IdentityManager
{
    public interface IIdentityManager
    {
        List<User> Users { get; set; }
        List<Role> Roles { get; set; }
    }
}
