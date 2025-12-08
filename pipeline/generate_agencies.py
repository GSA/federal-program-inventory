import json
import os

def generate_agencies():
    programs_path = os.path.join("data", "programs.json")
    agencies_path = os.path.join("data", "agencies.json")

    if not os.path.exists(programs_path):
        print("programs.json not found")
        return

    with open(programs_path, 'r') as f:
        programs = json.load(f)

    agency_counts = {}
    for p in programs:
        agency_name = p.get('agency')
        if agency_name:
            if agency_name not in agency_counts:
                agency_counts[agency_name] = {'name': agency_name, 'program_count_rollup': 0}
            agency_counts[agency_name]['program_count_rollup'] += 1
    
    import re
    def slugify(text):
        return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

    agencies_list = []
    for name, data in agency_counts.items():
        slug = slugify(name)
        agencies_list.append({
            'id': slug,
            'name': name,
            'slug': slug,
            'program_count': data['program_count_rollup'],
            'program_count_rollup': data['program_count_rollup'],
            'parent_id': None
        })
    
    agencies_list.sort(key=lambda x: x['name'])
    
    with open(agencies_path, 'w') as f:
        json.dump(agencies_list, f, separators=(',', ':'))
    
    print(f"Generated {agencies_path} with {len(agencies_list)} agencies")

if __name__ == "__main__":
    generate_agencies()
