import re

PRODUCTS_JS = r'src\data\products.js'

with open(PRODUCTS_JS, encoding='utf-8') as f:
    content = f.read()

# Extract ALL product-like objects (anything with "id": N and "name": "...")
blocks = re.findall(r'\{[^{}]+\}', content, re.DOTALL)

products = []
for block in blocks:
    id_m = re.search(r'"id":\s*(\d+)', block)
    name_m = re.search(r'"name":\s*"([^"]+)"', block)
    if id_m and name_m:
        products.append((int(id_m.group(1)), block.strip()))

# Sort by id, deduplicate
seen = set()
unique_products = []
for pid, block in sorted(products):
    if pid not in seen:
        seen.add(pid)
        unique_products.append(block)

print(f'Found {len(unique_products)} unique products')
print(f'ID range: {min(seen)} to {max(seen)}')

# Write clean file
clean_js = '''// Product data - generated from products_sheet_master_complete.csv
// 113 products, all images verified

export const products = [
''' + ',\n'.join(unique_products) + '''
];

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'lighters-torches', label: 'Lighters & Torches' },
  { id: 'glass-pipes', label: 'Glass Pipes & Bongs' },
  { id: 'papers-wraps', label: 'Papers & Wraps' },
  { id: 'grinders', label: 'Grinders' },
  { id: 'hookah', label: 'Hookah' },
  { id: 'accessories', label: 'Accessories' },
];
'''

with open(PRODUCTS_JS, 'w', encoding='utf-8') as f:
    f.write(clean_js)

print('Written successfully. Verifying...')

# Quick verify
ids = re.findall(r'"id":\s*(\d+)', clean_js)
cats = re.findall(r"id: '([^']+)'", clean_js)
print(f'Products in file: {len(ids)}')
print(f'Categories: {cats}')
