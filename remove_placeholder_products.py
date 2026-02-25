import re

products_js = r'src\data\products.js'

with open(products_js, encoding='utf-8') as f:
    content = f.read()

# IDs to remove: 129-136 (file 18, no image column) and 157-165 (file 15, no image column)
ids_to_remove = set(range(129, 137)) | set(range(157, 166))

# Parse all product blocks
blocks = re.findall(r'\{[^{}]+\}', content, re.DOTALL)

kept = []
removed = []
for block in blocks:
    id_m = re.search(r'"id": (\d+)', block)
    name_m = re.search(r'"name": "([^"]+)"', block)
    if id_m:
        pid = int(id_m.group(1))
        name = name_m.group(1) if name_m else '?'
        if pid in ids_to_remove:
            removed.append((pid, name))
        else:
            kept.append(block)

print(f'Removing {len(removed)} products:')
for pid, name in removed:
    print(f'  [{pid}] {name[:60]}')
print(f'Keeping {len(kept)} products')

# Rebuild the products array
new_products_array = 'export const products = [\n' + ',\n'.join(kept) + '\n];'

# Preserve the categories export
categories_match = re.search(r'(export const categories\s*=\s*\[.*?\];)', content, re.DOTALL)
categories_block = '\n\n' + categories_match.group(1) if categories_match else ''

# Write updated file
header = '// Product data - Auto-generated from Final 108 products Excel\n// Products with verified real images only\n\n'
new_content = header + new_products_array + categories_block + '\n'

with open(products_js, 'w', encoding='utf-8') as f:
    f.write(new_content)

# Verify
ids = re.findall(r'"id": (\d+)', new_content)
print(f'Total products in file: {len(ids)}')
print('Done!')
