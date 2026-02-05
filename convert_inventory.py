import pandas as pd
import json
import re

# Read Excel file
import os
base_dir = os.path.dirname(os.path.abspath(__file__))
excel_path = os.path.join(base_dir, 'Vape accessories inventory.xlsx')
df = pd.read_excel(excel_path)
df = df.dropna(subset=['Description'])
df = df[df['Description'].str.strip() != '']
df = df[df['Price'] > 0]
df = df.fillna('')

print(f"Total valid products: {len(df)}")

# Detailed categories matching zeevapor.com
def categorize(desc):
    desc_lower = desc.lower()
    
    # Vape Devices
    if any(x in desc_lower for x in ['vape', 'pod', 'puff', 'disposable', 'rechargeable', 'mod', 'tank', 'elf bar', 'lost mary', 'funky', 'geek', 'airbar', 'hyde', 'fume', 'breeze']):
        return 'devices'
    
    # E-Liquids
    if any(x in desc_lower for x in ['juice', 'liquid', 'salt', 'nic', 'e-liquid', 'eliquid']):
        return 'e-liquids'
    
    # Ash Catchers
    if any(x in desc_lower for x in ['ash catcher', 'ashcatcher']):
        return 'ash-catchers'
    
    # Bangers
    if any(x in desc_lower for x in ['banger', 'quartz nail']):
        return 'bangers'
    
    # Carb Caps
    if any(x in desc_lower for x in ['carb cap', 'carbcap']):
        return 'carb-caps'
    
    # Coils
    if any(x in desc_lower for x in ['coil']):
        return 'coils'
    
    # Dab Station Accessories
    if any(x in desc_lower for x in ['dab station', 'dab tool', 'dab kit', 'dab rig', 'nectar collector']):
        return 'dab-accessories'
    
    # Dabbers
    if any(x in desc_lower for x in ['dabber', 'dab tool']):
        return 'dabbers'
    
    # Down Stems
    if any(x in desc_lower for x in ['down stem', 'downstem']):
        return 'down-stems'
    
    # Dunk Stations
    if any(x in desc_lower for x in ['dunk station', 'iso station']):
        return 'dunk-stations'
    
    # Flower Slides / Bowls
    if any(x in desc_lower for x in ['flower slide', 'bowl', 'slide']):
        return 'flower-slides'
    
    # Grinders
    if any(x in desc_lower for x in ['grinder']):
        return 'grinders'
    
    # Headdy Accessories (Heady Glass)
    if any(x in desc_lower for x in ['heady', 'headdy', 'art glass']):
        return 'heady-accessories'
    
    # Inserts
    if any(x in desc_lower for x in ['insert', 'ruby', 'sapphire']):
        return 'inserts'
    
    # Marbles / Terp Pearls
    if any(x in desc_lower for x in ['marble', 'terp pearl', 'pearl']):
        return 'marbles'
    
    # Mood Mats / Dab Mats
    if any(x in desc_lower for x in ['mood mat', 'dab mat', 'silicone mat']):
        return 'mood-mats'
    
    # Reclaim Catchers
    if any(x in desc_lower for x in ['reclaim', 'reclaimer', 'claim catcher']):
        return 'reclaim-catchers'
    
    # Spinner Caps
    if any(x in desc_lower for x in ['spinner cap', 'spinner']):
        return 'spinner-caps'
    
    # Glass / Pipes / Water Pipes
    if any(x in desc_lower for x in ['glass', 'water pipe', 'bong', 'bubbler', 'rig', 'pipe']):
        return 'glass-pipes'
    
    # Rolling Papers / Wraps
    if any(x in desc_lower for x in ['paper', 'wrap', 'rolling', 'zig zag', 'raw', 'cone', 'blunt']):
        return 'papers-wraps'
    
    # Lighters / Torches
    if any(x in desc_lower for x in ['lighter', 'torch', 'butane']):
        return 'lighters-torches'
    
    # Cleaners
    if any(x in desc_lower for x in ['cleaner', 'cleaning', '420', '710', 'iso', 'alcohol']):
        return 'cleaners'
    
    # Storage / Containers
    if any(x in desc_lower for x in ['jar', 'container', 'stash', 'storage', 'bag']):
        return 'storage'
    
    # Scales
    if any(x in desc_lower for x in ['scale']):
        return 'scales'
    
    # Hookahs
    if any(x in desc_lower for x in ['hookah', 'shisha', 'al fakher', 'al-fakher', 'charcoal']):
        return 'hookah'
    
    # Cigars / Cigarillos
    if any(x in desc_lower for x in ['cigar', 'swisher', 'backwood', 'dutch', 'game', 'white owl', 'good time', 'acid', 'capone']):
        return 'cigars'
    
    # General Accessories
    if any(x in desc_lower for x in ['tip', 'cap', 'filter', 'screen', 'adapter']):
        return 'accessories'
    
    return 'other'

# Determine badge based on price margin
def get_badge(cost, price, idx):
    if cost > 0 and price > 0:
        margin = (price - cost) / price
        if margin > 0.6:
            return 'hot'
        elif margin > 0.4:
            return 'sale'
    if idx < 50:
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
  { id: "e-liquids", name: "E-Liquids", icon: "droplet" },
  { id: "glass-pipes", name: "Glass & Pipes", icon: "wind" },
  { id: "grinders", name: "Grinders", icon: "settings" },
  { id: "papers-wraps", name: "Papers & Wraps", icon: "file" },
  { id: "lighters-torches", name: "Lighters & Torches", icon: "flame" },
  { id: "bangers", name: "Bangers", icon: "circle" },
  { id: "carb-caps", name: "Carb Caps", icon: "disc" },
  { id: "coils", name: "Coils", icon: "refresh-cw" },
  { id: "dab-accessories", name: "Dab Accessories", icon: "tool" },
  { id: "dabbers", name: "Dabbers", icon: "edit-3" },
  { id: "down-stems", name: "Down Stems", icon: "arrow-down" },
  { id: "flower-slides", name: "Flower Slides", icon: "square" },
  { id: "ash-catchers", name: "Ash Catchers", icon: "filter" },
  { id: "reclaim-catchers", name: "Reclaim Catchers", icon: "save" },
  { id: "inserts", name: "Inserts", icon: "plus-circle" },
  { id: "marbles", name: "Marbles & Pearls", icon: "circle" },
  { id: "spinner-caps", name: "Spinner Caps", icon: "rotate-cw" },
  { id: "mood-mats", name: "Mood Mats", icon: "square" },
  { id: "heady-accessories", name: "Heady Accessories", icon: "star" },
  { id: "dunk-stations", name: "Dunk Stations", icon: "inbox" },
  { id: "cleaners", name: "Cleaners", icon: "droplet" },
  { id: "storage", name: "Storage", icon: "box" },
  { id: "scales", name: "Scales", icon: "sliders" },
  { id: "hookah", name: "Hookah & Shisha", icon: "cloud" },
  { id: "cigars", name: "Cigars", icon: "minus" },
  { id: "accessories", name: "Accessories", icon: "package" },
  { id: "other", name: "Other Products", icon: "more-horizontal" },
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
    title: "Glass & Pipes",
    description: "Quality glass pieces",
    image: "/images/collection-glass.jpg",
    link: "/products?category=glass-pipes"
  },
  {
    id: 3,
    title: "Grinders",
    description: "Premium grinders",
    image: "/images/collection-grinders.jpg",
    link: "/products?category=grinders"
  },
  {
    id: 4,
    title: "Dab Accessories",
    description: "Everything for dabbing",
    image: "/images/collection-dab.jpg",
    link: "/products?category=dab-accessories"
  }
];
'''

# Write to file
output_path = os.path.join(base_dir, 'src', 'data', 'products.js')
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"\nSuccessfully wrote {len(products)} products to products.js")
print(f"\nCategory breakdown:")
from collections import Counter
cats = Counter([p['category'] for p in products])
for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
    print(f"  {cat}: {count}")
