import json

with open('data/programs.json', 'r') as f:
    programs = json.load(f)

count = 0
print(f"{'Program ID':<15} | {'Program Title':<50} | {'GWO Name'}")
print("-" * 100)

for p in programs:
    if p.get('gwo'):
        print(f"{p['id']:<15} | {p['title'][:47] + '...' if len(p['title']) > 47 else p['title']:<50} | {p['gwo']['name']}")
        count += 1
        if count >= 20:
            break
