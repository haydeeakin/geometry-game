import sqlite3

connection = sqlite3.connect("game.db")
cursor=connection.cursor()

query = "INSERT INTO users ('user_name','user_password') VALUES ('default','default')"
cursor.execute(query)

connection.commit()
connection.close()