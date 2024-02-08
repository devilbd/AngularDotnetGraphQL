using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetGraphQL.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MaxLength(150)]
        public string EmailAddress { get; set; }
        [Required]
        [MaxLength(150)]
        public string Password { get; set; }
        [Required]
        [MaxLength(150)]
        public string PasswordSalt { get; set; }
        public List<Role> Roles { get; set; }
    }
}
