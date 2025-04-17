from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.db.database_queries import get_basic_articles, get_detailed_articles_with_sentiments
from app.firebase.database_firestore import db_firestore
from app.models.suspicious_activity import SuspiciousActivity

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/suspicious-activity")
async def list_activities():
    try:
        activities_ref = db_firestore.collection("suspicious_activity").stream()
        activities = [
            {**doc.to_dict(), "id": doc.id}
            for doc in activities_ref
        ]
        return activities
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/suspicious-activity")
async def report_activity(activity: SuspiciousActivity):
    try:
        doc_ref = db_firestore.collection("suspicious_activity").add(activity.dict())
        return {"status": "ok", "id": doc_ref[1].id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/suspicious-activity/{doc_id}")
async def delete_activity(doc_id: str):
    try:
        db_firestore.collection("suspicious_activity").document(doc_id).delete()
        return {"status": "deleted", "id": doc_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/database")
async def get_database_data():
    rows = await get_basic_articles()
    return {"articles": rows}

@app.get("/logs")
async def get_logs():
    rows = await get_detailed_articles_with_sentiments()
    return {"articles": rows}

@app.get("/logs/{article_id}")
async def get_single_log(article_id: int):
    rows = await get_detailed_articles_with_sentiments()
    for article in rows:
        if article["articles_id"] == article_id:
            return {"article": article}
    return {"article": None}

@app.get("/")
def main():
    return {"message": "Hello from FastAPI"}
