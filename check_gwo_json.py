import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

# Check 12.002
for p in programs:
    if p['id'] == '12.002':
        print(f"Program 12.002 GWO: {p.get('gwo')}")
        break

# Count B5
b5_count = 0
b5_programs = []
for p in programs:
    if p.get('gwo') and p['gwo'].get('id') == 'B5':
        b5_count += 1
        b5_programs.append(p['id'])

print(f"Total programs with GWO B5: {b5_count}")
print(f"Programs with GWO B5: {b5_programs}")
