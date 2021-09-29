from flask import Flask, render_template, redirect



#create app
graph = Flask(__name__)

#passes db results into html   
@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)





