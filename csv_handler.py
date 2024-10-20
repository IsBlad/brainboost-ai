import csv

class CSVHandler:
    def __init__(self, file_path):
        self.file_path = file_path

    def read_csv(self):
        with open(self.file_path, newline='') as csvfile:
            reader = csv.reader(csvfile)
            return list(reader)
        
    def write_csv(self, data):
        with open(self.file_path, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerows(data)