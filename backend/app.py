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

cur.execute("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name TEXT, surname TEXT, role TEXT, party TEXT);")
conn.commit()
cur.execute("CREATE TABLE IF NOT EXISTS tasks (task_id SERIAL PRIMARY KEY, task TEXT, subject TEXT, date DATE, party TEXT);")
conn.commit()

# Пример маршрута
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

# Пример POST-запроса
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Получаем JSON-данные
    return jsonify({"received": data})

@app.get("/api/homeWorkGet")
def get_homework():
    party = request.args.get("party")  # Получаем параметр из запроса

    if not party:
        return jsonify({"error": "party is required"}), 400  # Проверяем, что party передан

    try:
        cur.execute("""
            SELECT task_id, task, subject, date, party
            FROM tasks
            WHERE party = %s;
        """, (party,))  # Передаём party в запрос

        results = cur.fetchall()  # Получаем все строки

        if results:
            tasks = [
                {
                    "task_id": row[0],
                    "task": row[1],
                    "subject": row[2],
                    "date": row[3].strftime('%m-%d'),  # Форматируем дату
                    "party": row[4]
                }
                for row in results
            ]
            return jsonify(tasks)  # Возвращаем список JSON объектов
        else:
            return jsonify([])  # Если задач нет, возвращаем пустой массив
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.post("/api/adduser")
def adduser():
    data = request.get_json()
    name = data["name"]
    surname = data["surname"]
    role = data["role"]
    party = data["party"]

    cur.execute("""
                INSERT INTO users (name, surname, role, party)
                VALUES (%s, %s, %s, %s) RETURNING user_id;
                """, (name, surname, role, party))
    conn.commit()

    user_id = cur.fetchone()[0]
    return {"id": user_id, "message": f"User {name} {surname} registered."}, 201

@app.post("/api/task")
def settask():
    data = request.get_json()
    task = data["task"]
    subject = data["subject"]
    date = data["date"]
    party = data["party"]

    cur.execute("""
                INSERT INTO tasks (task, subject, date, party)
                VALUES (%s, %s, %s, %s) RETURNING task_id;
                """, (task, subject, date, party))
    conn.commit()

    task_id = cur.fetchone()[0]
    return {"id": task_id, "message": f"Task for {subject} created"}, 201

@app.get("/api/task/<party>")
def gettask(party):
    cur.execute("""
                SELECT * FROM tasks
                WHERE party = %s;""", (party,))
    tasks = cur.fetchall()
    return tasks

@app.put("/api/task/<task_id>")
def updatetask(task_id):
    data = request.get_json()
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

@app.delete("/api/task")
def deletetask():
    data = request.get_json() #fdsaf
    task_id = data["task_id"]
    cur.execute("""
                DELETE FROM tasks
                WHERE task_id = %s
                """, (task_id,))
    conn.commit()
    return {"id": task_id, "message": f"Task {task_id} deleted"}, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
