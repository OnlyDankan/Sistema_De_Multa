using System;
using System.Configuration.Assemblies;
using System.IO;
using System.Security.AccessControl;

int velocidade;
int excesso_velocidade;
int valor_multa;

Console.WriteLine("Digite o nome do motorista");
string nome = Console.ReadLine() ?? "";

if (nome == null)
{
    throw new Exception ("Você digitou errado. Tente novamente");
}

Console.Write("Digite o ID da carteira de motorista: ");
string ID = Console.ReadLine() ?? "";

if (ID == null)
{
    throw new Exception ("Você digitou errado. Tente novamente.");
}
  int IDNum = Convert.ToInt32(ID);

  if (IDNum <= 0)
{
    throw new Exception ("Você digitou errado. Tente novamente.");
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

    if (valor_multa <= 30) 
    {
        Console.WriteLine("20 Pontos foram adicionados na carteira do motorista.");
    } else if (valor_multa <= 80)
    {
        Console.WriteLine("40 Pontos foram adicionados na carteira do motorista");
    } else if (valor_multa <= 150)
    {
        Console.WriteLine("80 Pontos foram adicionados na carteira do motorista");
    } else if (valor_multa > 150)
    {
        Console.WriteLine("A carteira foi automáticamente desativada no sistema");
    }
} 


