import csv
import glob
import os
from config.constants import DATA_DIR

class CSVHandler:
    '''
    Class to handle CSV files
    '''

    def write_csv(self, file_name, data):
        '''
        Writes a CSV file with the given filename and parsed word list.
        
        Saves the file to {DATA_DIR}/{file_name}.csv
        '''

        file_path = f"{DATA_DIR}/{file_name}.csv"
        
        with open(file_path, 'w', newline='') as csvfile:
            fieldnames = ['word', 'definition', 'example_sentence']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for row in data:
                writer.writerow(row)
    
    def read_csv(self, file_name):
        '''
        Reads a CSV file with the given filename.
        
        Returns a list of dictionaries, where each dictionary represents a row in the CSV file.

        CSV file must be in {DATA_DIR}
        '''

        file_path = f"{DATA_DIR}/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            return list(reader)
        
    def get_wordlists_and_counts(self):
        '''
        Returns a list of all CSV files in the {DATA_DIR} and their row counts (i.e. # of words)
        '''

        csv_files = glob.glob(f"{DATA_DIR}/*.csv")

        wordlists_and_counts = {}
        
        for file in csv_files:
            filename = os.path.splitext(os.path.basename(file))[0]  # Get filename without extension
            row_count = self.count_csv_rows(filename)
            wordlists_and_counts[filename] = row_count

        return wordlists_and_counts

    def count_csv_rows(self, file_name):
        '''
        Counts the number of rows in a CSV file with the given filename.

        CSV file must be in {DATA_DIR}
        '''

        file_path = f"{DATA_DIR}/{file_name}.csv"
        with open(file_path, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)  # Skip the header row
            return sum(1 for row in reader)
        
    def delete_csv(self, file_name):
        '''
        Deletes a CSV file with the given filename.

        CSV file must be in {DATA_DIR}
        '''

        file_path = f"{DATA_DIR}/{file_name}.csv"
        os.remove(file_path)
