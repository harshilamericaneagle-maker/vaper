import csv
import json
import os
import re
import shutil

# Paths
csv_path = r'C:\Users\harsh\.gemini\antigravity\scratch\vaper\products_sheet_MASTER_WITH_PRICES_AND_IMAGES.csv'
js_path = r'C:\Users\harsh\.gemini\antigravity\scratch\vaper\src\data\products.js'
all_images_dir = r'C:\Users\harsh\.gemini\antigravity\scratch\vaper\All images'
public_images_dir = r'C:\Users\harsh\.gemini\antigravity\scratch\vaper\public\images'

def infer_category(name):
    name = name.lower()
    if any(k in name for k in ['glass', 'bong', 'pipe', 'rig', 'beaker', 'bowl']):
        return 'glass-pipes'
    if any(k in name for k in ['lighter', 'torch', 'blink', 'scorch', 'techno', 'pistol', 'gun']):
        return 'lighters-torches'
    if any(k in name for k in ['wrap', 'paper', 'raw', 'zig-zag', 'ocb', 'king palm', 'hemp', 'cone']):
        return 'papers-wraps'
    if any(k in name for k in ['grinder', 'wakit']):
        return 'grinders'
    if any(k in name for k in ['hookah', 'shisha']):
        return 'hookah'
    return 'accessories'

# 1. Load CSV data
csv_products = {}
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        csv_products[row['name'].strip()] = {
            'price': float(row['price']),
            'image': row['image link'].strip(),
            'description': row['description'].strip()
        }

# 2. Read products.js
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Match the products array
match = re.search(r'export const products = \[(.*?)\];', js_content, re.DOTALL)
if not match:
    print("Could not find products array in products.js")
    exit(1)

products_json_str = match.group(1)

# This is not perfect JSON, but let's try to parse individual objects
# or just do a regex replace for prices
new_js_content = js_content

# Update existing prices
def update_price(match):
    name_match = re.search(r'"name": "(.*?)"', match.group(0))
    if name_match:
        name = name_match.group(1).strip()
        if name in csv_products:
            new_price = csv_products[name]['price']
            # Multiplied by 4 because existing prices seem to be 4x of CSV?
            # Wait, user said "update all prices". CSV prices are $49.17 for ID 1.
            # Current ID 1 price is $196.68. $196.68 / 4 = $49.17.
            # user said "update all prices", usually means use the NEW prices.
            # If I use $49.17, the prices will drop significantly.
            # I will use the CSV price exactly as requested.
            return re.sub(r'"price": [\d.]+', f'"price": {new_price:.2f}', match.group(0))
    return match.group(0)

new_js_content = re.sub(r'\{[^{}]*?"name": "[^{}]*?price": [\d.]+.*?\}', update_price, new_js_content, flags=re.DOTALL)

# 3. Add new products (IDs 115-153)
# Get the last ID from the JS
last_id_match = re.findall(r'"id": (\d+)', new_js_content)
last_id = int(last_id_match[-1]) if last_id_match else 113

# Read CSV again to get products in order
new_products_list = []
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader, 1):
        if i >= 115:
            name = row['name'].strip()
            image_name = row['image link'].strip()
            price = float(row['price'])
            desc = row['description'].strip()
            
            # Match image to All images
            image_path = os.path.join(all_images_dir, image_name)
            if os.path.exists(image_path):
                shutil.copy2(image_path, os.path.join(public_images_dir, image_name))
            
            new_prod = {
                "id": i,
                "name": name,
                "price": price,
                "image": f"/images/{image_name}",
                "category": infer_category(name),
                "description": desc,
                "featured": False,
                "inStock": True
            }
            new_products_list.append(new_prod)

# Append new products to the array in JS
new_products_str = ""
for prod in new_products_list:
    new_products_str += ",\n  " + json.dumps(prod, indent=2).replace('\n', '\n  ')

# Insert before the closing bracket of the array
# We need to find the REAL closing bracket of the products array
# The regex split might be safer
parts = re.split(r'(\n\];)', new_js_content)
if len(parts) >= 3:
    # Append to the second to last part (the content before ];)
    parts[0] += new_products_str
    final_content = "".join(parts)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    print(f"Updated prices and added {len(new_products_list)} new products.")
else:
    print("Could not find the end of the products array.")
