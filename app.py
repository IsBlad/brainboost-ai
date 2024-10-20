from flask import Flask, render_template, request, jsonify
from instance import settings
from openai_client import OpenAIClient
from csv_handler import CSVHandler

# Initialise the Flask app
app = Flask(__name__)

# Load configuration from settings.py
app.config.from_object(settings)

# Initialise OpenAIClient
openai_client = OpenAIClient()

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding words to a new Vocabulary List
@app.route('/addwords', methods=['GET', 'POST'])
def add_words():
    if request.method == 'POST':
        print("add_words POST request received")
        words = request.form.getlist('word')
        # print(words)
        # definitions = openai_client.generate_definitions(words)
        # print(definitions)
        
        if words:
            try:
                definitions = openai_client.generate_definitions(words)
                print("app.py definitions generated")
                print(type(definitions))
                for definition in definitions:
                    print(definition)
                csv_handler = CSVHandler('definitions_example.csv')
                csv_handler.write_csv(definitions)
                return render_template('vocabularylist/worddefinition.html', definitions=definitions)
            except Exception as e:
                return jsonify({'error': str(e)}), 400
        else:
            return jsonify({'error': "No words were provided."}), 400
    # If it's a GET request, just render the form
    return render_template('vocabularylist/addwords.html')

# Route for creating Vocabulary Lists
@app.route('/listcreate', methods=['GET', 'POST'])
def list_create():
    if request.method == 'POST':
        
        #TODO: Logic for handling list creation
        
        pass
    return render_template('vocabularylist/listcreate.html')

# Route to view all Vocabulary Lists
@app.route('/lists')
def lists():
    return render_template('vocabularylist/lists.html')

# Route to view all Vocabulary Lists
@app.route('/worddefinition')
def word_definition():
    return render_template('vocabularylist/worddefinition.html')
# Route for starting a game
@app.route('/gamestart')
def game_start():
    return render_template('wordsup/gamestart.html')

# Run the application
if __name__ == '__main__':
    app.run(debug=True)

# Testing: Generate definitions and example sentences using OpenAIClient class
# test_list=["banana", "apple"]

# client = OpenAIClient()
# definitions = client.generate_definitions(test_list)
# print(definitions)
