import app.db.config as settings
import psycopg2
import psycopg2.extras


class Database:
    def __init__(self):
        """Inicializace třídy, ale bez připojení."""
        self.connection = None

    def connect_db(self):
        """Inicializuje připojení k databázi, pokud není otevřené."""
        if self.connection is None or self.connection.closed:
            cfg = {
                "host": settings.DB_HOST,
                "port": settings.DB_PORT,
                "database": settings.DB_NAME,
                "user": settings.DB_USERNAME,
                "password": settings.DB_PASSWD,
                "sslmode": settings.DB_SSLMODE,
                "sslrootcert": settings.DB_SSLROOTCERT,
            }
            try:
                self.connection = psycopg2.connect(**cfg, connect_timeout=3)
                self.connection.autocommit = True
                print(f"✅ Připojení k databázi {settings.DB_NAME} bylo úspěšné.")
            except psycopg2.OperationalError as err:
                print("❌ Chyba při připojení k databázi:", err)
            except (Exception, psycopg2.Error) as err:
                raise err

    def get_cursor(self):
        """Vrátí nový kurzor."""
        if self.connection is None or self.connection.closed:
            self.connect_db()
        return self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def fetch_data(self, query: str):
        """Vykoná SELECT dotaz a vrátí výsledky jako seznam slovníků."""
        cursor = self.get_cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows


# Globální instance databáze
db = Database()
