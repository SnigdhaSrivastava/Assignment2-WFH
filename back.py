from bottle import route, run ,request,post,template
from collections import OrderedDict 
import json
import psycopg2
from truckpad.bottle.cors import CorsPlugin, enable_cors

def allow_cors(func):
    """ this is a decorator which enable CORS for specified endpoint """
    def wrapper(*args, **kwargs):
        response.set_header('Access-Control-Allow-Origin', '*')
        response.add_header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS') # * in case you want to be accessed via any website
        return func(*args, **kwargs)

    return wrapper

@enable_cors
@allow_cors
@route('/')
def db_connection():
    con = psycopg2.connect(
	host = "localhost",
	database = "postgres",
	user = "postgres",
	password = "root"
	)

    cur=con.cursor()

    sql = 'SELECT x,y FROM node;'
    print(sql)
    cur.execute(sql)
    con.commit()
    xy = cur.fetchall()
    print(xy)
    return json.dumps(xy)
    

run(host='localhost', port=8080, debug=True)


