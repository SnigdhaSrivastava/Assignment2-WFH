from bottle import route, run ,request,post,template
from collections import OrderedDict 
import json
import psycopg2
from truckpad.bottle.cors import CorsPlugin, enable_cors
import bottle

def cors(func):
    def wrapper(*args, **kwargs):
        bottle.response.set_header("Access-Control-Allow-Origin", "*")
        bottle.response.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        bottle.response.set_header("Access-Control-Allow-Headers", "Origin, Content-Type")
        
        # skip the function if it is not needed
        if bottle.request.method == 'OPTIONS':
            return

        return func(*args, **kwargs)
    return wrapper



@route('/',method='get')
@cors
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


