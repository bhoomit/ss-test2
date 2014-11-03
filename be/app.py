import os, re
import urllib, json, traceback
from functools import wraps
from flask import Flask, redirect, request, current_app, jsonify

app = Flask(__name__)

def support_jsonp(f):
	"""Wraps JSONified output for JSONP"""
	@wraps(f)
	def decorated_function(*args, **kwargs):
	   callback = request.args.get('callback', False)
	   if callback:
		  content = str(callback) + '(' + str(f().data) + ')'
		  return current_app.response_class(content, mimetype='application/json')
	   else:
		  return f(*args, **kwargs)
	return decorated_function


# Params: q: query, t: type should bw one of allowedTypes key in Service.py
# Example Link: http://warim2.herokuapp.com/eqSearch?t=math&q=1+1

@app.route('/list', methods=['GET'])
@support_jsonp
def list():
	try:
	    resp=[]
	    for item in os.listdir(request.args.get('p')):
	    	name, ext = guess_extension(item)
	    	if ext == '':
	    		ext = "dir"
	    	resp.append([name, ext])
		result = jsonify({'data':resp})
	except Exception as e:
	   print traceback.format_exc()
	   return jsonify({'status':'error','msg': e.args ,'traceball':traceback.format_exc()})

	return result

@app.route('/fetch', methods=['GET'])
@support_jsonp
def fetch():
	try:
	   result = jsonify({'data':os.listdir(request.args.get('p'))})
	except Exception as e:
	   print traceback.format_exc()
	   return jsonify({'status':'error','msg': e.args ,'traceball':traceback.format_exc()})

	return result


DOUBLE_EXTENSIONS = ['tar.gz','tar.bz2'] # Add extra extensions where desired.

def guess_extension(filename):
    """
    Guess the extension of given filename.
    """
    root,ext = os.path.splitext(filename)
    if any([filename.endswith(x) for x in DOUBLE_EXTENSIONS]):
        root, first_ext = os.path.splitext(root)
        ext = first_ext + ext
    return root, ext

if __name__ == '__main__':
	# Bind to PORT if defined, otherwise default to 5000.
	port = int(os.environ.get('PORT', 5000))
	app.run(host='0.0.0.0', port=port)