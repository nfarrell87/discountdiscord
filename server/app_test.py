import requests

def main():
    _json = {"Name":"Corey"}
    response = requests.post('http://127.0.0.1:5000/messages', json=_json)

main()

