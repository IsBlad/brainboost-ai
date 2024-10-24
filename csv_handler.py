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