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

def update_solved_status_for_all(current_status: bool, new_status: bool):
    docs = db_firestore.collection("suspicious_activity").where("solved", "==", current_status).stream()
    for doc in docs:
        db_firestore.collection("suspicious_activity").document(doc.id).update({"solved": new_status})

def delete_suspicious_activities_by_solved(solved: bool):
    activities_ref = db_firestore.collection("suspicious_activity").where("solved", "==", solved).stream()
    for doc in activities_ref:
        db_firestore.collection("suspicious_activity").document(doc.id).delete()
