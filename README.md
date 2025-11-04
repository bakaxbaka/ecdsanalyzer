# Bitcoin ECDSA Analyzer

A comprehensive web application for analyzing Bitcoin transactions, detecting ECDSA signature vulnerabilities, and recovering private keys from weak signatures.

## Features

- **Transaction Analysis**: Analyze Bitcoin transactions for weak ECDSA signatures and nonce reuse
- **Address Analysis**: Examine Bitcoin addresses for transaction history and signature patterns
- **ECDSA Calculator**: Perform ECDSA calculations and private key recovery
- **Block Scanner**: Scan Bitcoin blocks for vulnerable transactions
- **Standalone Calculator**: Offline-capable ECDSA calculator

## Installation

### Prerequisites

- Python 3.9 or higher
- pip or uv package manager

### Install Dependencies

```bash
# Using pip
pip install -r requirements.txt

# Or using the pyproject.toml
pip install -e .
```

## Running the Application

### Development Mode

```bash
# Using Flask development server
python3 main.py

# Or directly with app.py
python3 app.py
```

### Production Mode

```bash
# Using Gunicorn (recommended for production)
gunicorn --bind 0.0.0.0:5000 --reuse-port --reload main:app
```

The application will be available at `http://localhost:5000`

## Project Structure

```
.
├── app.py                          # Main Flask application
├── main.py                         # Application entry point
├── btc_analyzer.py                 # Bitcoin transaction analyzer
├── logging_config.py               # Logging configuration
├── block_scanner.py                # Block scanning functionality
├── block_transaction_hunter.py     # Transaction hunting utilities
├── requirements.txt                # Python dependencies
├── pyproject.toml                  # Project configuration
├── templates/                      # HTML templates
│   ├── base.html                   # Base template
│   ├── index.html                  # Home page
│   ├── transaction.html            # Transaction analysis page
│   ├── address.html                # Address analysis page
│   ├── ecdsa_analysis.html         # ECDSA calculator page
│   └── standalone_calculator.html  # Standalone calculator page
└── static/                         # Static assets
    ├── css/
    │   └── style.css               # Application styles
    ├── js/
    │   └── main.js                 # JavaScript utilities
    └── ecdsa_standalone.html       # Downloadable calculator
```

## API Endpoints

### Transaction Analysis
- `POST /api/analyze/transaction` - Analyze a Bitcoin transaction
  ```json
  {
    "tx_id": "transaction_hash"
  }
  ```

### Address Analysis
- `POST /api/analyze/address` - Analyze a Bitcoin address
  ```json
  {
    "address": "bitcoin_address"
  }
  ```

### ECDSA Analysis
- `POST /api/analyze/ecdsa` - Perform ECDSA calculations
  ```json
  {
    "tx_id": "transaction_hash"  // Auto-extract parameters
  }
  ```
  Or with manual parameters:
  ```json
  {
    "r1": "hex_value",
    "s1": "hex_value",
    "m1": "hex_value",
    "r2": "hex_value",
    "s2": "hex_value",
    "m2": "hex_value"
  }
  ```

### Block Scanning
- `GET /api/auto-scan` - Scan latest block for weak signatures
- `POST /api/search-block-transactions` - Search blocks for vulnerabilities
  ```json
  {
    "start_block": "block_hash_or_number",
    "max_blocks": 10
  }
  ```

## Security & Legal Notice

⚠️ **Educational Purpose Only**

This tool is designed for educational and research purposes to understand ECDSA vulnerabilities in Bitcoin transactions. 

- Always respect privacy and legal boundaries
- Do not use this tool for malicious purposes
- Unauthorized access to others' private keys is illegal
- Use responsibly and ethically

## How It Works

### Nonce Reuse Detection

The analyzer detects when the same nonce (k) is used in multiple ECDSA signatures. When this occurs, the private key can be calculated using:

```
k = (m1 - m2) / (s1 - s2) mod n
x = (s * k - m) / r mod n
```

Where:
- `k` = nonce (signing secret)
- `x` = private key
- `r, s` = signature components
- `m` = message hash
- `n` = curve order

### Weak Signature Detection

The tool identifies signatures with:
- Low r or s values
- Repeated nonce usage across transactions
- Other ECDSA implementation vulnerabilities

## Troubleshooting

### Missing Dependencies

If you encounter import errors, ensure all dependencies are installed:

```bash
pip install -r requirements.txt
```

### Port Already in Use

If port 5000 is already in use, specify a different port:

```bash
gunicorn --bind 0.0.0.0:8000 main:app
```

### Template Not Found Errors

Ensure the `templates/` and `static/` directories exist with all required files.

## Contributing

This is an educational project. Contributions for improving security analysis capabilities are welcome.

## License

See LICENSE file for details.

## Acknowledgments

- Bitcoin Core developers
- ECDSA cryptography researchers
- Security research community
