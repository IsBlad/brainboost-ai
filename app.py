from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from config import settings
from openai_client import OpenAIClient
from csv_handler import CSVHandler

# Initialise the Flask app
app = Flask(__name__)
app.secret_key = 'generalassembly'

# Load configuration from settings.py
app.config.from_object(settings)

# Initialise OpenAIClient and CSVHandler
openai_client = OpenAIClient()
csv_handler = CSVHandler()

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding words to a new Vocabulary List
@app.route('/addwords', methods=['GET', 'POST'])
def add_words():
    list_name = session.get('list_name', request.args.get('list', ''))
    count = request.args.get('count', 1, type=int)
    print(f"After session: list_name: {session['list_name']},")
    if request.method == 'POST':
        words = request.form.getlist('word')
        
        if words:
            try:
                definitions = openai_client.generate_definitions(words)
                csv_handler.write_csv(list_name, definitions)
                
                return redirect(url_for('review_definitions', list=list_name))
            except Exception as e:
                return jsonify({'error': str(e)}), 400
        else:
            return jsonify({'error': "No words were provided."}), 400

    # If it's a GET request, just render the form
    return render_template('vocabularylist/addwords.html', list_name=list_name, count=count)

# Route for creating Vocabulary Lists
@app.route('/listcreate', methods=['GET', 'POST'])
def list_create():
    if request.method == 'POST':
        list_name = request.form.get('listName')
        word_count = request.form.get('wordCount')
        print(f"After POST: list_name: {list_name}, word_count: {word_count}")
        
        if list_name and word_count:
            session['list_name'] = list_name
            print(f"After session: list_name: {session['list_name']}")
            return redirect(url_for('add_words', list=list_name, count=word_count))
        else:
            return jsonify({'error': "List name and word count are required."}), 400

    return render_template('vocabularylist/listcreate.html')

# Route to view all Vocabulary Lists
@app.route('/lists')
def lists():
    return render_template('vocabularylist/lists.html')

# Route to view all Vocabulary Lists
@app.route('/worddefinition')
def word_definition():
    return render_template('vocabularylist/worddefinition.html')

# Route to view all Vocabulary Lists
@app.route('/reviewdefinitions')
def review_definitions():
    list_name = session.get('list_name', request.args.get('list', ''))
    word_list = csv_handler.read_csv(list_name) if list_name else []
    return render_template('vocabularylist/reviewdefinitions.html', word_list=word_list, list_name=list_name)

# Route for starting a game
@app.route('/gamestart')
def game_start():
    return render_template('wordsup/gamestart.html')

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
