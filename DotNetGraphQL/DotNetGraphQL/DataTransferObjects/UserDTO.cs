namespace DotNetGraphQL.DataTransferObjects
{
    public class UserDTO
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public long[] Roles { get; set; }
    }
}
