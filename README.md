# anyToJSON

Welcome to anyToJSON, a powerful SaaS tool designed to convert any unstructured or structured data into clean, standardized JSON format. Built with Next.js and utilizing GROQ AI, anyToJSON simplifies the process of transforming your data into a format that can be easily used in modern applications and APIs.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

anyToJSON is designed to handle a variety of input data formats, converting them seamlessly into JSON. Whether your data comes from text files, spreadsheets, or other sources, anyToJSON automates the process, saving you time and reducing errors.

## Features

- **Versatile Data Handling:** Supports a wide range of input data types, including text, CSV, and more.
- **Customizable Output:** Easily define the structure of your JSON output to fit your specific needs.
- **Efficiency:** Save time and reduce errors with automated data transformation.
- **Scalability:** Handle large datasets seamlessly.
- **Integration-Friendly:** Perfect for developers, analysts, and businesses needing to integrate diverse data sources.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CodeOne45/anyToJSON
   cd anyToJSON
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Run the development server:**
   ```bash
   yarn dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

### Defining the Input Data and JSON Format

anyToJSON requires two main inputs:
1. **Data:** The unstructured or structured data you want to convert.
2. **Format:** The JSON schema that defines the expected output structure.

### Example

#### Input

```json
{
    "data": "Order ID: 12345\nCustomer: Jane Doe\nEmail: jane.doe@example.com\nShipping Address: 123 Maple Street, Springfield, IL, 62704, USA\nBilling Address: 456 Oak Avenue, Springfield, IL, 62704, USA\nOrder Date: 2023-06-08\nItems:\n  - Product ID: A1B2C3\n    Product Name: Wireless Mouse\n    Quantity: 2\n    Price: 25.99\n  - Product ID: D4E5F6\n    Product Name: Mechanical Keyboard\n    Quantity: 1\n    Price: 89.99\nPayment Method: Credit Card\nCard Last Four Digits: 1234\nOrder Total: 141.97",
    "format": {
        "orderID": {
            "type": "string"
        },
        "customer": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "shippingAddress": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "zipCode": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }
                    }
                },
                "billingAddress": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string"
                        },
                        "city": {
                            "type": "string"
                        },
                        "state": {
                            "type": "string"
                        },
                        "zipCode": {
                            "type": "string"
                        },
                        "country": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "orderDate": {
            "type": "string"
        },
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "productID": {
                        "type": "string"
                    },
                    "productName": {
                        "type": "string"
                    },
                    "quantity": {
                        "type": "number"
                    },
                    "price": {
                        "type": "number"
                    }
                }
            }
        },
        "paymentMethod": {
            "type": "string"
        },
        "cardLastFourDigits": {
            "type": "string"
        },
        "orderTotal": {
            "type": "number"
        }
    }
}
```

#### Expected JSON Output

```json
{
    "orderID": "12345",
    "customer": {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "shippingAddress": {
            "street": "123 Maple Street",
            "city": "Springfield",
            "state": "IL",
            "zipCode": "62704",
            "country": "USA"
        },
        "billingAddress": {
            "street": "456 Oak Avenue",
            "city": "Springfield",
            "state": "IL",
            "zipCode": "62704",
            "country": "USA"
        }
    },
    "orderDate": "2023-06-08",
    "items": [
        {
            "productID": "A1B2C3",
            "productName": "Wireless Mouse",
            "quantity": 2,
            "price": 25.99
        },
        {
            "productID": "D4E5F6",
            "productName": "Mechanical Keyboard",
            "quantity": 1,
            "price": 89.99
        }
    ],
    "paymentMethod": "Credit Card",
    "cardLastFourDigits": "1234",
    "orderTotal": 141.97
}
```

### How to Use anyToJSON

1. **Submit your data and format:**
   - Provide your data in the `data` field and define your desired JSON structure in the `format` field.

2. **Process the data:**
   - anyToJSON uses GROQ AI to parse and convert the input data according to the specified format.

3. **Receive the output:**
   - The tool returns the data in the specified JSON format, ready for use.

### API Example

To use anyToJSON programmatically, you can send a POST request to the `/api/convert` endpoint with the data and format in the request body.

```json
{
    "orderID": "12345",
    "customer": {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "shippingAddress": {
            "street": "123 Maple Street",
            "city": "Springfield",
            "state": "IL",
            "zipCode": "62704",
            "country": "USA"
        },
        "billingAddress": {
            "street": "456 Oak Avenue",
            "city": "Springfield",
            "state": "IL",
            "zipCode": "62704",
            "country": "USA"
        }
    },
    "orderDate": "2023-06-08",
    "items": [
        {
            "productID": "A1B2C3",
            "productName": "Wireless Mouse",
            "quantity": 2,
            "price": 25.99
        },
        {
            "productID": "D4E5F6",
            "productName": "Mechanical Keyboard",
            "quantity": 1,
            "price": 89.99
        }
    ],
    "paymentMethod": "Credit Card",
    "cardLastFourDigits": "1234",
    "orderTotal": 141.97
}
```

## Contributing

We welcome contributions from the community. If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

With anyToJSON, converting diverse data into a usable JSON format has never been easier. Get started today and simplify your data processing workflows!