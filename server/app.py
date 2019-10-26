import json

from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument("message")
parser.add_argument("user")


class Users(Resource):
    def __init__(self):
        self._USER_ID_MAX = 3
        self.USERS = {"users":
            [
                {"id": 1, "name": "admin"},
                {"id": 2, "name": "nick"},
                {"id": 3, "name": "corey"}
            ]
    }

    def get(self):
        return self.USERS


class Messages(Resource):
    def __init__(self):
        self.file_name = 'messages.json'
        self.messages = None

    def get(self):
        if self.messages is None:
            self.messages = self.get_messages_from_database()
        return self.messages['messages']

    def post(self):
        args = parser.parse_args()
        self.messages = self.get_messages_from_database()
        new_message = {"id": self.messages['top_id'],
                       "user": args.user,
                       "content": args.message}
        self.update_messages(new_message)
        self._write_to_database()
        print(self.messages)

    def update_messages(self, new_message):
        self.messages["messages"].append(new_message)
        self.messages['top_id'] += 1

    def _write_to_database(self):
        with open(self.file_name, 'w') as json_file:
            json.dump(self.messages, json_file)

    def get_messages_from_database(self):
        with open(self.file_name, 'r') as json_file:
            messages = json.load(json_file)
            return messages


api.add_resource(Users, '/users')
api.add_resource(Messages, '/messages')

if __name__ == '__main__':
    app.run(debug=True)
