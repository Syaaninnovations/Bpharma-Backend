from flask import Blueprint
from flask import request, jsonify

from source.service.admin_management.product_details import Product
from source.service.admin_management.employee_details import Employee

admin_features = Blueprint("admin_blueprint", __name__)

@admin_features.route('/get-product-details', methods=['GET'])
@admin_features.route('/get-product-details/<int:product_id>', methods=['GET'])
def get_product_details(product_id=None):
    obj = Product()
    response = obj.get_product_data(product_id)
    if not response["response"]:
        return response, 404
    return response, 200


@admin_features.route('/update-product-details', methods=['POST'])
def update_product_details():
    obj = Product()
    json_data = request.json
    response = obj.add_or_update_product_data(json_data)
    if not response["response"]:
        return response, 404
    return response, 200


@admin_features.route('/product/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    obj = Product()
    # Pass the product_id directly to the delete_product_data function
    response = obj.delete_product_data(product_id)
    if not response["response"]:
        return response, 404
    return response, 200

#Employee details
@admin_features.route('/employee/create', methods=['POST'])
def add_employee():
    obj = Employee()
    json_data = request.json
    response = obj.add_employee_data(json_data)
    return response

@admin_features.route('/employee/update', methods=['POST'])
def update_employee():
    obj = Employee()
    json_data = request.json
    response = obj.update_employee_data(json_data)
    return response


@admin_features.route('/employee/delete', methods=['DELETE'])
def delete_employee():
    obj = Employee()
    em_code = request.args.get('Code')
    # Pass the product_id directly to the delete_product_data function
    response = obj.delete_employee_data(em_code)
    return response