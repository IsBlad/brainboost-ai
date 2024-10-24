from openai import OpenAI
import toml
import json
from config.settings import CEFR_LEVEL, SYSTEM_MESSAGE, JSON_SCHEMA

class OpenAIClient:
    def __init__(self, config_path="instance/api_key.toml"):
        # Load API key from config file and initialise OpenAI client
        self.secrets = toml.load(config_path)
        self.openai_api_key = self.secrets.get("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.openai_api_key)

    def generate_definitions(self, words):
        '''Generate definitions and example sentences for words provided. 
        Returns a dictionary with three keys: word, definition, example_sentence'''

        if not words:
            raise ValueError("No words provided")

        # Define the prompt message content
        system_message = SYSTEM_MESSAGE

        # Define the user input message
        user_message = {
            "role": "user",
            "content": str(words)
        }

        # Create completion request
        response = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[system_message, user_message],
            temperature=1,
            max_tokens=2048,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            response_format={
                "type": "json_schema",
                "json_schema": JSON_SCHEMA
            }
        )
        # Extract the content from the response
        content = response.choices[0].message.content
        
        print(content)
        
        # Parse the JSON content
        parsed_content = json.loads(content)
        
        # Extract the words list from the parsed content
        words_list = parsed_content.get('words', [])
        
        return words_list