using CRUD.Controle.Model.Categoria;
using CRUD.Controle.Model.Pessoa;
using CRUD.Controle.Model.Transacoes;
using CRUD.Controle.Model.Result;

// Configurações de inicialização

var builder = WebApplication.CreateBuilder(args);

// Adiciona a referência ao arquivo appsettings.json de configuração

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")  // Tratamento do CORS para permitir a URL do Vite (frontend), evita erros
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

builder.Services.AddControllers(); // Registra os controllers da aplicacao

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.MapControllers();

app.Run();