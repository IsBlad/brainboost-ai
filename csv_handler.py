import csv
import glob
import os
from config.constants import DATA_DIR

class CSVHandler:
    def write_csv(self, file_name, data):
        
        file_path = f"{DATA_DIR}/{file_name}.csv"
        
        with open(file_path, 'w', newline='') as csvfile:
            fieldnames = ['word', 'definition', 'example_sentence']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for row in data:
                writer.writerow(row)
    
    def read_csv(self, file_name):
        file_path = f"{DATA_DIR}/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            return list(reader)
        
    def get_wordlists_and_counts(self):
        '''Returns a list of all CSV files and their row counts (i.e. # of words) in the data directory'''
        csv_files = glob.glob(f"{DATA_DIR}/*.csv")

        wordlists_and_counts = {}
        
        for file in csv_files:
            filename = os.path.splitext(os.path.basename(file))[0]  # Get filename without extension
            row_count = self.count_csv_rows(filename)
            wordlists_and_counts[filename] = row_count

        return wordlists_and_counts

    def count_csv_rows(self, file_name):
        file_path = f"{DATA_DIR}/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)  # Skip the header row
            return sum(1 for row in reader)