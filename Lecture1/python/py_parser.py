import pandas
import yaml
from yaml.loader import SafeLoader


def parse_csv(path):
    data = pandas.read_csv(path)
    print("CSV:")
    print(data)
    

def parse_txt(path):
    data = {}
    with open(path, "r") as f:
        lines = f.readlines()
        count = 0
        key = ""
        value = ""
        for line in lines:
            count += 1
            if (count % 2) == 0: 
                value = line.strip() 
                data[key] = value
            else:
                 key = line.strip()
    print("TXT:")
    for key, value in data.items():
        print(f"{key}: {value}") 
   

def parse_yaml(path):
    with open(path) as f:
        data = yaml.load(f, Loader=SafeLoader) # creates a dictionary
        print(data)
        print("YAML:")
        data_items = data.items()  ##.items() # returns a view object 
        for item in data_items: # get single tuple
            print(f"{item[0]}: {item[1]}")
        print()

parse_csv("./files/file.csv")
parse_txt("./files/file.txt")
parse_yaml("./files/file.yaml")