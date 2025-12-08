import sqlite3
import os

db_path = "pipeline/transformed/transformed_data.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

program_id = "11.620"
cursor.execute("SELECT * FROM program_to_gwo WHERE program_id = ?", (program_id,))
rows = cursor.fetchall()
print(f"Mappings for {program_id}: {rows}")

cursor.execute("SELECT * FROM gwo LIMIT 5")
print("Sample GWOs:", cursor.fetchall())

conn.close()
