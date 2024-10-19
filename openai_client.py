from openai import OpenAI
import toml
import json
from config.settings import CEFR_LEVEL

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
        system_message = {
            "role": "system",
            "content": f"""
            Generate a JSON object for each word that includes its definition and an example sentence.
            The definitions and example sentences should be simple and easy to understand.

            # Steps
            1. Receive a list of words as input.
            2. For each word:
            - Write a clear and basic definition that is easy for learners to understand.
            - Provide an example sentence that uses the word naturally in context.
            3. Ensure both the definition and the example sentence are easy to understand. 
            The language should be suitable for CEFR {CEFR_LEVEL} learners.

            # Output Format
            The output should be a JSON array, where each element contains the following structure:
            - `word`: The word from the input list.
            - `definition`: A simple, easy-to-understand definition.
            - `example_sentence`: An example sentence that uses the word in a clear, everyday context.

            Example JSON structure:
            ```json
            [
            {
                "word": "Create",
                "definition": "To make something new.",
                "example_sentence": "She likes to create stories in her free time."
            },
            ...
            ]
            ```

            # Examples
            **Input:** 
            ["Discovery", "Encourage", "Improve"]

            **Expected Output:** 
            ```json
            [
            {
                "word": "Discovery",
                "definition": "Finding something for the first time.",
                "example_sentence": "The discovery of the old ship made everyone excited."
            },
            {
                "word": "Encourage",
                "definition": "To give someone support or confidence to do something.",
                "example_sentence": "My teacher always encourages me to try new things."
            },
            {
                "word": "Improve",
                "definition": "To make something better.",
                "example_sentence": "She studied hard to improve her English speaking skills."
            }
            ]
            ```

            # Notes
            - Make sure both the definitions and example sentences are written in simple language.
            - Keep the language clear and appropriate for CEFR {CEFR_LEVEL} learners.
            - The example sentences should show the word being used in natural, everyday contexts.
            """
        }

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
                "type": "json_object"
            }
        )

        # Extract the content from the response
        content = response.choices[0].message.content
        
        # Parse the JSON content
        parsed_content = json.loads(content)
        
        # Extract the words list from the parsed content
        words_list = parsed_content.get('words', [])
        
        return words_list