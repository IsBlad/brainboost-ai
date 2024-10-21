# Settings that may change depending on the user

CEFR_LEVEL = "B1" # This is the CEFR level of the learner

SYSTEM_MESSAGE = {
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
            [
            {{
                "word": "Create",
                "definition": "To make something new.",
                "example_sentence": "She likes to create stories in her free time."
            }}
            ]

            # Examples
            **Input:** 
            ["Discovery", "Encourage", "Improve"]

            **Expected Output:** 
            [
            {{
                "word": "Discovery",
                "definition": "Finding something for the first time.",
                "example_sentence": "The discovery of the old ship made everyone excited."
            }},
            {{
                "word": "Encourage",
                "definition": "To give someone support or confidence to do something.",
                "example_sentence": "My teacher always encourages me to try new things."
            }},
            {{
                "word": "Improve",
                "definition": "To make something better.",
                "example_sentence": "She studied hard to improve her English speaking skills."
            }}
            ]

            # Notes
            - Make sure both the definitions and example sentences are written in simple language.
            - Keep the language clear and appropriate for CEFR {CEFR_LEVEL} learners.
            - The example sentences should show the word being used in natural, everyday contexts.
            """
        }

JSON_SCHEMA = {
    "name": "words_schema",
    "schema": {
      "type": "object",
      "properties": {
        "words": {
          "type": "array",
          "description": "A collection of words with their definitions and example sentences.",
          "items": {
            "type": "object",
            "properties": {
              "word": {
                "type": "string",
                "description": "The word itself."
              },
              "definition": {
                "type": "string",
                "description": "The meaning of the word."
              },
              "example_sentence": {
                "type": "string",
                "description": "An example of the word used in a sentence."
              }
            },
            "required": [
              "word",
              "definition",
              "example_sentence"
            ],
            "additionalProperties": False
          }
        }
      },
      "required": [
        "words"
      ],
      "additionalProperties": False
    },
    "strict": True
  }