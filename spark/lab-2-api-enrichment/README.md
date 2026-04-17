# Lab 2: ETL Enrichment - "The Global Revenue Gap" 🔄

## 📈 The Requirement
GlobalGear Inc. has expanded into Europe and Japan. While all internal sales are recorded in **USD**, the regional CFOs need reports in their local currencies (**EUR**, **GBP**, **JPY**) to assess market performance.

## 🚧 The Data Gap
Our sales systems do **not** store historical exchange rates. We have:
1.  `sales.csv`: A large list of local transactions in USD.
2.  **External API**: Access to real-time market data via RapidAPI.

## 🎯 Your Mission
You need to build a robust **ETL Pipeline** (Extract, Transform, Load) using Spark that:
1.  **Extracts** live exchange rates from a public API.
2.  **Transforms** the raw sales data by joining it with the API rates and calculating regional totals.
3.  **Cleans** the data (handling nulls, duplicates, and outliers).
4.  **Loads** the final "Gold" dataset into a high-performance Parquet format for the BI team.

---

## 🚀 Get Started
Follow the detailed **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** to set up your API connection and build your Spark enrichment pipeline. 
