import sqlite3

connection = sqlite3.connect("game.db")
cursor=connection.cursor()

create_table = "CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, user_name VARCHAR(20), user_password VARCHAR(20))"
cursor.execute(create_table)

connection.commit()
connection.close()