import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

for p in programs:
    if p['id'] == '11.620':
        print(json.dumps(p, indent=2))
        break
