import base64
from flask import Flask, render_template, request, jsonify, redirect, url_for

from config import constants
from csv_handler import CSVHandler
from openai_client import OpenAIClient
from qr_code_generator import QRCodeGenerator

# Initialise the Flask app
app = Flask(__name__)

# Load configuration from settings.py
app.config.from_object(constants)

# Initialise OpenAIClient, CSVHandler, and QRCodeGenerator
openai_client = OpenAIClient()
csv_handler = CSVHandler()
qr_code_generator = QRCodeGenerator()

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding words to a new Vocabulary List
@app.route('/addwords', methods=['GET', 'POST'])
def add_words():
    list_name = request.args.get('list', '')
    count = request.args.get('count', 1, type=int)

    if request.method == 'POST':
        # Retrieve list_name and words from form data
        list_name = request.form.get('list_name', '')
        words = request.form.getlist('word')
        
        if words:
            try:
                # Generate definitions for the words and write to {list_name}.csv
                definitions = openai_client.generate_definitions(words)
                csv_handler.write_csv(list_name, definitions)
                
                return redirect(url_for('review_definitions', list=list_name))

            except Exception as e:
                return jsonify({'error': str(e)}), 400
        else:
            return jsonify({'error': "No words were provided."}), 400

    # If it's a GET request, just render the form
    return render_template('vocabularylist/addwords.html', list_name=list_name, count=count)

# Route for saving definitions
@app.route('/save_definitions', methods=['POST'])
def save_definitions():
    
    # Retrieve list_name, words, definitions, and examples from form data
    list_name = request.form.get('list_name', '')
    words = request.form.getlist('words[]')
    definitions = request.form.getlist('definitions[]')
    examples = request.form.getlist('examples[]')
    
    # Create a list of dictionaries for the CSV writer
    data = [
        {
            'word': word,
            'definition': definition,
            'example_sentence': example
        }
        for word, definition, example in zip(words, definitions, examples)
    ]
    
    # Overwrite the existing CSV file with the new data
    csv_handler.write_csv(list_name, data)
    
    return redirect(url_for('lists'))


# Route for creating Vocabulary Lists
@app.route('/listcreate', methods=['GET', 'POST'])
def list_create():
    return render_template('vocabularylist/listcreate.html')

# Route to view all Vocabulary Lists
@app.route('/lists')
def lists():
    wordlists_and_counts = csv_handler.get_wordlists_and_counts()
    return render_template('vocabularylist/lists.html', wordlists_and_counts=wordlists_and_counts)

# Route to view all Vocabulary Lists
@app.route('/worddefinition')
def word_definition():
    return render_template('vocabularylist/worddefinition.html')

# Route to review and make edits to a specific Vocabulary List
@app.route('/reviewdefinitions')
def review_definitions():
    list_name = request.args.get('list', '')
    if list_name:
        word_list = csv_handler.read_csv(list_name)
        return render_template('vocabularylist/reviewdefinitions.html', 
                               word_list=word_list,
                               list_name=list_name)
    else:
        # If no list name is provided, redirect to the lists page
        return redirect(url_for('lists'))
    
# Route to delete a Vocabulary List
@app.route('/delete_list/<list_name>', methods=['DELETE'])
def delete_list(list_name):
    try:
        csv_handler.delete_csv(list_name)
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for displaying QR Code
@app.route('/qrcode')
def qr_code():
    activity = request.args.get('activity', '')
    list_name = request.args.get('list', '')
    
    # Generate the QR code
    qr_code_bytes = qr_code_generator.generate_qr_code(activity, list_name)
    
    # Convert bytes to base64
    encoded_string = base64.b64encode(qr_code_bytes).decode('utf-8')
    
    # Pass the base64 encoded image to the template
    return render_template('wordsup/qrcode.html', activity=activity, list=list_name, qr_code=encoded_string)

# Route for starting a game
@app.route('/gamestart')
def game_start():
    activity = request.args.get('activity', '')
    list_name = request.args.get('list', '')

    if activity == 'wordsup':
        return render_template('wordsup/gamestart.html', activity=activity, list=list_name)
    else:
        return redirect(url_for('index'))

# Route for starting a game
@app.route('/game')
def game():
    list_name = request.args.get('list', '')

    # Read the word list from the CSV file
    word_list = csv_handler.read_csv(list_name)

    # Extract only the words from the word list
    words = [word['word'] for word in word_list]

    return render_template('wordsup/game.html', list_name=list_name, words=words)

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
