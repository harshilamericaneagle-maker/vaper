import re

products_js = r'src\data\products.js'

with open(products_js, encoding='utf-8') as f:
    content = f.read()

# IDs 157-165 from file 15.xlsx had no image column
# Random unused photos were assigned - fix by using placeholders
# Map each to a cycling placeholder so they look intentional
bad_ids = {
    157: '/images/product-1.jpg',
    158: '/images/product-2.jpg',
    159: '/images/product-3.jpg',
    160: '/images/product-4.jpg',
    161: '/images/product-5.jpg',
    162: '/images/product-1.jpg',
    163: '/images/product-2.jpg',
    164: '/images/product-3.jpg',
    165: '/images/product-4.jpg',
}

# Find and replace each product's image path by matching the id block
blocks = re.findall(r'\{[^{}]+\}', content, re.DOTALL)
for block in blocks:
    id_m = re.search(r'"id": (\d+)', block)
    img_m = re.search(r'"image": "([^"]+)"', block)
    if id_m and img_m:
        pid = int(id_m.group(1))
        if pid in bad_ids:
            old_img = img_m.group(1)
            new_img = bad_ids[pid]
            new_block = block.replace(f'"image": "{old_img}"', f'"image": "{new_img}"')
            content = content.replace(block, new_block)
            print(f'Fixed [{pid}]: {old_img} -> {new_img}')

with open(products_js, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done.')
