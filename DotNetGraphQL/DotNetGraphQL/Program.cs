
using DotNetGraphQL.Data;
using DotNetGraphQL.Data.Seed;
using DotNetGraphQL.GraphQL.Mutations;
using DotNetGraphQL.GraphQL.Queries;
using DotNetGraphQL.Models;
using DotNetGraphQL.Services.IdentityManager;
using Microsoft.EntityFrameworkCore;
using System;

namespace DotNetGraphQL
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                var builder = WebApplication.CreateBuilder(args);
                string environment = Environment.GetEnvironmentVariable("DotNetGraphQLEnvironment");
                var configurationBuilder = new ConfigurationBuilder()
                    .AddJsonFile($"appsettings.{environment}.json")
                    .Build();

                // Add services to the container.
                var configuration = builder.Configuration;
                string connectionString = Environment.GetEnvironmentVariable("DotNetGraphQLPostgreSQLConnectionString");

                builder.Services.AddDbContext<PostgreSQLDbContext>(options =>
                {
                    options.UseNpgsql(connectionString);
                });

                // GraphQL
                builder.Services.AddGraphQLServer()
                    .AddMutationConventions()
                    .AddMutationType<UserMutations>()
                    .AddQueryType<Query>();

                // Application services
                builder.Services.AddScoped<IDataSeeder, DataSeeder>();
                builder.Services.AddTransient<Migrator>();
                builder.Services.AddScoped<IIdentityManager, IdentityManager>();
                
                // CORS
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("default_policy", policy =>
                    {
                        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    });
                });

                var app = builder.Build();

                Task.Run(async () =>
                {
                    var migrator = app.Services.GetService<Migrator>();
                    await migrator.MigrateAsync();
                });

                Task.Run(async () =>
                {
                    try
                    {
                        using var scope = app.Services.CreateScope();
                        var seeder = scope.ServiceProvider.GetRequiredService<IDataSeeder>();
                        await seeder.SeedAsync();
                    }
                    catch (Exception ex)
                    {

                    }
                });

                app.UseCors("default_policy");

                app.UseRouting();

                app.UseEndpoints(endpoints =>
                {
                    _ = endpoints.MapGraphQL();
                });

                app.Run();
            }
            catch(Exception ex)
            {

            }
        }
    }
}
