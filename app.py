from flask import Flask, render_template, request, jsonify
from instance import settings
from openai_client import OpenAIClient

# Initialise the Flask app
app = Flask(__name__)

# Load configuration from settings.py
app.config.from_object(settings)

# Initialize OpenAIClient
openai_client = OpenAIClient()

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for adding words to a new Vocabulary List
@app.route('/addwords', methods=['GET', 'POST'])
def add_words():
    if request.method == 'POST':
        # Get all words from the form
        words = request.form.getlist('word')
        
        if words:
            try:
                # Generate definitions using OpenAIClient
                definitions = openai_client.generate_definitions(words)
                
                # Pass the definitions to the template
                return render_template('vocabularylist/reviewdefinitions.html', definitions=definitions)
            except Exception as e:
                # Handle any errors
                return render_template('vocabularylist/addwords.html', error=str(e))
        else:
            return render_template('vocabularylist/addwords.html', error="No words were provided.")
    
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
