from firebase_admin import firestore

from app.models.suspicious_activity import SuspiciousActivity

db_firestore = firestore.client()

def get_all_suspicious_activities():
    activities_ref = db_firestore.collection("suspicious_activity").stream()
    return [
        {**doc.to_dict(), "id": doc.id}
        for doc in activities_ref
    ]

def add_suspicious_activity(activity: SuspiciousActivity):
    doc_ref = db_firestore.collection("suspicious_activity").add(activity.dict())
    return doc_ref[1].id

def delete_suspicious_activity(doc_id: str):
    db_firestore.collection("suspicious_activity").document(doc_id).delete()
