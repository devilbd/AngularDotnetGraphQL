using DotNetGraphQL.Data;
using DotNetGraphQL.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetGraphQL.Services.IdentityManager
{
    public class IdentityManager : IIdentityManager
    {
        private readonly PostgreSQLDbContext _DbContext;

        public IdentityManager(PostgreSQLDbContext dbContext) 
        { 
            _DbContext = dbContext;
        }

        public async Task<List<User>> GetUsersAsync(bool includeRoles = false)
        {
            try
            {
                List<User> result;
                if (includeRoles)
                {
                    result = await _DbContext.Users.Include(x => x.Roles).ToListAsync();
                } else
                {
                    result = await _DbContext.Users.ToListAsync();
                }
                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<List<Role>> GetRolesAsync()
        {
            try
            {
                var result = await _DbContext.Roles.ToListAsync();
                return result;
            }
            catch(Exception ex)
            {
                return null;
            }
        }

        public async Task<User> CreateUserAsync(User user)
        {
            try
            {
                await _DbContext.Users.AddAsync(user);
                await _DbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex) 
            {
                return null;
            }
        }

        public async Task<User> ModifyUserAsync(User user)
        {
            try
            {
                var userEntry = await _DbContext.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
                if (userEntry != null)
                {
                    userEntry.EmailAddress = user.EmailAddress;
                    userEntry.Password = user.Password;
                    userEntry.PasswordSalt = user.PasswordSalt;
                    userEntry.Roles = user.Roles;

                    _DbContext.Entry(userEntry).State = EntityState.Modified;
                    await _DbContext.SaveChangesAsync();
                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<User> RemoveUserAsync(long userId)
        {
            try
            {
                var user = await _DbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
                _DbContext.Users.Remove(user);
                _DbContext.Entry(user).State = EntityState.Deleted;
                await _DbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<User> GetUserByIdAsync(long userId)
        {
            try
            {
                var user = await _DbContext.Users.Include(x => x.Roles).FirstOrDefaultAsync(x => x.Id == userId);
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
