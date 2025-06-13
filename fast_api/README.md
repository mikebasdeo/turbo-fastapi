# 🌀 FastAPI Backend – Tetrix Take-Home Prep

This is a lightweight Python FastAPI backend used to process sentiment analysis from a sample article.

It includes:

* `/analyze-article` route to parse a `.txt` file and return sentiment
* `/test-route` for sanity checks
* `TextBlob`-based NLP processing
* CORS enabled for local frontend development (e.g. with Next.js)

---

## 🚀 Quickstart

### 1. 🐍 Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows
```

---

### 2. 📆 Install Requirements

```bash
pip install -r requirements.txt
```

> If you're using `TextBlob` for the first time:

```bash
python -m textblob.download_corpora
```

---

### 3. ▶️ Run the Server

```bash
python -m fast_api
```

This launches Uvicorn with hot reloading on:

```
http://127.0.0.1:8000
```

---

## 🧪 Available Routes

| Method | Route              | Description                                  |
| ------ | ------------------ | -------------------------------------------- |
| GET    | `/test-route`      | Returns a basic test JSON message            |
| GET    | `/analyze-article` | Returns sentiment + excerpt from article.txt |

---

## 🧠 Sentiment Logic

The file `sentiment.py` uses `TextBlob` to categorize text as:

* `positive` → polarity > 0.1
* `negative` → polarity < -0.1
* `neutral`  → otherwise

---

## 📝 File Structure

```
fast_api/
├── article.txt         # Input article (analyzed)
├── main.py             # FastAPI routes
├── sentiment.py        # Text analysis logic
├── __main__.py         # Allows `python -m fast_api`
└── requirements.txt    # Dependencies
```

---

## 🌍 CORS Enabled

The server includes permissive CORS for local testing:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to localhost:3000 if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ❤️ Maintained By

Built with intention and clarity as part of full-stack take-home prep.

---
