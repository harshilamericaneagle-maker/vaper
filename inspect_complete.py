import csv
import os
import shutil

CSV_COMPLETE = r'C:\Users\harsh\Downloads\products_sheet_master_complete.csv'
CSV_EXISTING = r'C:\Users\harsh\Downloads\products_sheet_master_updated.csv'
IMAGES_SRC = r'All images'
IMAGES_DEST = r'public\images'
PRODUCTS_JS = r'src\data\products.js'

# Load existing product names (already on website)
with open(CSV_EXISTING, encoding='utf-8-sig') as f:
    existing_rows = list(csv.DictReader(f))
existing_names = {r['name'].strip().lower() for r in existing_rows}
print(f'Already on website (from master_updated): {len(existing_names)} products')

# Load complete file
with open(CSV_COMPLETE, encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    all_rows = list(reader)
    cols = list(reader.fieldnames)
    print(f'Columns in complete file: {cols}')
    print(f'Total in complete file: {len(all_rows)}')

# Find new products
new_rows = [r for r in all_rows if r.get('name', '').strip().lower() not in existing_names]
print(f'New products to add: {len(new_rows)}')
print()
print('--- New products ---')
for r in new_rows:
    print(f"  {r.get('name','').strip()[:60]}")
    for k, v in r.items():
        print(f"    {k}: {str(v).strip()[:80]}")
    print()
