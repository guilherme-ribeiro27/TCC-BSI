import pandas as pd
import redis
import time
import json
from redis.commands.json.path import Path
import redis.commands.search.aggregation as aggregations
import redis.commands.search.reducers as reducers
from redis.commands.search.field import TextField, NumericField, TagField
from redis.commands.search.indexDefinition import IndexDefinition, IndexType
from redis.commands.search.query import NumericFilter, Query

# Configurações do Redis
r = redis.StrictRedis(host='redisstack-test.grupo.schulze', port=10001, db=0,username='desenv',password='desenv')

#create a index 
schema = (
    TextField("$.name", as_name="name"),
)
rs = r.ft("idx:product")
rs.create_index(
    schema,
    definition=IndexDefinition(
        prefix=["product:"], index_type=IndexType.JSON
    )
)

# Ler o CSV
# df = pd.read_csv('../walmart_com-ecommerce_product_details2.csv')

# Medir o tempo de importação
start_time = time.time()

# # Supondo que a primeira coluna seja a chave e a segunda coluna seja o valor
# for index, row in df.iterrows():
#     json_data = {
#         "id": row['id'],
#         "created_time": row['created_time'],
#         "url": str(row['url']),
#         "name": str(row['name']),
#         "description": str(row['description']),
#         "prices": row['prices'] if pd.notna(row['prices']) else 0,
#         "sale_price": row['sale_price'] if pd.notna(row['sale_price']) else 0,
#         "brand": str(row['brand']),
#         "category": str(row['category']),
#         "available": row['available']
#     }
#     try:
        
#         # print(row['id'])
#         id = row['id']
#         result = r.json().set(f'product:{id}',Path.root_path(),json_data)
        
#     except Exception as e:
#         print(row)
#         print(json_data)
#         print(e)
#     # r.json(row['id'], json.dumps(json_data)).set()
#     # r.set(row[0], row[1])

end_time = time.time()
elapsed_time = end_time - start_time



print(f"Importação para Redis concluída em {elapsed_time} segundos!")
