import csv
import os
import shutil
import re

CSV_COMPLETE = r'C:\Users\harsh\Downloads\products_sheet_master_complete.csv'
CSV_EXISTING = r'C:\Users\harsh\Downloads\products_sheet_master_updated.csv'
IMAGES_SRC = r'All images'
IMAGES_DEST = r'public\images'
PRODUCTS_JS = r'src\data\products.js'

os.makedirs(IMAGES_DEST, exist_ok=True)

# Available images (case-insensitive)
available_images = {f.lower(): f for f in os.listdir(IMAGES_SRC) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))}

# Existing product names
with open(CSV_EXISTING, encoding='utf-8-sig') as f:
    existing_names = {r['name'].strip().lower() for r in csv.DictReader(f)}

# All products in complete file
with open(CSV_COMPLETE, encoding='utf-8-sig') as f:
    all_rows = list(csv.DictReader(f))

new_rows = [r for r in all_rows if r.get('name', '').strip().lower() not in existing_names]
print(f'New products to append: {len(new_rows)}')

def get_category(name, desc):
    combined = (name + ' ' + desc).lower()
    if any(w in combined for w in ['pipe', 'bong', 'bubbler', 'percolator', 'beaker', 'water pipe']):
        return 'glass-pipes'
    if any(w in combined for w in ['wrap', 'rolling paper', 'roll', 'leaf', 'blunt', 'cone', 'tip']):
        return 'papers-wraps'
    if any(w in combined for w in ['grinder', 'herb grinder']):
        return 'grinders'
    if any(w in combined for w in ['lighter', 'torch']):
        return 'lighters-torches'
    if any(w in combined for w in ['hookah']):
        return 'hookah'
    return 'accessories'

def get_badge(name):
    n = name.lower()
    if any(w in n for w in ['rick', 'morty', 'skull', 'novelty', 'rhinestone', 'camo', 'bling']):
        return 'hot'
    if any(w in n for w in ['raw', 'ocb', 'king palm', 'zig-zag']):
        return 'new'
    return ''

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')

# Read existing products.js to get current max id
with open(PRODUCTS_JS, encoding='utf-8') as f:
    existing_js = f.read()
existing_ids = [int(x) for x in re.findall(r'"id": (\d+)', existing_js)]
start_id = max(existing_ids) + 1 if existing_ids else 55
print(f'Starting at ID: {start_id}')

new_product_blocks = []
copied = 0
missing = 0

for i, row in enumerate(new_rows):
    pid = start_id + i
    name = row.get('name', '').strip()
    price_raw = row.get('price', '0').strip()
    image_file = row.get('image link', '').strip()
    description = row.get('description', '').strip()

    try:
        price = round(float(price_raw) * 4, 2)
    except:
        price = 0.0

    # Match image
    img_key = image_file.strip().lower()
    if img_key and img_key in available_images:
        actual = available_images[img_key]
        src = os.path.join(IMAGES_SRC, actual)
        dst = os.path.join(IMAGES_DEST, actual)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
        image_path = f'/images/{actual}'
        copied += 1
        print(f'  [{pid}] OK   {name[:50]:<50} -> {actual}')
    else:
        image_path = '/images/product-1.jpg'
        missing += 1
        print(f'  [{pid}] MISS {name[:50]:<50} -> NOT FOUND: {image_file}')

    category = get_category(name, description)
    badge = get_badge(name)
    badge_line = f'\n    "badge": "{badge}",' if badge else ''

    block = f'''  {{
    "id": {pid},
    "name": "{esc(name)}",
    "price": {price},
    "image": "{image_path}",
    "category": "{category}",
    "description": "{esc(description[:200])}",{badge_line}
    "featured": false,
    "inStock": true
  }}'''
    new_product_blocks.append(block)

print(f'\nMatched: {copied} | Missing: {missing}')

# Append to products.js — insert before the closing ];
insert_point = existing_js.rfind('\n];')
if insert_point == -1:
    print('ERROR: Could not find ]; in products.js')
else:
    new_js = (
        existing_js[:insert_point]
        + ',\n'
        + ',\n'.join(new_product_blocks)
        + existing_js[insert_point:]
    )
    with open(PRODUCTS_JS, 'w', encoding='utf-8') as f:
        f.write(new_js)
    total = len(re.findall(r'"id": \d+', new_js))
    print(f'products.js updated. Total products: {total}')
