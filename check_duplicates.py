import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

count = 0
for p in programs:
    if p['id'] == '12.002':
        count += 1
        print(f"Found 12.002: gwo={p.get('gwo')}")

print(f"Total occurrences of 12.002: {count}")
