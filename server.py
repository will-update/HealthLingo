from flask import Flask, send_from_directory, jsonify, request
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('src', 'main.html')

@app.route('/rankings')
def rankings():
    return send_from_directory('src', 'rankings.html')

@app.route('/learn')
def learn():
    return send_from_directory('src', 'learn.html')

@app.route('/learn/sleep/why-sleeping-consistently-matters')
def learnSleepWhySleepingConsistentlyMatters():
    return send_from_directory('src', 'learn-sleep-why-sleeping-consistently-matters.html')


completed_lessons = set()
# API endpoint
@app.route('/api/complete_lesson', methods=['POST'])
def complete_lesson():
    data = request.get_json()
    lesson_id = data.get('lesson_id')
    if lesson_id:
        completed_lessons.add(lesson_id)
        return jsonify({'status': 'ok'})
    return jsonify({'status': 'error', 'message': 'No lesson_id provided'}), 400

@app.route('/api/completed_lessons', methods=['GET'])
def get_completed_lessons():
    # Return the list of completed lesson IDs as JSON
    return jsonify(list(completed_lessons))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
