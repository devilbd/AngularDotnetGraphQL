using DotNetGraphQL.DataTransferObjects;
using DotNetGraphQL.Models;
using DotNetGraphQL.Services.IdentityManager;

namespace DotNetGraphQL.GraphQL.Mutations
{
    public class UserMutations
    {
        [UseMutationConvention]
        public async Task<User> CreateUser(UserDTO user, [Service] IIdentityManager identityManager)
        {
            try
            {
                var allRoles = await identityManager.GetRolesAsync();
                var selectedRoles = (from ar in allRoles
                                        from sr in user.Roles where ar.Id == sr select ar).ToList();
                var userForCreation = new User
                {
                    Name = user.Name,
                    EmailAddress = user.EmailAddress,
                    Password = user.Password,
                    PasswordSalt = Guid.NewGuid().ToString(),
                    Roles = selectedRoles
                };
                var createdUser = await identityManager.CreateUserAsync(userForCreation);
                return createdUser;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [UseMutationConvention]
        public async Task<long> DeleteUser(long userId, [Service] IIdentityManager identityManager)
        {
            try
            {
                await identityManager.RemoveUserAsync(userId);
                return userId;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
