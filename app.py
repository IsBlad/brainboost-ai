from openai_client import OpenAIClient


test_list=["banana", "apple"]

client = OpenAIClient()
definitions = client.generate_definitions(test_list)
print(definitions)