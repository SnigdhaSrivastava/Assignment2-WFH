from bottle import route, run ,request,post,template,response
from collections import OrderedDict 
import json
import psycopg2
from truckpad.bottle.cors import CorsPlugin, enable_cors
import bottle
import logging

#generating logs (file name in which logs are generated - sample.log)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('sample.log')
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)

#for allowing cross policy origin
#to allow the backend python-bottle data to be accessed by the angular server for frontend. 
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
    con = psycopg2.connect(        #establishing the database connection.
	host = "localhost",
	database = "postgres",
	user = "postgres",
	password = "root"
	)

    cur=con.cursor()

    sql = 'SELECT * FROM netnode;'     #fetching all the node details from the database for using it in frontend.
    logger.info(sql)
    cur.execute(sql)
    con.commit()
    xy = cur.fetchall()
    logger.info(xy)          #x,y coordinates

    return json.dumps(xy)

@route('/addnode',method = 'post')
@cors
def addnode():

    name1 = request.params.get('name')
    status1= request.params.get('status')
    ip1= request.params.get('ip')
    xcoord1= request.params.get('xcoord')
    ycoord1= request.params.get('ycoord')
    

    con = psycopg2.connect(        #establishing the database connection.
 	host = "localhost",
 	database = "postgres",
 	user = "postgres",
 	password = "root"
 	)

    cur=con.cursor()

     
    cur.execute("INSERT INTO netnode(name,status,ip,x,y) VALUES(%s,%s,%s,%s,%s);",(name1,status1,ip1,xcoord1,ycoord1))
    con.commit()
    
     
    return json.dumps("TRUEEEEEEEE")







    

run(host='localhost', port=8080, debug=True)


