using System;
using System.Configuration.Assemblies;
using System.IO;
using System.Security.AccessControl;

int velocidade;
int excesso_velocidade;
int valor_multa;
string resumo = "";

Console.Write("Digite o nome do motorista: ");
string nome = (Console.ReadLine() ?? "") ?? throw new Exception("Você digitou errado. Tente novamente");

Console.Write("Digite o ID da carteira de motorista: ");
string ID = (Console.ReadLine() ?? "") ?? throw new Exception("Você digitou errado. Tente novamente.");

int IDNum = Convert.ToInt32(ID);

  if (IDNum <= 0)
{
    throw new Exception ("ID inválido. Tente novamente.");
}


Console.Write("Digite o valor da velocidade: ");
velocidade = int.Parse(Console.ReadLine() ?? "");

if (velocidade <= 60)
{
    Console.WriteLine("Velocidade normal");
} else if (velocidade > 60)  
{
    excesso_velocidade = velocidade - 60;
    valor_multa = 7 * excesso_velocidade;

    resumo = "--- RESUMO: ---\n";
    resumo += $"Motorista: {nome}\n";
    resumo += $"ID: {IDNum}\n";
    resumo += $"Velocidade registrada: {velocidade} KM/H\n";
    resumo += $"Valor da multa: R${valor_multa}\n";

    if (valor_multa <= 30) 
    {
        resumo += "20 pontos adicionados\n";
    } else if (valor_multa <= 80)
    {
        resumo += "40 pontos foram adicionados \n";
    } else if (valor_multa <= 150)
    {
        resumo += "80 pontos foram adicionados\n";
    } else if (valor_multa > 150)
    {
        resumo += "A carteira foi suspensa no sistema";
    }

    Console.WriteLine(resumo);
    } 



