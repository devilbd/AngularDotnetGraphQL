
using DotNetGraphQL.Models;
using DotNetGraphQL.Queries;
using DotNetGraphQL.Services.IdentityManager;

namespace DotNetGraphQL
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddGraphQLServer().AddQueryType<Query>();
            builder.Services.AddSingleton<IIdentityManager, IdentityManager>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("default_policy", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            var app = builder.Build();

            app.UseCors("default_policy");

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                _ = endpoints.MapGraphQL();
            });

            app.Run();
        }
    }
}
