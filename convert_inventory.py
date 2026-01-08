import pandas as pd
import json
import re

# Read Excel file
df = pd.read_excel(r'C:\Users\harsh\.gemini\antigravity\scratch\vape-store\Vape accessories inventory.xlsx')
df = df.dropna(subset=['Description'])
df = df[df['Description'].str.strip() != '']
df = df[df['Price'] > 0]
df = df.fillna('')

print(f"Total valid products: {len(df)}")

# Categorize products based on description keywords
def categorize(desc):
    desc_lower = desc.lower()
    if any(x in desc_lower for x in ['vape', 'pod', 'puff', 'disposable', 'rechargeable', 'mod', 'tank', 'elf bar', 'lost mary', 'funky', 'geek']):
        return 'devices'
    elif any(x in desc_lower for x in ['coil', 'glass', 'drip', 'charger', 'battery', 'case', 'tip', 'cap']):
        return 'accessories'
    elif any(x in desc_lower for x in ['juice', 'liquid', 'salt', 'nic', 'flavor']):
        return 'e-liquids'
    elif any(x in desc_lower for x in ['grinder', 'pipe', 'paper', 'wrap', 'tray', 'lighter', 'torch', 'rolling', 'zig zag', 'raw', 'cone']):
        return 'smoking'
    else:
        return 'other'

# Determine badge based on price margin
def get_badge(cost, price, idx):
    if cost > 0 and price > 0:
        margin = (price - cost) / price
        if margin > 0.6:
            return 'hot'
        elif margin > 0.4:
            return 'sale'
    if idx < 20:
        return 'new'
    return None

# Build products list - import ALL products
products = []
for i, (idx, row) in enumerate(df.iterrows()):
    desc = str(row['Description']).strip()
    cost = float(row['Cost']) if row['Cost'] else 0
    price = float(row['Price']) if row['Price'] else 0
    barcode = str(row['Barcode']).strip() if row['Barcode'] else ''
    
    category = categorize(desc)
    badge = get_badge(cost, price, i)
    
    # Calculate sale price if there's a good margin
    sale_price = None
    if cost > 0 and price > cost * 1.5:
        sale_price = round(price * 0.85, 2)  # 15% off
    
    product = {
        'id': i + 1,
        'name': desc.upper()[:60],  # Limit name length
        'category': category,
        'price': round(price, 2),
        'salePrice': sale_price,
        'barcode': barcode if barcode and barcode != 'nan' else None,
        'badge': badge,
        'description': f'{desc} - Premium quality product from our inventory.',
        'inStock': True,
        'featured': i < 16  # First 16 are featured
    }
    products.append(product)

# Generate JavaScript file content
js_content = '''// Product data imported from inventory Excel file
// Auto-generated from "Vape accessories inventory.xlsx"

export const products = '''

js_content += json.dumps(products, indent=2)
js_content += '''

export const categories = [
  { id: "all", name: "All Products", icon: "grid" },
  { id: "devices", name: "Vape Devices", icon: "zap" },
  { id: "accessories", name: "Accessories", icon: "settings" },
  { id: "e-liquids", name: "E-Liquids", icon: "droplet" },
  { id: "smoking", name: "Smoking Accessories", icon: "flame" },
  { id: "other", name: "Other Products", icon: "package" },
  { id: "sale", name: "On Sale", icon: "tag" }
];

export const featuredCollections = [
  {
    id: 1,
    title: "Vape Devices",
    description: "Premium vaporizers and pods",
    image: "/images/collection-devices.jpg",
    link: "/products?category=devices"
  },
  {
    id: 2,
    title: "Accessories",
    description: "Everything you need",
    image: "/images/collection-accessories.jpg",
    link: "/products?category=accessories"
  }
];
'''

# Write to file
with open(r'C:\Users\harsh\.gemini\antigravity\scratch\vape-store\src\data\products.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {len(products)} products to products.js")
print(f"\nCategory breakdown:")
from collections import Counter
cats = Counter([p['category'] for p in products])
for cat, count in cats.items():
    print(f"  {cat}: {count}")
