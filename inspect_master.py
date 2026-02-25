import csv

with open(r'C:\Users\harsh\Downloads\products_sheet_master_updated.csv', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    cols = list(reader.fieldnames)
    print('Columns:', cols)
    print('Total rows:', len(rows))
    print()
    for i, r in enumerate(rows[:5]):
        print(f'--- Row {i+1} ---')
        for k, v in r.items():
            print(f'  {k}: {str(v)[:100]}')
        print()
