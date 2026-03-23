# Lab 1: The API Bottleneck

## 🚨 The Situation
You are building a tool that needs to fetch the prices from 20 different cryptocurrency exchanges. Every API takes about 1 second to respond. 

## 🎯 The Challenge
You need to demonstrate how much time you can save by moving from a **Synchronous** approach to an **Asynchronous** approach.

**Requirements:**
1. Create a script that "simulates" fetching 20 URLs.
2. The **Synchronous** version must use the `requests` library.
3. The **Asynchronous** version must use `asyncio` and `aiohttp`.
4. Measure the total time for both versions.

## ❓ The Problem to Solve
If each request takes 1 second, the Synchronous version will take 20 seconds. How do you use `asyncio.gather()` to make the Asynchronous version take significantly less time (close to 1 second total)?

---
*Check `guide_to_solution.md` when you are ready to see the code.*
