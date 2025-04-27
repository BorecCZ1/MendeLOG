from app.db.database import db


def evaluate():
    db.connect_db()
    cursor = db.get_cursor()