![image](https://github.com/user-attachments/assets/93c188b6-abb2-4107-9da5-dff835a778b9)

# 🧾 Report Builder App

A full-stack  reporting tool built with **Next.js**, **Zustand**on the frontend and **FastAPI** with **SQLite** on the backend. This app allows users to compose beautiful reports from blocks (Text, Image, Table, Graph), save them, and retrieve them for preview or editing.

---

## 🚀 Getting Started

This project is structured into two main parts:

* **Frontend**: Next.js app in the `storefront/` folder
* **Backend**: FastAPI app in the `fast_api/` folder

> ⚙️ Both parts must be running for full functionality.

---

## 📦 Requirements

* Node.js `18+`
* Python `3.10+`
* `pnpm` (recommended for the frontend)

---

## 🔧 Backend (FastAPI)

### 1. Setup Virtual Environment

```bash
cd fast_api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` is missing, install manually:

```bash
pip install fastapi uvicorn sqlmodel
```

### 3. Run the Server

```bash
uvicorn main:app --reload --port 8000
```

This starts the FastAPI server on [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## 🎨 Frontend (Next.js)

### 1. Install Dependencies

```bash
cd apps/storefront
pnpm install
```

### 2. Run the Dev Server

```bash
pnpm dev
```

This starts the frontend on [http://localhost:3000](http://localhost:3000)

---

## 🛠 Features

* 🧱 Drag-and-drop styled layout builder
* 💾 Save layout to SQLite DB via FastAPI
* 📂 Load and preview saved layouts
* 🎲 Populate with sample data
* 🧠 Sentiment analysis hook (placeholder)

---

## 📁 Project Structure (Simplified)

```
repo-root/
├── apps/
│   └── storefront/              # Next.js app
├── fast_api/                    # FastAPI backend
│   ├── main.py                  # API routes and db logic
├── db.py                        # SQLModel models
└── README.md                    # This file
```

---

## 🔍 API Endpoints

* `GET /` — Hello from FastAPI ✅
* `GET /test-route` — Test status ✅
* `POST /layouts` — Save a layout ✅
* `GET /layouts` — List saved layouts ✅
* `GET /layouts/{id}` — Get full layout ✅
* `DELETE /layouts/{id}` — Delete layout ✅

---


