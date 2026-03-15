using System;
using System.Configuration.Assemblies;
using System.IO;
using System.Security.AccessControl;

int velocidade;
int excesso_velocidade;
int valor_multa;
int ID;

Console.Write("Digite o ID da carteira de motorista: ");
ID = int.Parse(Console.ReadLine());

if (ID == 0) 
{
    throw new Exception ("Por favor coloque o ID do motorista");
}
bool erro = false;
try
{
    if (ID < 0)
    {
        throw new Exception ("O ID do motorista não pode ser negativo");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Erro: {ex.Message}");
    erro = true;
}
if (erro)
{
    return;
}   

Console.Write("Digite o valor da velocidade: ");
velocidade = int.Parse(Console.ReadLine() ?? "");

if (velocidade <= 60)
{
    Console.WriteLine("Ok. Sem problemas");
} else if (velocidade > 60)  
{
    excesso_velocidade = velocidade - 60;
    valor_multa = 7 * excesso_velocidade;
    Console.WriteLine($"O valor da multa: R${valor_multa}");

    if (valor_multa >= 30) 
    {
        Console.WriteLine("20 Pontos foram adicionados na carteira do motorista.");
    } else if (valor_multa >= 80)
    {
        Console.WriteLine("40 Pontos foram adicionados na carteira do motorista");
    } else if (valor_multa >= 150)
    {
        Console.WriteLine("80 Pontos foram adicionados na carteira do motorista");
    }
} 


