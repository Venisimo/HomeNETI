from flask import Flask, jsonify, request
from flask_cors import CORS  # Разрешает запросы с других источников (CORS)
from config import host, user, password, db_name
import psycopg2

app = Flask(__name__)
CORS(app) 

conn = psycopg2.connect(
    host = host,
    user = user,
    password = password,
    database = db_name,
    options="-c client_encoding=UTF8"
    )
cur = conn.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name TEXT, surname TEXT, patronymic TEXT, role TEXT, party TEXT);")
conn.commit()
cur.execute("CREATE TABLE IF NOT EXISTS tasks (task_id SERIAL PRIMARY KEY, creator TEXT, task TEXT, subject TEXT, deadline DATE, party TEXT, date DATE);")
conn.commit()
cur.execute("CREATE TABLE IF NOT EXISTS tasks (task_id SERIAL PRIMARY KEY, creator TEXT, task TEXT, subject TEXT, deadline DATE, party TEXT, date DATE);")
conn.commit()


@app.get("/api/homeWorkGet")
def get_homework():
    party = request.args.get("party")  # Получаем параметр из запроса

    if not party:
        return jsonify({"error": "party is required"}), 400  # Проверяем, что party передан

    try:
        cur.execute("""
            SELECT task_id, task, subject, deadline, party, date, creator
            FROM tasks
            WHERE party = %s ORDER BY deadline ASC;
        """, (party,))  # Передаём party в запрос

        results = cur.fetchall()  # Получаем все строки

        if results:
            tasks = [
                {
                    "task_id": row[0],
                    "task": row[1],
                    "subject": row[2],
                    "deadline": row[3].strftime('%d.%m') if row[3] else None,  # Форматируем дату
                    "party": row[4],
                    "date": row[5].strftime('%d.%m.%y'),
                    "creator": row[6],
                }
                for row in results 
            ]
            return jsonify(tasks)  # Возвращаем список JSON объектов
        else:
            return jsonify([])  # Если задач нет, возвращаем пустой массив
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.post("/api/user")
def adduser():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные не переданы

    try:
        name = data["name"]
        surname = data["surname"]
        patronymic = data["patronymic"]
        role = data["role"]
        party = data["party"]

        cur.execute("""
                    INSERT INTO users (name, surname, patronymic, role, party)
                    VALUES (%s, %s, %s, %s, %s) RETURNING user_id;
                    """, (name, surname, patronymic, role, party))
        conn.commit()

        user_id = cur.fetchone()[0]
        return jsonify({"id": user_id, "message": f"User {name} {surname} {patronymic} registered."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.post("/api/task")
def settask():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные не переданы

    try:
        task = data["task"]
        subject = data["subject"]
        date = data["date"]
        party = data["party"]
        deadline = data["deadline"]
        creator = data["creator"]
        
        cur.execute("""
                    INSERT INTO tasks (task, subject, date, party, deadline, creator)
                    VALUES (%s, %s, %s, %s, %s, %s) RETURNING task_id;
                    """, (task, subject, date, party, deadline, creator))
        conn.commit()

        task_id = cur.fetchone()[0]
        return jsonify({"id": task_id, "message": f"Task for {subject} created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.put("/api/task/<task_id>")
def updatetask(task_id):
    data = request.get_json()
    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные не переданы

    try:
        task = data["task"]
        cur.execute("""
                    UPDATE tasks
                    SET task = %s
                    WHERE task_id = %s
                    RETURNING task_id;
                    """, (task, task_id))
        conn.commit()
        task_id = cur.fetchone()[0]
        return {"id": task_id, "message": f"Task {task_id} updated"}, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.delete("/api/task")
def deletetask():
    data = request.get_json()
    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные не переданы

    try:
        task_id = data["task_id"]
        cur.execute("""
                    DELETE FROM tasks
                    WHERE task_id = %s
                    """, (task_id,))
        conn.commit()
        return {"id": task_id, "message": f"Task {task_id} deleted"}, 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/user/<int:id>")
def getuser(id):  # Теперь id передается как аргумент
    try: 
        cur.execute("""
            SELECT name, surname, patronymic, party
            FROM users
            WHERE user_id = %s;
        """, (id,))  # Используем id, а не request.get_json()

        results = cur.fetchall()

        if results:
            info = [
                {
                    "name": row[0],
                    "surname": row[1],
                    "patronymic": row[2],
                    "party": row[3]
                }
                for row in results
            ]
            return jsonify(info)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
