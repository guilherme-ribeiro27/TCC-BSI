import pandas as pd
from cassandra.cluster import Cluster
import time

# Configurações do Cassandra
cluster = Cluster(['localhost'])
session = cluster.connect()

# Criação do keyspace e da tabela (ajuste conforme necessário)
session.execute("""
CREATE KEYSPACE IF NOT EXISTS my_keyspace WITH REPLICATION = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
}
""")

session.set_keyspace('my_keyspace')

session.execute("""
CREATE TABLE IF NOT EXISTS my_table (
    id UUID PRIMARY KEY,
    data TEXT
)
""")

# Ler o CSV
df = pd.read_csv('path/to/your.csv')

# Medir o tempo de importação
start_time = time.time()

# Inserir no Cassandra
prepared = session.prepare("INSERT INTO my_table (id, data) VALUES (?, ?)")
for index, row in df.iterrows():
    session.execute(prepared, (row[0], row[1]))

end_time = time.time()
elapsed_time = end_time - start_time

print(f"Importação para Cassandra concluída em {elapsed_time} segundos!")
