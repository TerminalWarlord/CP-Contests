import requests

script = """
a = 'hello lol'
b = a.split(' ')
print(b)
"""
base = 'http://localhost:5000/run'
data = {
            "script": script,
            "stdin" : '',
            "language" : 'python3',
            "versionIndex" : 4
        }
r = requests.post(base, json=data).text
# r = requests.get(base).json()
print(r)