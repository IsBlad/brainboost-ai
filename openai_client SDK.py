from openai import OpenAI
import toml
from pydantic import BaseModel, Field
from typing import List
from instance.settings import CEFR_LEVEL

class WordDefinition(BaseModel):
    word: str = Field(..., description="The word from the input list")
    definition: str = Field(..., description="A simple, easy-to-understand definition")
    example_sentence: str = Field(..., description="An example sentence that uses the word in a clear, everyday context")

class WordDefinitions(BaseModel):
    words: List[WordDefinition]

class OpenAIClient:
    def __init__(self, config_path="instance/api_key.toml"):
        # Load API key from config file and initialise OpenAI client
        self.secrets = toml.load(config_path)
        self.openai_api_key = self.secrets.get("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.openai_api_key)

    def generate_definitions(self, words: List[str]) -> List[WordDefinition]:
        if not words:
            raise ValueError("No words provided")

        system_message = {
            "role": "system",
            "content": f"""
            Generate definitions and example sentences for the given words.
            The definitions and example sentences should be simple and easy to understand,
            suitable for CEFR {CEFR_LEVEL} learners.

            For each word:
            1. Write a clear and basic definition that is easy for learners to understand.
            2. Provide an example sentence that uses the word naturally in context.
            3. Ensure both the definition and the example sentence are easy to understand.

            Keep the language clear and appropriate for CEFR {CEFR_LEVEL} learners.
            The example sentences should show the word being used in natural, everyday contexts.
            """
        }

        user_message = {
            "role": "user",
            "content": str(words)
        }

        response = self.client.chat.completions.create(
            model="gpt-4-0125-preview",  # Make sure to use a model that supports structured outputs
            messages=[system_message, user_message],
            temperature=1,
            max_tokens=2048,
            response_format={"type": "json_object"},
            schema=WordDefinitions.model_json_schema()
        )

        content = response.choices[0].message.content
        word_definitions = WordDefinitions.model_validate_json(content)
        return word_definitions.words

# Test the OpenAIClient class
if __name__ == "__main__":
    test_list = ["River", "Lake"]
    client = OpenAIClient()
    
    try:
        definitions = client.generate_definitions(test_list)
        print("Generated definitions:")
        for word_info in definitions:
            print(f"Word: {word_info.word}")
            print(f"Definition: {word_info.definition}")
            print(f"Example: {word_info.example_sentence}")
            print()
    except Exception as e:
        print(f"An error occurred: {str(e)}")