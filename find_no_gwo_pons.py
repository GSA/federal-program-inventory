import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

print(f"{'Program ID':<15} | {'Program Title'}")
print("-" * 100)

count = 0
for p in programs:
    # Check if gwo is missing or empty, AND pons is missing or empty
    has_gwo = bool(p.get('gwo'))
    has_pons = bool(p.get('pons') and len(p.get('pons')) > 0)
    
    if not has_gwo and not has_pons:
        print(f"{p['id']:<15} | {p['title']}")
        count += 1
        if count >= 5:
            break
