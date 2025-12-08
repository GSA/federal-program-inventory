import os
import json
import sqlite3
import datetime
import load
import constants

# Configuration
OUTPUT_DIR = os.path.join(os.getcwd(), "data")
DB_FILE_PATH = os.path.join("pipeline", "transformed", "transformed_data.db")
FISCAL_YEARS = ['2023', '2024', '2025']
CURRENT_FISCAL_YEAR = constants.FISCAL_YEAR

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def save_json(data, filename):
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, separators=(',', ':'))
    print(f"Saved {filename}")

def main():
    print("Starting data export...")
    ensure_dir(OUTPUT_DIR)
    ensure_dir(os.path.join(OUTPUT_DIR, "programs"))

    try:
        conn = sqlite3.connect(DB_FILE_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        # 1. Generate Program Data
        print("Generating program data...")
        programs_data = load.generate_program_data(cursor, FISCAL_YEARS)
        
        # Save individual program files
        print(f"Saving {len(programs_data)} individual program files...")
        for program in programs_data:
            save_json(program, f"programs/{program['id']}.json")

        # Save all programs summary list (for search/listing)
        # We'll strip down the data to just what's needed for the list view to keep file size down
        programs_summary = []
        for p in programs_data:
            programs_summary.append({
                'id': p['id'],
                'title': p['name'],
                'agency': p['top_agency_name'],
                'sub_agency': p['sub_agency_name'],
                'popular_name': p['popular_name'],
                'applicant_types': p['applicant_types'],
                'assistance_types': p['assistance_types'],
                'applicant_types': p['applicant_types'],
                'assistance_types': p['assistance_types'],
                'categories': p['categories'],
                'gwo': p['gwo']
            })
        save_json(programs_summary, "programs.json")

        # 1b. Generate Agencies Data (with counts)
        print("Generating agencies data...")
        agency_counts = {}
        for p in programs_data:
            agency_name = p['top_agency_name']
            if agency_name:
                if agency_name not in agency_counts:
                    agency_counts[agency_name] = {'name': agency_name, 'program_count_rollup': 0}
                agency_counts[agency_name]['program_count_rollup'] += 1
        
        agencies_list = sorted(list(agency_counts.values()), key=lambda x: x['name'])
        save_json(agencies_list, "agencies.json")

        # 2. Generate Shared Data (Filters, etc.)
        print("Generating shared data...")
        shared_data = load.generate_shared_data(cursor)
        save_json(shared_data, "filters.json")

        # 3. Generate Categories
        print("Generating categories...")
        # We can reuse the shared_data['categories'] or generate more detailed stats if needed
        # For now, let's use the hierarchy from shared_data
        save_json(shared_data['categories'], "categories.json")

        # 4. Generate Metadata
        metadata = {
            "generated_at": datetime.datetime.now().isoformat(),
            "fiscal_years": FISCAL_YEARS,
            "current_fiscal_year": CURRENT_FISCAL_YEAR
        }
        save_json(metadata, "metadata.json")

        print("Data export completed successfully.")

    except sqlite3.Error as e:
        print(f"Database error occurred: {e}")
        raise e
    except Exception as e:
        print(f"An error occurred: {e}")
        raise e
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    main()
