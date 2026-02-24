import re

with open(r'src/data/products.js', encoding='utf-8') as f:
    content = f.read()

def triple_price(m):
    val = round(float(m.group(1)) * 3, 2)
    return '"price": ' + str(val)

updated = re.sub(r'"price": ([\d.]+)', triple_price, content)

with open(r'src/data/products.js', 'w', encoding='utf-8') as f:
    f.write(updated)

prices = re.findall(r'"price": ([\d.]+)', updated)
print('Total prices updated:', len(prices))
print('First 5 prices:', prices[:5])
