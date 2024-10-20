import csv

class CSVHandler:
    def write_csv(self, file_name, data):
        
        file_path = f"data/{file_name}.csv"
        
        with open(file_path, 'w', newline='') as csvfile:
            fieldnames = ['word', 'definition', 'example_sentence']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for row in data:
                writer.writerow(row)
    
    def read_csv(self, file_name):
        file_path = f"data/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            return list(reader)

    def count_csv_rows(self, file_name):
        file_path = f"data/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)  # Skip the header row
            return sum(1 for row in reader)

example_list = [
    {'word': 'Banana', 'definition': 'A long, yellow fruit that is soft inside and sweet.', 'example_sentence': 'I like to eat a banana for breakfast because it is tasty and healthy.'},
    {'word': 'Orange', 'definition': 'A round, orange fruit that is juicy and sweet.', 'example_sentence': 'She drinks orange juice every morning to feel fresh.'}
]

csv_handler = CSVHandler()
csv_handler.write_csv('test2', example_list)
print(csv_handler.count_csv_rows('test2'))
# print(csv_handler.read_csv('testfromapppy1234'))

data = csv_handler.read_csv('testfromapppy')
for row in data:
    print(row["word"])
    print(row["definition"])
    print(row["example_sentence"])