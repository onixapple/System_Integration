from fastapi import FastAPI
from datetime import datetime, timezone
import requests 
import pytz 

app = FastAPI()

@app.get("/timestamp", 
    responses={
        200: {
            "description": "Returns the current time and date in UTC",
        }
    }
)
def _():
    cph_timezone = pytz.timezone("Europe/Copenhagen") 
    current_datetime = datetime.now(cph_timezone).isoformat()
    return {"current_datetime": current_datetime}

@app.get("/timestampFromOtherServer",
    responses={
        200: {
            "description": "Returns the current time and date in UTC from the date-authority.",
        }
    }
)
def _():
    # the other server (which is in node_server folder) should be also running
    get_Date_From_Other_Server = requests.get("http://localhost:3000/timestamp")
    content = get_Date_From_Other_Server.content
    return {"response": content}

@app.get("/test",
    responses={
        200: {
            "description": "Returns that everything is working",
        }
    }
)
def _():
    return {"message": "all good"}