import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("mendelog-c2fd0-firebase-adminsdk-fbsvc-e26756fdd5.json")
firebase_admin.initialize_app(cred)
db_firestore = firestore.client()
