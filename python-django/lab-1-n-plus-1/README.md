# Lab: Solving the N+1 Query Problem in Django

This laboratory demonstrates how to identify and solve the **N+1 query problem** using the Django ORM. The N+1 problem occurs when an application makes one initial database query (the "1") and then executes additional queries for each record returned (the "N"), leading to significant performance degradation.

## 🚀 Environment Setup

### 1. Prerequisites
Ensure you have **Python 3.10+** and **Conda** (or `venv`) installed.

### 2. Create the Environment
Navigate to the `exersive` directory and create the Conda environment using the provided YAML file:
```bash
cd exersive
conda env create -f environment.yml
conda activate django_n_plus_issue
```

---

## 🛠️ Project Initialization

### 1. Apply Migrations
Navigate to the Django project root (`n_plus_one_query`) and set up the database:
```bash
cd n_plus_one_query
python manage.py migrate
```

### 2. Populate the Database
We have provided a custom management command to generate 20 sample users and roughly 1,000 orders to visualize the performance impact:
```bash
python manage.py populate
```

---

## 🧪 Testing the Lab

Run the development server:
```bash
python manage.py runserver
```

### 🔍 Scenario 1: The N+1 Problem
Open your browser and navigate to:
`http://127.0.0.1:8000/orders/`

1.  Look at the **Django Debug Toolbar** sidebar on the right.
2.  Open the **SQL** panel.
3.  **Observation**: You will see hundreds of individual queries like `SELECT ... FROM auth_user WHERE id = ...`. This happens because for every order, Django hits the database again to fetch the customer's username.

### ⚡ Scenario 2: Optimized Query
Now navigate to:
`http://127.0.0.1:8000/orders/optimized`

1.  Open the **SQL** panel in the toolbar again.
2.  **Observation**: You will see only **2 or 3 queries** instead of hundreds. 
3.  **How it works**: The optimized view uses `prefetch_related` (or `select_related`) to join the tables or fetch all related data in a single batch, eliminating the extra loops.

---

## 📖 Key Takeaways
- Use **`select_related()`** for `ForeignKey` or `OneToOne` relationships (performs a SQL JOIN).
- Use **`prefetch_related()`** for `ManyToMany` or reverse relationships (performs a second query with an `IN` clause).
- Always use the **Django Debug Toolbar** to audit your database hits during development.
