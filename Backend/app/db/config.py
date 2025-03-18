""" DB POSTGRE CONFIG """
import os

DB_HOST = os.getenv("DB_HOST") if os.getenv("DB_HOST") else 'localhost'
DB_PORT = os.getenv("DB_PORT") if os.getenv("DB_PORT") else '5432'
DB_USERNAME = os.getenv("DB_USERNAME") if os.getenv("DB_USERNAME") else 'postgres'
DB_PASSWD = os.getenv("DB_PASSWD") if os.getenv("DB_PASSWD") else '123'
DB_NAME = os.getenv("DB_NAME") if os.getenv("DB_NAME") else 'trading'
# Database SSL - none, require, See. posgresql SSL support
DB_SSLMODE = os.getenv("DB_SSLMODE") if os.getenv("DB_SSLMODE") else 'disable'
DB_SSLROOTCERT = os.getenv("DB_SSLROOTCERT") if os.getenv("DB_SSLROOTCERT") else ''