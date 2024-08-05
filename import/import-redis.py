import pandas as pd
import redis
import time
import json
# Configurações do Redis
# r = redis.StrictRedis(host='localhost', port=6379, db=0)

#create a index 


# Ler o CSV
df = pd.read_csv('../walmart_com-ecommerce_product_details2.csv')

# Medir o tempo de importação
start_time = time.time()

# Supondo que a primeira coluna seja a chave e a segunda coluna seja o valor
for index, row in df.iterrows():
    json_data = {
        "id": row['id'],
        "created_time": row['created_time'],
        "url": row['url'],
        "name": row['name'],
        "description": row['description'],
        "prices": row['prices'],
        "sale_price": row['sale_price'],
        "brand": row['brand'],
        "category": row['category'],
        "available": row['available']
    }
    print(json.dumps(json_data))
    # r.json(row['id'], json.dumps(json_data)).set()
    # r.set(row[0], row[1])

end_time = time.time()
elapsed_time = end_time - start_time

print(f"Importação para Redis concluída em {elapsed_time} segundos!")
