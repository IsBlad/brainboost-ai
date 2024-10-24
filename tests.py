from openai_client import OpenAIClient
from csv_handler import CSVHandler

### OpenAI Client Tests ###
client = OpenAIClient()

def test_generate_definitions_single_word():
    print()
    print("******************************************************************")
    print("OpenAI Client: Testing generate_definitions with a single word")
    print("******************************************************************")
    try:
        print(f"Parsed word list: {client.generate_definitions(['Car'])}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_generate_definitions_multiple_words():
    print("******************************************************************")
    print("OpenAI Client: Testing generate_definitions with multiple words")
    print("******************************************************************")
    print()
    try:
        print(f"Parsed word list: {client.generate_definitions(['Banana', 'Orange'])}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

### CSV Handler Tests ###
csv_handler = CSVHandler()

test_parsed_word_list = [
    {'word': 'Banana', 'definition': 'A long, yellow fruit that is soft inside and sweet.', 'example_sentence': 'I like to eat a banana for breakfast because it is tasty and healthy.'},
    {'word': 'Orange', 'definition': 'A round, orange fruit that is juicy and sweet.', 'example_sentence': 'She drinks orange juice every morning to feel fresh.'}
]

def test_write_csv(filename, test_parsed_word_list):   
    print("************************************")
    print("CSV Handler: Testing write_csv")
    print("************************************")
    print()
    try:
        csv_handler.write_csv(filename, test_parsed_word_list)
        print(f"CSV file {filename}.csv has been written successfully.")
        print(f"CSV file content: {csv_handler.read_csv(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_read_csv(filename):
    print("************************************")
    print("CSV Handler: Testing read_csv")
    print("************************************")
    print()
    try:
        print(f"CSV content: {csv_handler.read_csv(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

def test_count_csv_rows(filename):
    print("************************************")
    print("CSV Handler: Testing count_csv_rows")
    print("************************************")
    print()
    try:
        print(f"CSV row count: {csv_handler.count_csv_rows(filename)}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    print()

# ### Run the tests ###
# OpenAI Client Tests
test_generate_definitions_single_word()
test_generate_definitions_multiple_words()

# CSV Handler Tests
test_write_csv("test", test_parsed_word_list)
test_read_csv("test_definitions")
test_count_csv_rows("test_definitions")