# Federal Program Inventory (Pipeline)

## Overview
The [Federal Program Inventory (FPI)](https://fpi.omb.gov/) is a comprehensive tool with information about Federal programs.

**This repository has been refactored to serve exclusively as the data pipeline for the FPI.**
It extracts data from the underlying SQLite database, transforms it, and exports it as static JSON files.

## Architecture Changes
This project was previously a monolithic repository containing a Jekyll website, an Elasticsearch indexer, and an API.
It has been stripped down to its core purpose: **Data Generation**.

### Why the change?
1.  **Separation of Concerns**: The data generation logic is now completely decoupled from the presentation layer.
2.  **Modernization**: We switched from generating Markdown files (for Jekyll) to **JSON** files.
    *   **Markdown (Old)**: Stored data as JSON strings inside YAML frontmatter. This was inefficient and tied to Jekyll.
    *   **JSON (New)**: Raw, clean data that can be easily consumed by any modern frontend (React, Vue, etc.) or static site generator.
3.  **Simplicity**: All legacy code (`website`, `indexer`, `api`) has been removed to reduce noise and maintenance burden.

## Project Structure
*   `pipeline/`: Contains the Python scripts for Extract, Transform, and Load (ETL).
    *   `load.py`: Core logic for generating program data.
    *   `export_data.py`: The main entry point that orchestrates the export.
*   `data/`: The output directory where generated JSON files are stored.
*   `package.json`: Manages build scripts.

## How to Run
To regenerate the data:

```bash
npm run build:data
```

This command runs the Python pipeline and populates the `data/` directory with:
*   `programs.json`: A summary list of all programs.
*   `programs/{id}.json`: Detailed data for each individual program.
*   `filters.json`: Shared data for filtering (agencies, categories, etc.).
*   `metadata.json`: Build timestamp and fiscal year information.
