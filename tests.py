from openai_client import OpenAIClient
from csv_handler import CSVHandler
from qr_code_generator import QRCodeGenerator
from config.constants import BASE_URL, DATA_DIR, TESTS_DIR
import os
import base64
from PIL import Image
import io

def main():
    '''
    Tests for OpenAI Client and CSV Handler. Comment out unused tests.
    '''

    # OpenAI Client Tests
    test_generate_definitions_single_word()
    test_generate_definitions_multiple_words()

    # CSV Handler Tests
    test_write_csv()
    test_read_csv()
    test_count_csv_rows()
    test_get_wordlists_and_counts()
    test_delete_csv()

    # QR Code Generator Tests
    test_generate_qr_code(activity="WordsUp", list_name="Animals")

    # TODO: List name integration test
    # TODO: Word list integration test

### OpenAI Client Tests ###
client = OpenAIClient()

def test_generate_definitions_single_word(word="Car"):
    '''
    Tests the generate_definitions method with a single word (default: "Car").
    '''

    print_test_header("OpenAI Client: Testing generate_definitions with a single word")
    
    try:
        print(f"Parsed word list: {client.generate_definitions([word])}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def test_generate_definitions_multiple_words(words=["Banana", "Orange"]):
    '''
    Tests the generate_definitions method with multiple words (default: ["Banana", "Orange"]).
    '''

    print_test_header("OpenAI Client: Testing generate_definitions with multiple words")
    
    try:
        print(f"Parsed word list: {client.generate_definitions(words)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

### CSV Handler Tests ###
csv_handler = CSVHandler()

test_parsed_word_list = [
    {'word': 'Banana', 'definition': 'A long, yellow fruit that is soft inside and sweet.', 'example_sentence': 'I like to eat a banana for breakfast because it is tasty and healthy.'},
    {'word': 'Orange', 'definition': 'A round, orange fruit that is juicy and sweet.', 'example_sentence': 'She drinks orange juice every morning to feel fresh.'}
]

def test_write_csv(filename="test_write", test_parsed_word_list=test_parsed_word_list):
    '''
    Tests the write_csv method. 
    
    Writes a CSV file with the given filename and parsed word list (default: test_write_csv, test_parsed_word_list). 
    
    Saves the file to {DATA_DIR}/{filename}.csv.
    '''
    
    print_test_header("CSV Handler: Testing write_csv")
    
    try:
        csv_handler.write_csv(filename, test_parsed_word_list)
        print(f"CSV file {filename}.csv has been written successfully.")
        print(f"CSV file content: {csv_handler.read_csv(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

def test_read_csv(filename="test_definitions"):
    '''
    Tests the read_csv method. Reads a CSV file with the given filename (default: test_definitions).
    '''
    
    print_test_header("CSV Handler: Testing read_csv")
    
    try:
        print(f"CSV content of {filename}.csv: {csv_handler.read_csv(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_get_wordlists_and_counts():
    '''
    Tests the get_wordlists_and_counts method. 
    
    Returns the names and row counts of all word lists in the {DATA_DIR} directory.
    '''
    
    print_test_header("CSV Handler: Testing get_wordlists_and_counts")
    
    try:
        print(f"Wordlists and counts of all CSV files in {DATA_DIR}: {csv_handler.get_wordlists_and_counts()}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_count_csv_rows(filename="test_definitions"):
    '''
    Tests the count_csv_rows method. 
    
    Returns the number of rows in the given CSV file (default: test_definitions).
    '''
    
    print_test_header("CSV Handler: Testing count_csv_rows")
    try:
        print(f"CSV row count of {filename}.csv: {csv_handler.count_csv_rows(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_delete_csv(filename="test_write"):
    '''
    Tests the delete_csv method. 
    
    Deletes the given CSV file from the {DATA_DIR} directory (default: test_write).
    '''
    
    print_test_header("CSV Handler: Testing delete_csv")
    
    try:
        csv_handler.delete_csv(filename)
        print(f"CSV file {filename}.csv has been deleted successfully.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

### QR Code Generator Tests ###
qr_generator = QRCodeGenerator()

def test_generate_qr_code(activity="WordsUp", list_name="Animals"):
    '''
    Tests the generate_qr_code method. 

    Generates a QR code for the given activity and list name (default: WordsUp, Animals).
    Saves the QR code as a PNG file in the {TESTS_DIR}/qr_codes directory for verification.

    The QR code links to {BASE_URL}/gamestart?activity={activity}&list={list_name}.
    '''

    print_test_header("QR Code Generator: Testing generate_qr_code")
    
    try:
        # Generate the QR code
        qr_code_bytes = qr_generator.generate_qr_code(activity, list_name)
        
        # Convert bytes to an image
        image = Image.open(io.BytesIO(qr_code_bytes))
        
        # Create a directory for test QR codes if it doesn't exist
        qr_codes_dir = os.path.join(TESTS_DIR, "qr_codes")
        os.makedirs(qr_codes_dir, exist_ok=True)
        
        # Save the image
        filename = f"{activity}_{list_name}.png"
        filepath = os.path.join(qr_codes_dir, filename)
        image.save(filepath)
        
        print(f"QR code generated successfully.")
        print(f"QR code saved to: {filepath}")
        print(f"Image size: {image.size}")
        print(f"The QR code should link to: {BASE_URL}/gamestart?activity={activity}&list={list_name}")
        print("Please scan the QR code to verify its contents.")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

# Helper Functions
def print_test_header(test_title):
    '''
    Prints a formatted header for a test.
    '''
    
    length = len(test_title)
    border = "*" * length

    print()
    print(border)
    print(test_title)
    print(border)
    print()

main()
