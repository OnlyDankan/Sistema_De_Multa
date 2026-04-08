using System;
using System.Configuration.Assemblies;
using System.IO;
using System.Security.AccessControl;

int velocidade;
int excesso_velocidade;
int valor_multa;
string nome;
string resumo = "";

do
{
    Console.Write("Digite o nome do motorista: ");
    nome = (Console.ReadLine() ?? "");

    if (string.IsNullOrWhiteSpace(nome))
    {
        Console.WriteLine("O campo é obrigatório. Tente Novamente.");
    }
} while (string.IsNullOrWhiteSpace(nome));

 int IDNum = 0; 

do { 
Console.Write("Digite o ID da carteira de motorista: ");
string ID = (Console.ReadLine() ?? "");

if (string.IsNullOrWhiteSpace(ID))
{ 
    Console.WriteLine("Digite um número válido");
} 

try
{ 
     IDNum = int.Parse(ID);
} 
catch
{
    Console.WriteLine("Digite um número válido. Tente novamente.");
} 
} while (string.IsNullOrWhiteSpace(IDNum));
// int IDNum = Convert.ToInt32(ID); (estudar depois)

 


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



