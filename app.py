from flask import Flask, render_template, request
from instance import settings
from openai_client import OpenAIClient

# Initialise the Flask app
app = Flask(__name__)

# Load configuration from settings.py
app.config.from_object(settings)

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding words to a new Vocabulary List
@app.route('/addwords', methods=['GET', 'POST'])
def add_words():
    if request.method == 'POST':
        word = request.form['word']
        
        #TODO: Logic to handle adding words
        
        return render_template('addwords.html', success=True)
    return render_template('addwords.html')

# Route for creating Vocabulary Lists
@app.route('/listcreate', methods=['GET', 'POST'])
def list_create():
    if request.method == 'POST':
        
        #TODO: Logic for handling list creation
        
        pass
    return render_template('listcreate.html')

# Route to view all Vocabulary Lists
@app.route('/lists')
def lists():
    return render_template('lists.html')

# Route for starting a game
@app.route('/gamestart')
def game_start():
    return render_template('gamestart.html')

# Run the application
if __name__ == '__main__':
    app.run(debug=True)

# Testing: Generate definitions and example sentences using OpenAIClient class
# test_list=["banana", "apple"]

# client = OpenAIClient()
# definitions = client.generate_definitions(test_list)
# print(definitions)