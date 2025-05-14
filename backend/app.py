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

cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name TEXT,
    surname TEXT,
    patronymic TEXT,
    role TEXT,
    party TEXT
);""")
conn.commit()


cur.execute("CREATE TABLE IF NOT EXISTS tasks (task_id SERIAL PRIMARY KEY, creator TEXT, task TEXT, subject TEXT, deadline DATE, party TEXT, date DATE);")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    text TEXT NOT NULL,
    parent_comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);""")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS comment_reactions (
    reaction_id SERIAL PRIMARY KEY,
    comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    reaction TEXT CHECK (reaction IN ('like', 'dislike')),
    UNIQUE (comment_id, user_id)
);""")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS task_status (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
    completed_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, task_id)
);""")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS weeks (
    week_id SERIAL PRIMARY KEY,
    week_number INT CHECK (week_number BETWEEN 1 AND 18) UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);""")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS subjects (
    subject_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    teacher TEXT,
    room TEXT,
    type TEXT CHECK (type IN ('lecture', 'practice', 'lab'))
);""")
conn.commit()

cur.execute("""CREATE TABLE IF NOT EXISTS schedule (
    schedule_id SERIAL PRIMARY KEY,
    week_id INT REFERENCES weeks(week_id) ON DELETE CASCADE,
    party VARCHAR(50) NOT NULL,
    day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7),
    lesson_number INT CHECK (lesson_number BETWEEN 1 AND 8),
    subject_id INT REFERENCES subjects(subject_id) ON DELETE SET NULL
);""")
conn.commit()









@app.get("/api/homeWorkGet")
def get_homework():
    party = request.args.get("party")  # Получаем параметр из запроса
    user_id = request.args.get("user_id")


    if not party:
        return jsonify({"error": "party is required"}), 400  # Проверяем, что party передан

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400


    try:
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404
        
        if user_role[0] not in ["student", "editor"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403

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
                    "deadline": row[3].strftime('%d.%m') if row[3] else None, # Форматируем дату
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
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные не переданы

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404

        if user_role[0] not in ["editor"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403

        task = data["task"]
        subject = data["subject"]
        date = data["date"]
        party = data["party"]
        deadline = data.get("deadline") if data.get("deadline") not in [None, "", "Выбрать"] else None
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
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные переданы
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404

        if user_role[0] not in ["editor"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403

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
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400  # Проверяем, что данные переданы

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404

        if user_role[0] not in ["editor"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403

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
            SELECT name, surname, patronymic, role, party
            FROM users
            WHERE user_id = %s;
        """, (id,))  # Используем id, а не request.get_json()

        result = cur.fetchone()

        if result:
            user_info = [
                {
                    "name": result[0],
                    "surname": result[1],
                    "patronymic": result[2],
                    "role": result[3],
                    "party": result[4]
                }
            ]
            return jsonify(user_info)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.post("/api/comment")
def add_comment():
    data = request.get_json()
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Проверяем роль пользователя
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404

        if user_role[0] not in ["editor", "student"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403
        
        # Добавляем комментарий, если роль подходящая
        task_id = data["task_id"]
        text = data["text"]
        parent_comment_id = data.get("parent_comment_id")  # может быть None

        cur.execute("""
            INSERT INTO comments (task_id, user_id, text, parent_comment_id)
            VALUES (%s, %s, %s, %s)
            RETURNING comment_id;
        """, (task_id, user_id, text, parent_comment_id))
        conn.commit()
        comment_id = cur.fetchone()[0]

        return jsonify({"id": comment_id, "message": "Comment added"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.delete("/api/comment")
def delete_comment():
    data = request.get_json()
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    comment_id = data.get("comment_id")
    if not comment_id:
        return jsonify({"error": "comment_id is required"}), 400

    try:
        # Только автор комментария или editor может удалить
        cur.execute("SELECT user_id FROM comments WHERE comment_id = %s", (comment_id,))
        result = cur.fetchone()
        if not result:
            return jsonify({"error": "Comment not found"}), 404

        comment_owner = result[0]
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        role = cur.fetchone()[0]

        if str(comment_owner) != str(user_id) and role != "editor":
            return jsonify({"error": "Forbidden"}), 403

        cur.execute("DELETE FROM comments WHERE comment_id = %s", (comment_id,))
        conn.commit()
        return jsonify({"message": f"Comment {comment_id} deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.post("/api/comment/reaction")
def react_to_comment():
    data = request.get_json()
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Проверяем роль пользователя в самом начале
        cur.execute("SELECT role FROM users WHERE user_id = %s", (user_id,))
        user_role = cur.fetchone()

        if not user_role:
            return jsonify({"error": "User not found"}), 404

        if user_role[0] not in ["editor", "student"]:
            return jsonify({"error": "Forbidden: insufficient permissions"}), 403

        comment_id = data["comment_id"]
        reaction = data["reaction"]  # 'like' или 'dislike'

        if reaction not in ["like", "dislike"]:
            return jsonify({"error": "Invalid reaction"}), 400

        # Проверяем, существует ли комментарий
        cur.execute("SELECT 1 FROM comments WHERE comment_id = %s", (comment_id,))
        if not cur.fetchone():
            return jsonify({"error": "Comment not found"}), 404

        # Обновляем реакцию, если уже существует, иначе вставляем
        cur.execute("""
            INSERT INTO comment_reactions (comment_id, user_id, reaction)
            VALUES (%s, %s, %s)
            ON CONFLICT (comment_id, user_id)
            DO UPDATE SET reaction = EXCLUDED.reaction;
        """, (comment_id, user_id, reaction))
        conn.commit()

        return jsonify({"message": f"{reaction.capitalize()} registered for comment {comment_id}"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.get("/api/comments")
def get_comments():
    task_id = request.args.get("task_id")
    if not task_id:
        return jsonify({"error": "task_id is required"}), 400

    try:
        cur.execute("""
            SELECT 
                c.comment_id,
                c.text,
                c.parent_comment_id,
                c.created_at,
                u.user_id,
                u.name,
                u.surname,
                u.patronymic,
                COALESCE(SUM(CASE WHEN r.reaction = 'like' THEN 1 ELSE 0 END), 0) AS likes,
                COALESCE(SUM(CASE WHEN r.reaction = 'dislike' THEN 1 ELSE 0 END), 0) AS dislikes
            FROM comments c
            LEFT JOIN users u ON c.user_id = u.user_id
            LEFT JOIN comment_reactions r ON c.comment_id = r.comment_id
            WHERE c.task_id = %s
            GROUP BY c.comment_id, u.user_id, u.name, u.surname, u.patronymic
            ORDER BY c.created_at ASC;
        """, (task_id,))

        rows = cur.fetchall()
        comments = []

        for row in rows:
            author = (
                f"{row[5]} {row[6]} {row[7]}"
                if row[4] is not None else "Удалённый пользователь"
            )

            comments.append({
                "comment_id": row[0],
                "text": row[1],
                "parent_comment_id": row[2],
                "created_at": row[3].strftime("%Y-%m-%d %H:%M"),
                "author": author,
                "author_id": row[4],
                "likes": row[8],
                "dislikes": row[9],
            })

        return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.post("/api/task/complete")
def complete_task():
    data = request.get_json()
    user_id = request.args.get("user_id")

    if not data:
        return jsonify({"error": "data is required"}), 400
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        task_id = data["task_id"]

        # Проверяем, что задача существует
        cur.execute("SELECT party FROM tasks WHERE task_id = %s", (task_id,))
        task = cur.fetchone()
        if not task:
            return jsonify({"error": "Task not found"}), 404

        task_party = task[0]

        # Проверяем, что у пользователя и задачи совпадает party
        cur.execute("SELECT party FROM users WHERE user_id = %s", (user_id,))
        user = cur.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_party = user[0]

        if user_party != task_party:
            return jsonify({"error": "User and task parties do not match"}), 403

        # Если задача выполнена, добавляем запись в таблицу
        cur.execute("""
            INSERT INTO task_status (user_id, task_id)
            VALUES (%s, %s)
            ON CONFLICT (user_id, task_id)
            DO NOTHING;  -- Если запись уже существует, ничего не делать
        """, (user_id, task_id))
        conn.commit()

        return jsonify({"message": f"Task {task_id} marked as completed by user {user_id}."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/user/tasks/completed")
def get_completed_tasks():
    user_id = request.args.get("user_id")
    
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Получаем все выполненные задачи пользователя
        cur.execute("""
            SELECT t.task_id, t.task, t.subject, ts.completed_at
            FROM tasks t
            JOIN task_status ts ON t.task_id = ts.task_id
            WHERE ts.user_id = %s
            ORDER BY ts.completed_at DESC;
        """, (user_id,))
        rows = cur.fetchall()

        if rows:
            tasks = [
                {
                    "task_id": row[0],
                    "task": row[1],
                    "subject": row[2],
                    "completed_at": row[3].strftime("%Y-%m-%d %H:%M")
                }
                for row in rows
            ]
            return jsonify(tasks), 200
        else:
            return jsonify({"message": "No completed tasks found for this user"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/user/schedule/all_weeks")
def get_full_schedule():
    user_id = request.args.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    try:
        # Получаем группу пользователя
        cur.execute("SELECT party FROM users WHERE user_id = %s", (user_id,))
        user = cur.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404

        user_party = user[0]

        # Времена пар
        lesson_times = {
            1: "08:30 - 10:00",
            2: "10:15 - 11:45",
            3: "12:00 - 13:30",
            4: "14:00 - 15:30",
            5: "15:45 - 17:15",
            6: "17:30 - 19:00",
            7: "19:15 - 20:45",
            8: "21:00 - 22:30"
        }

        # Названия дней недели
        day_names = {
            1: "Понедельник",
            2: "Вторник",
            3: "Среда",
            4: "Четверг",
            5: "Пятница",
            6: "Суббота",
            7: "Воскресенье"
        }

        # Получаем данные по всем неделям
        cur.execute("""
            SELECT w.week_id, w.week_number, w.start_date, w.end_date,
                   s.day_of_week, s.lesson_number,
                   subj.name, subj.teacher, subj.room, subj.type
            FROM weeks w
            LEFT JOIN schedule s ON w.week_id = s.week_id AND s.party = %s
            LEFT JOIN subjects subj ON s.subject_id = subj.subject_id
            ORDER BY w.week_number, s.day_of_week, s.lesson_number;
        """, (user_party,))
        rows = cur.fetchall()

        result = {}

        for row in rows:
            week_id = row[0]
            week_number = row[1]
            start_date = row[2].strftime("%Y-%m-%d")
            end_date = row[3].strftime("%Y-%m-%d")
            day_number = row[4]
            lesson_number = row[5]

            week_key = f"Week {week_number} ({start_date} — {end_date})"

            if week_key not in result:
                result[week_key] = {}

            if day_number is not None:
                day_name = day_names.get(day_number, f"День {day_number}")
                if day_name not in result[week_key]:
                    result[week_key][day_name] = []

                result[week_key][day_name].append({
                    "lesson_number": lesson_number,
                    "time": lesson_times.get(lesson_number),
                    "name": row[6],
                    "teacher": row[7],
                    "room": row[8],
                    "type": row[9]
                })

        return jsonify({
            "party": user_party,
            "schedule": result
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
