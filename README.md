# Federal Program Inventory (FPI)

[![GitHub Actions Status](https://github.com/GSA/federal-program-inventory/workflows/Build/badge.svg)](https://github.com/GSA/federal-program-inventory/actions)

## About the Federal Program Inventory

The [Federal Program Inventory (FPI)](https://fpi.omb.gov/) is a comprehensive, searchable tool providing critical information about Federal programs that offer grants, loans, and direct payments to individuals, governments, firms, and organizations. The FPI enhances government transparency and accessibility while fulfilling Congressional mandates to the Office of Management and Budget (OMB).

## Repository Architecture

This repository is organized into four main components that work together to create the FPI platform:

| Component | Description |
|-----------|-------------|
| [**data_processing**](data_processing/) | Contains the Extract, Transform, Load (ETL) pipeline that powers the FPI |
| [**indexer**](indexer/) | Processes transformed data into Elasticsearch for efficient searching |
| [**api**](api/) | FastAPI service exposing the Elasticsearch data to the website |
| [**website**](website/) | Jekyll-based frontend for the public-facing FPI website |

## Data Flow Architecture

The FPI platform processes data through several stages:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Data Sources   │     │ data_processing │     │     indexer     │     │  API & Website  │
│                 │     │                 │     │                 │     │                 │
│ - SAM.gov       │ ──► │ - extract.py    │ ──► │ - Elasticsearch │ ──► │ - FastAPI       │
│ - USASpending   │     │ - transform.py  │     │   indexing      │     │ - Jekyll Site   │
│ - Treasury      │     │ - load.py       │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Getting Started with ETL

### Prerequisites

- Python 3.8+
- Docker and Docker Compose
- Git

### Quick Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/GSA/federal-program-inventory.git
   cd federal-program-inventory
   ```

2. Set up a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Start the development environment:
   ```bash
   docker-compose up
   ```

## ETL Process in Detail

### 1. Extract (data_processing/extract.py)

The extraction process pulls data from multiple sources:

- **SAM.gov**: Assistance Listings via API calls
- **USASpending.gov**: Award data archives (potentially 400+ GB when uncompressed)
- **Additional Sources**: Tax expenditures, improper payment data, etc.

Key extraction functions:
- `extract_assistance_listing()`: Pulls Assistance Listings from SAM.gov
- `extract_usaspending_award_hashes()`: Generates search hashes for USASpending.gov links
- `extract_categories_from_pdf()`: Extracts program categories from SAM.gov PDF

### 2. Transform (data_processing/transform.py)

The transformation process converts raw data into a structured format:

- Cleans and standardizes data from various sources
- Aggregates financial information
- Generates relationships between programs and agencies
- Stores processed data in SQLite database (`transformed/transformed_data.db`)

### 3. Load (data_processing/load.py)

The loading process:

- Generates markdown files for Jekyll website
- Creates program pages with standardized metadata
- Prepares data for Elasticsearch indexing

### 4. Indexing (indexer/index_programs.py)

The indexer:

- Creates and configures Elasticsearch indices
- Loads processed program data
- Optimizes for search performance

## Deployment

The FPI platform uses GitHub Actions for CI/CD:

1. GitHub Actions builds three Docker images (website, API, indexer) upon commit to any `[stage]-release` branch
2. Deployment to environments requires manual triggering/confirmation on internal systems

See [.github/workflows](.github/workflows) for CI/CD configuration.

## Working with the Codebase

### Common ETL Tasks

- **Refreshing SAM.gov data**: Run functions in `extract.py` to update Assistance Listings
- **Processing USASpending data**: Use `transform.py` to load and process award data
- **Regenerating website content**: Use `load.py` to create new markdown files

### Development Tips

- Most data files are pre-committed to the repo to avoid large downloads
- The repository includes test data for development without running full ETL
- Use the Docker Compose setup for a complete local development environment

## Additional Resources

- See component-specific README files for detailed documentation
- Check [data_processing/README.md](data_processing/README.md) for comprehensive ETL documentation
- Review [website/README.md](website/README.md) for frontend development guidance

## License

This project is in the public domain within the United States.
