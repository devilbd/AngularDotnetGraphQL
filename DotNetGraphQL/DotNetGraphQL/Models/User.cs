using DotNetGraphQL.Queries;

namespace DotNetGraphQL.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Role> Roles { get; set; }
    }
}
