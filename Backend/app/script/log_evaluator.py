import os
from datetime import datetime, timezone

from dotenv import load_dotenv
import requests

from app.db.database import db
from app.db.database_queries import refresh_materialized_view_if_needed
from app.firebase.database_firestore_queries import add_suspicious_activity
from app.models.suspicious_activity import SuspiciousActivity

load_dotenv()
TEAMS_WEBHOOK_URL = os.getenv("TEAMS_WEBHOOK_URL")

async def evaluate():
    await refresh_materialized_view_if_needed()

    db.connect_db()
    cursor = db.get_cursor()

    cursor.execute("""
        SELECT published_at
        FROM detailed_articles_with_sentiments_mv
        LIMIT 1;
    """)

    row = cursor.fetchone()
    cursor.close()
    db.connection.close()

    if not row:
        return

    last_published_at = row["published_at"].replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    diff_minutes = (now - last_published_at).total_seconds() / 60

    if diff_minutes >= 20:
        level = "error"
        msg = "Více než 20 minut bez nových článků!"
    elif diff_minutes >= 10:
        level = "warning"
        msg = "Více než 10 minut bez nových článků!"
    else:
        return

    activity = SuspiciousActivity(
        name="Neaktivita ve feedu",
        level=level,
        timestamp=now,
        description=msg
    )

    add_suspicious_activity(activity)

    requests.post(TEAMS_WEBHOOK_URL, json={"text": f"[{level.upper()}] {msg}"})
