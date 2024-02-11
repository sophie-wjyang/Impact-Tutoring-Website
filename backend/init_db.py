import os 
import psycopg2

# os is used to access environment variables, so that the database username and password are not visible in the source code
conn = psycopg2.connect(
    host="localhost",
    database="impact_tutoring",
    user=os.environ['DB_USERNAME'],
    password=os.environ['DB_P`ASSWORD']
)

cur = conn.cursor()

with open('sql/create_tables.sql', 'r') as create_tables_file:
    cur.execute(create_tables_file.read())

# commit the changes
conn.commit()

# close the cursor and connection
cur.close()
conn.close()