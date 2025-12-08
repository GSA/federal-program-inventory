import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

for p in programs:
    if p['id'] == '12.002':
        print(json.dumps(p, indent=2))
        break
