from app.db.database import Database


async def get_basic_articles(limit: int = 4):
    try:
        db = Database()
        db.connect_db()
        cursor = db.get_cursor()

        cursor.execute(f"""
            SELECT 
                a.articles_id,
                a.article_title,
                a.retrieved_at,
                a.published_at,
                a.lang,
                a.domain,
                a.url,
                a.articles_categories_id,
                s.statuses_id,
                s.params ->> 'description' AS description,
                st.description AS status_description
            FROM articles a
            LEFT JOIN articles_sentiments s ON a.articles_id = s.articles_id
            LEFT JOIN statuses st ON s.statuses_id = st.statuses_id
            LIMIT {limit};
        """)
        rows = cursor.fetchall()
        cursor.close()
        db.connection.close()
        return rows

    except Exception as e:
        print("❌ Chyba při načítání článků:", e)
        return []


async def get_detailed_articles_with_sentiments(limit: int = 50):
    try:
        db = Database()
        db.connect_db()
        cursor = db.get_cursor()

        #Jakoby funkcni ale trva to jak cyp coz je teply, poresit
        # cursor.execute(f"""
        #    SELECT
        #        a.articles_id,
        #        a.article_title,
        #        a.retrieved_at,
        #       a.published_at,
        #       a.lang,
        #       a.domain,
        #       a.url,
        #       a.articles_categories_id,
        #       s.statuses_id,
        #       s.params ->> 'description' AS description,
        #       st.description AS status_description
        #   FROM articles a
        #   INNER JOIN articles_sentiments s ON a.articles_id = s.articles_id
        #   INNER JOIN statuses st ON s.statuses_id = st.statuses_id
        #   ORDER BY a.retrieved_at DESC
        #   LIMIT {limit};
        # """

        cursor.execute(f"""
            SELECT 
                a.articles_id,
                a.article_title,
                a.retrieved_at,
                a.published_at,
                a.lang,
                a.domain,
                a.url,
                a.articles_categories_id,
                s.statuses_id,
                s.params ->> 'description' AS description,
                st.description AS status_description
            FROM articles a
            RIGHT JOIN articles_sentiments s ON a.articles_id = s.articles_id
            RIGHT JOIN statuses st ON s.statuses_id = st.statuses_id
            LIMIT {limit};
        """)

        rows = cursor.fetchall()
        cursor.close()
        db.connection.close()
        return rows

    except Exception as e:
        print("❌ Chyba při načítání článků se sentimenty:", e)
        return []
