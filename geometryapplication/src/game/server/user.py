import sqlite3

class User:
    def __init__(self, username,password):
        self.username=username
        self.password=password
    @classmethod
    def find_username(cls,username,password):
        connection = sqlite3.connect("game.db")
        cursor=connection.cursor()

        query = "SELECT * FROM users WHERE user_name="+ username +' AND '+'user_password=' +password
        cursor.execute(query)
        row=cursor.fetchone()
        if row:
            user=cls(*row)
        user=None
        connection.close()
        return user
        