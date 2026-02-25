import csv
import os
import shutil
import json
import re

CSV_PATH = r'C:\Users\harsh\Downloads\products_sheet_master_updated.csv'
IMAGES_SRC = r'All images'
IMAGES_DEST = r'public\images'
PRODUCTS_JS = r'src\data\products.js'

os.makedirs(IMAGES_DEST, exist_ok=True)

# Build a set of available images (lowercase for case-insensitive matching)
available_images = {f.lower(): f for f in os.listdir(IMAGES_SRC) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))}
print(f'Available images in folder: {len(available_images)}')

with open(CSV_PATH, encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f'Products in CSV: {len(rows)}')
print()

# Category mapping based on keywords in name/description
def get_category(name, desc):
    name_l = name.lower()
    desc_l = desc.lower()
    combined = name_l + ' ' + desc_l
    if any(w in combined for w in ['pipe', 'bong', 'bubbler', 'percolator', 'beaker', 'water pipe']):
        return 'glass-pipes'
    if any(w in combined for w in ['wrap', 'rolling paper', 'roll', 'leaf wrap', 'blunt']):
        return 'papers-wraps'
    if any(w in combined for w in ['grinder', 'herb grinder']):
        return 'grinders'
    if any(w in combined for w in ['lighter', 'torch']):
        return 'lighters-torches'
    if any(w in combined for w in ['candle', 'odor']):
        return 'accessories'
    if any(w in combined for w in ['ashtray']):
        return 'accessories'
    if any(w in combined for w in ['hookah']):
        return 'hookah'
    if any(w in combined for w in ['silicone', 'metal pipe', 'hand pipe', 'stash', 'jar', 'tray', 'kit', 'case', 'tip', 'connector', 'mouthpiece', 'pepper spray', 'box']):
        return 'accessories'
    return 'accessories'

def get_badge(name, price):
    name_l = name.lower()
    if any(w in name_l for w in ['rick and morty', 'novelty', 'skull', 'camo', 'rhinestone', 'bling']):
        return 'hot'
    if price < 10:
        return 'sale'
    return ''

products = []
copied = 0
missing = 0

for i, row in enumerate(rows):
    name = row.get('name', '').strip()
    price_raw = row.get('price', '0').strip()
    image_file = row.get('image link', '').strip()
    description = row.get('description', '').strip()

    # Price: use as-is (already 4x in the sheet, or apply 4x here)
    try:
        price = round(float(price_raw) * 4, 2)
    except:
        price = 0.0

    # Match image
    image_path = ''
    if image_file:
        img_key = image_file.strip().lower()
        if img_key in available_images:
            actual_filename = available_images[img_key]
            # Copy to public/images
            src = os.path.join(IMAGES_SRC, actual_filename)
            dst = os.path.join(IMAGES_DEST, actual_filename)
            if not os.path.exists(dst):
                shutil.copy2(src, dst)
            image_path = f'/images/{actual_filename}'
            copied += 1
            print(f'  [{i+1:3}] OK  {name[:45]:<45} -> {actual_filename}')
        else:
            missing += 1
            print(f'  [{i+1:3}] MISS {name[:45]:<45} -> NOT FOUND: {image_file}')
            image_path = '/images/product-1.jpg'
    else:
        missing += 1
        image_path = '/images/product-1.jpg'

    category = get_category(name, description)
    badge = get_badge(name, price)

    product = {
        "id": i + 1,
        "name": name,
        "price": price,
        "image": image_path,
        "category": category,
        "description": description,
        "badge": badge,
        "featured": i < 8,
        "inStock": True,
    }
    products.append(product)

print()
print(f'Matched: {copied} | Missing: {missing}')

# Generate JS
def to_js_obj(p):
    def esc(s):
        return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ')
    badge_str = f'"badge": "{p["badge"]}",' if p["badge"] else ''
    return f'''  {{
    "id": {p["id"]},
    "name": "{esc(p["name"])}",
    "price": {p["price"]},
    "image": "{p["image"]}",
    "category": "{p["category"]}",
    "description": "{esc(p["description"][:200])}",
    {f'"badge": "{p["badge"]}",' if p["badge"] else ''}
    "featured": {"true" if p["featured"] else "false"},
    "inStock": true
  }}'''

js_content = '''// Product data - generated from products_sheet_master_updated.csv

export const products = [
''' + ',\n'.join(to_js_obj(p) for p in products) + '''
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
    f.write(js_content)

print(f'\nWrote {len(products)} products to {PRODUCTS_JS}')
