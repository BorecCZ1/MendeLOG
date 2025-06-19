from datetime import datetime, timedelta, timezone
from app.db.database import db

async def refresh_materialized_view_if_needed():
    try:
        db.connect_db()
        cursor = db.get_cursor()

        cursor.execute("""
            SELECT EXISTS (
                SELECT 1 FROM pg_matviews
                WHERE matviewname = 'detailed_articles_with_sentiments_mv'
            );
        """)
        exists = cursor.fetchone()['exists']

        if not exists:
            print("🆕 Materialized view neexistuje, vytvářím ji...")

            cursor.execute("""
                CREATE MATERIALIZED VIEW detailed_articles_with_sentiments_mv AS
                SELECT
                    a.articles_id,
                    a.article_title,
                    a.retrieved_at,
                    a.published_at,
                    a.lang,
                    a.domain,
                    a.url,
                    a.articles_categories_id,
                    a.articles_sentiments_id,
                    a.short_summary_id,
                    a.long_summary_id,
                    s.statuses_id,
                    s.params ->> 'description' AS description,
                    s.params ->> 'processed_by' AS processed_by,
                    st.description AS status_description,
                    s.tools_id
                FROM articles a
                LEFT JOIN articles_sentiments s ON a.articles_id = s.articles_id
                LEFT JOIN statuses st ON s.statuses_id = st.statuses_id
                WHERE s.tools_id = 17
                ORDER BY a.retrieved_at DESC
                LIMIT 2000;
            """)

            cursor.execute("""
                CREATE UNIQUE INDEX IF NOT EXISTS idx_detailed_articles_mv
                ON detailed_articles_with_sentiments_mv (articles_id, statuses_id);
            """)

            print("✅ View vytvořeno.")
        else:
            cursor.execute("""
                SELECT MAX(retrieved_at) FROM detailed_articles_with_sentiments_mv;
            """)
            latest_retrieved_at = cursor.fetchone()['max']

            if not latest_retrieved_at:
                should_refresh = True
            else:
                age = datetime.now(timezone.utc) - latest_retrieved_at
                should_refresh = age > timedelta(minutes=10) #TODO změnit na požadovaný počet minut

            if should_refresh:
                print("🔁 Obnovuju materialized view")
                cursor.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY detailed_articles_with_sentiments_mv;")
            else:
                print("✅ Materialized view je aktuální")

        db.connection.commit()
        cursor.close()
        db.connection.close()

    except Exception as e:
        print("❌ Chyba při kontrole/obnovení materialized view:", e)


async def get_detailed_articles_with_sentiments():
    try:
        await refresh_materialized_view_if_needed()

        db.connect_db()
        cursor = db.get_cursor()

        cursor.execute(f"""
            SELECT * 
            FROM detailed_articles_with_sentiments_mv;
        """)
        rows = cursor.fetchall()

        cursor.close()
        db.connection.close()
        return rows

    except Exception as e:
        print("❌ Chyba při načítání článků se sentimenty:", e)
        return []

async def get_single_detailed_article_with_sentiment(article_id: int):
    try:

        db.connect_db()
        cursor = db.get_cursor()

        cursor.execute("""
            SELECT *
            FROM detailed_articles_with_sentiments_mv
            WHERE articles_id = %s;
        """, (article_id,))

        row = cursor.fetchone()

        cursor.close()
        db.connection.close()
        return row

    except Exception as e:
        print("❌ Chyba při načítání jednoho článku:", e)
        return None
