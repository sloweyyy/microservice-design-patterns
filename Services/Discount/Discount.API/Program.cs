using Common.Logging;
using Discount.API.Services;
using Discount.Application.Handlers;
using Discount.Core.Repositories;
using Discount.Infrastructure.Extensions;
using Discount.Infrastructure.Repositories;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Serilog;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to handle both HTTP/1.1 and HTTP/2
builder.WebHost.ConfigureKestrel(options =>
{
    // Setup HTTP/1.1 endpoint for REST API
    options.ListenAnyIP(80, o =>
    {
        o.Protocols = HttpProtocols.Http1;
    });

    // Setup HTTP/2 endpoint for gRPC
    options.ListenAnyIP(81, o =>
    {
        o.Protocols = HttpProtocols.Http2;
    });
});

//Serilog configuration
builder.Host.UseSerilog(Logging.ConfigureLogger);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Discount.API",
        Version = "v1"
    });
});

//Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

//Register Mediatr
var assemblies = new Assembly[]
{
    Assembly.GetExecutingAssembly(),
    typeof(CreateDiscountCommandHandler).Assembly
};
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assemblies));

//Register Services
builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
builder.Services.AddGrpc();

var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Discount.API v1"));
}

app.UseRouting();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGrpcService<DiscountService>();
    endpoints.MapGet("/", async context =>
    {
        await context.Response.WriteAsync("Discount API is running");
    });
});

// Initialize Database
app.MigrateDatabase<Program>();

app.Run();