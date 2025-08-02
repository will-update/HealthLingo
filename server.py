from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    return send_from_directory('src', 'main.html')

@app.route('/rankings')
def rankings():
    return send_from_directory('src', 'rankings.html')

# Example API endpoint
default_message = "Hello from the Python backend!"
@app.route('/api/hello')
def hello():
    return jsonify({"message": default_message})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
