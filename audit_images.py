import re

with open(r'src\data\products.js', encoding='utf-8') as f:
    content = f.read()

# Split into individual product blocks
blocks = re.findall(r'\{[^{}]+\}', content, re.DOTALL)

print('=== Products 109+ and their image mappings ===')
for block in blocks:
    id_m = re.search(r'"id": (\d+)', block)
    name_m = re.search(r'"name": "([^"]+)"', block)
    img_m = re.search(r'"image": "([^"]+)"', block)
    if id_m and name_m and img_m:
        pid = int(id_m.group(1))
        if pid >= 109:
            name = name_m.group(1)
            img = img_m.group(1)
            is_placeholder = 'product-' in img
            flag = ' <-- PLACEHOLDER (no image)' if is_placeholder else ''
            print(f'  [{pid}] {name[:55]:<55} | {img}{flag}')
