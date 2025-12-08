import json

try:
    with open('data/programs.json', 'r') as f:
        programs_data = json.load(f)
    
    target_id = "B5"
    print(f"Searching for GWO ID: {target_id}")
    
    valid_programs = []
    for p in programs_data:
        if p.get('gwo') and p['gwo'].get('id') == target_id:
            valid_programs.append(p)
            
    print(f"Found {len(valid_programs)} programs.")
    
    if len(valid_programs) > 0:
        print("First match GWO data:")
        print(json.dumps(valid_programs[0].get('gwo'), indent=2))
    else:
        print("No programs found.")

except Exception as e:
    print(f"Error: {e}")
