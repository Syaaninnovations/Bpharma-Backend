# generic function to generate error message
def generate_error(msg, data=None):
    if data is None:
        data = {}
    response_json = dict()
    response_json["msg"] = msg
    response_json["response"] = False
    response_json["data"] = data
    return response_json


# generic function to generate success message
def generate_success(msg, data=None):
    if data is None:
        data = {}
    response_json = dict()
    response_json["data"] = data
    response_json["msg"] = msg
    response_json["response"] = True
    return response_json