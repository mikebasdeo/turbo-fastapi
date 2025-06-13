from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fast_api.sentiment import analyze_sentiment
from fastapi.responses import JSONResponse
from fast_api.db import create_db_and_tables
from fast_api.db import Layout, get_session
import json
import os





app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI and uv!"}

@app.get("/test-route")
def test_route():
    return JSONResponse(
        status_code=200,
        content={"message": "✅ Success! Test route reached."}
    )

@app.get("/analyze-article")
def analyze_article():
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, "article.txt")

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    sentiment = analyze_sentiment(content)

    return {
        "sentiment": sentiment,
        "length": len(content),
        "excerpt": content[:120] + "..."
    }
# 🆕 working - retrieves data to console and saves to a file, but not SQLlite DB.
# @app.post("/layouts")
# async def save_layout(request: Request):
#     layout_data = await request.json()

#     print("\n🟣 --- Incoming Layout Save ---")
#     print(f"🔢 Block Count: {len(layout_data.get('layout', []))}")
    
#     for i, block in enumerate(layout_data.get("layout", []), start=1):
#         print(f"\n🔹 Block #{i}")
#         print(f"   • ID: {block.get('id')}")
#         print(f"   • Type: {block.get('type')}")
#         print(f"   • Title: {block.get('data', {}).get('title')}")
#         print(f"   • Data: {block.get('data')}")

#     # Save to file (optional fallback)
#     with open("saved_layout.json", "w", encoding="utf-8") as f:
#         import json
#         json.dump(layout_data, f, indent=2)

#     print("✅ Layout successfully written to saved_layout.json\n")

#     return {"status": "success", "message": "Layout saved"}
@app.post("/layouts")
async def save_layout(request: Request):
    layout_data = await request.json()

    layout_json = json.dumps(layout_data.get("layout", []))
    summary_text = layout_data.get("summary", "")

    print("📝 Incoming Summary:", repr(summary_text))  # 👈 This will log it out cleanly

    layout = Layout(name="AutoLayout", data=layout_json, summary=summary_text)

    with get_session() as session:
        session.add(layout)
        session.commit()
        session.refresh(layout)

    return {"status": "success", "layout_id": layout.id}

@app.get("/layouts")
def list_layouts():
    with get_session() as session:
        layouts = session.query(Layout).order_by(Layout.created_at.desc()).all()
        return [{"id": l.id, "name": l.name, "created_at": l.created_at} for l in layouts]
@app.delete("/layouts/{layout_id}")

def delete_layout(layout_id: int):
    with get_session() as session:
        layout = session.query(Layout).filter(Layout.id == layout_id).first()
        if not layout:
            return {"status": "error", "message": "Layout not found"}
        session.delete(layout)
        session.commit()
        return {"status": "deleted", "id": layout_id}

@app.get("/layouts/{layout_id}")
def get_layout(layout_id: int):
    with get_session() as session:
        layout = session.query(Layout).filter(Layout.id == layout_id).first()
        if not layout:
            return JSONResponse(status_code=404, content={"message": "Layout not found"})

        try:
            layout_data = json.loads(layout.data)
        except Exception:
            return JSONResponse(status_code=500, content={"message": "Error parsing layout data"})

        return {
            "id": layout.id,
            "name": layout.name,
            "layout": layout_data,
            "summary": layout.summary  # ✅ added
        }
