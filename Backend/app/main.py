from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.db.database_queries import get_detailed_articles_with_sentiments, get_single_detailed_article_with_sentiment
from app.firebase.database_firestore import db_firestore
from app.firebase.database_firestore_queries import add_suspicious_activity, get_all_suspicious_activities, delete_suspicious_activity, delete_suspicious_activities_by_solved, update_solved_status_for_all
from app.models.suspicious_activity import SuspiciousActivity
from app.script.log_evaluator import evaluate

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
LOGS/ARTICLES ENDPOINTS
"""

@app.get("/logs")
async def get_logs():
    rows = await get_detailed_articles_with_sentiments()
    return {"articles": rows}

@app.get("/logs/{article_id}")
async def get_single_log(article_id: int):
    article = await get_single_detailed_article_with_sentiment(article_id)
    return {"article": article}

"""
SUSPICIOUS ACTIVITY ENDPOINTS
"""

@app.get("/suspicious-activity")
async def list_activities():
    try:
        return get_all_suspicious_activities()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suspicious-activity")
async def report_activity(activity: SuspiciousActivity):
    try:
        doc_id = add_suspicious_activity(activity)
        return {"status": "ok", "id": doc_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/suspicious-activity/{doc_id}")
async def delete_activity(doc_id: str):
    try:
        delete_suspicious_activity(doc_id)
        return {"status": "deleted", "id": doc_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/suspicious-activity/mark")
async def mark_solved_status(current_status: bool, new_status: bool):
    try:
        update_solved_status_for_all(current_status, new_status)
        return {"status": "updated", "from": current_status, "to": new_status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/suspicious-activity/solved/{status}")
async def delete_activities_by_solved(status: bool):
    try:
        delete_suspicious_activities_by_solved(status)
        return {"status": "deleted_all", "solved": status}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suspicious-activity/evaluate-feed")
async def evaluate_feed():
    try:
        result = await evaluate()
        return {"status": "ok", "message": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


"""
Day one bro
"""
@app.get("/")
def main():
    return {"message": "Hello from FastAPI"}
