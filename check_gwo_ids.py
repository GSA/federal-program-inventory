import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

count = 0
for p in programs:
    if p.get('gwo') and not p['gwo'].get('id'):
        print(f"Program {p['id']} has GWO but no ID: {p['gwo']}")
        count += 1

print(f"Total programs with GWO but no ID: {count}")
