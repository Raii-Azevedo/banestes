import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Carregando os dados do CSV
dados = pd.read_csv('Q4.csv')

# Convertendo a coluna de data para o formato adequado
dados['DT_EMISSAO'] = pd.to_datetime(dados['DT_EMISSAO'])

# Criando um gráfico por "INSTITUICAO_FINANCEIRA"
plt.figure(figsize=(12, 6))
sns.barplot(data=dados, x='CNPJ_IF', y='VL_PARC_CREDITO', estimator=sum)
plt.title('Valor de "VL_PARC_CREDITO" por "INSTITUICAO_FINANCEIRA"')
plt.xlabel('Instituição Financeira')
plt.ylabel('Valor Total de Parcelas de Crédito')
plt.savefig('grafico_instituicao.png')
plt.close()

# Criando um gráfico por mês de emissão
dados['MES_EMISSAO'] = dados['DT_EMISSAO'].dt.month
plt.figure(figsize=(12, 6))
sns.barplot(data=dados, x='MES_EMISSAO', y='VL_PARC_CREDITO', estimator=sum)
plt.title('Valor de "VL_PARC_CREDITO" por Mês de Emissão')
plt.xlabel('Mês de Emissão')
plt.ylabel('Valor Total de Parcelas de Crédito')
plt.savefig('grafico_mes.png')
plt.close()

# Criando o arquivo HTML com os gráficos
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Gráficos de Dados</title>
</head>
<body>
    <h1>Gráfico por Instituição Financeira</h1>
    <img src="grafico_instituicao.png" alt="Gráfico por Instituição Financeira" width="800" height="400">
    <h1>Gráfico por Mês de Emissão</h1>
    <img src="grafico_mes.png" alt="Gráfico por Mês de Emissão" width="800" height="400">
</body>
</html>
"""

with open('Q4_Raíssa_Azevedo.html', 'w') as html_file:
    html_file.write(html_content)
