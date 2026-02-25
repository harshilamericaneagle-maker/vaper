import re

products_js = r'src\data\products.js'

with open(products_js, encoding='utf-8') as f:
    content = f.read()

blocks = re.findall(r'\{[^{}]+\}', content, re.DOTALL)

kept = []
for block in blocks:
    id_m = re.search(r'"id": (\d+)', block)
    if id_m and int(id_m.group(1)) <= 108:
        kept.append(block)

print(f'Keeping {len(kept)} products (IDs 1-108)')

categories_match = re.search(r'(export const categories\s*=\s*\[.*?\];)', content, re.DOTALL)
categories_block = '\n\n' + categories_match.group(1) if categories_match else ''

new_content = (
    '// Product data - original 108 products with verified real images\n\n'
    'export const products = [\n' +
    ',\n'.join(kept) +
    '\n];' +
    categories_block + '\n'
)

with open(products_js, 'w', encoding='utf-8') as f:
    f.write(new_content)

ids = re.findall(r'"id": (\d+)', new_content)
print(f'Done. Total in file: {len(ids)}')
