using DotNetGraphQL.Models;

namespace DotNetGraphQL.Services.IdentityManager
{
    public class IdentityManager : IIdentityManager
    {
        public List<User> Users { get; set; }
        public List<Role> Roles { get; set; }
        public List<UserToRoles> UserToRoles { get;set; } = new List<UserToRoles>();
        public IdentityManager()
        {
            MockUp();
        }

        private void MockUp()
        {
            Roles = new List<Role>
            {
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "Moderator" },
                new Role { Id = 3, Name = "User" }
            };

            Users = new List<User>
            {
                new User { Id = 1, Name = "adminstrator@****admin.com", Roles = new List<Role>() },
                new User { Id = 2, Name = "moderator123@****kk.com", Roles = new List<Role>() },
                new User { Id = 3, Name = "standarduser@****kk.com", Roles = new List<Role>() },
            };
            AddUsersToRoles();
        }

        private void AddUsersToRoles()
        {
            foreach(var user in Users)
            {
                UserToRoles.Add(new UserToRoles
                {
                    UserId = user.Id,
                    RoleId = Roles[2].Id
                });
                user.Roles.Add(new Role
                {
                    Id = Roles[2].Id,
                    Name = Roles[2].Name,
                    UserId = user.Id,
                });
            }

            UserToRoles.Add(new UserToRoles { UserId = Users[0].Id, RoleId = Roles[0].Id });
            Users[0].Roles.Add(new Role
            {
                Id= Roles[0].Id,
                Name = Roles[0].Name,
                UserId = Users[0].Id,
            });

            UserToRoles.Add(new UserToRoles { UserId = Users[1].Id, RoleId = Roles[1].Id });
            Users[1].Roles.Add(new Role
            {
                Id = Roles[1].Id,
                Name = Roles[1].Name,
                UserId = Users[1].Id,
            });
        }
    }
}
