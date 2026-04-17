# Lab 1: Incident Response - "NexusShop is Down!" 🚨

## 🆘 The Crisis
At 3:00 PM on a Friday, the NexusShop e-commerce platform started rejecting customer checkouts. The "gateway" service is reporting high latency, and users are stuck on loading screens. The CTO has declared a 'Level 1' incident.

## 📁 The Data
Your servers have dumped millions of lines of JSON logs. Each log record contains:
- `timestamp`: Event time.
- `service`: Which microservice logged the event.
- `status`: The HTTP status code of the response.
- `response_time_ms`: How long the request took.
- `trace_id`: To correlate requests across services.

## 🎯 Your Mission
Standard analysis tools are crashing because the log files are too large. You must use **Apache Spark** to:
1.  **Identify** which service is the root cause of the failure (it's not always the one reporting the error!).
2.  **Pinpoint** the exact time the failure started using time-windowing.
3.  **Correlate** if specific API paths or user-agents are involved in the crash.

---

## 🚀 Get Started
Follow the detailed **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** to build your simulator and your analysis pipeline. No code is provided—you are the lead engineer on this recovery!
