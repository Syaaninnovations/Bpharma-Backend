from flask import jsonify
from datetime import datetime, timezone
from source.repository.employee_data import EmployeeData

class Employee:
    def __init__(self):
        self.__employee_data_obj = EmployeeData()

    
    def add_employee_data(self, input_json):
        try:
            # Basic validation
            if not input_json.get('Name') or not input_json.get('PhoneNumber') or not input_json.get('Code') or not input_json.get('Email'):
                return jsonify({"error": "Required fields are missing."}), 400
            
            isemployeeExists = self.__employee_data_obj.employeeExists(input_json)

            if isemployeeExists:
                return jsonify({"error": f"Employee already exists with Code: {input_json['Code']}"}), 400
            
            employeeRecord = self.__employee_data_obj.createEmployeeRecord(input_json)
            return employeeRecord

        except Exception as e:
            return jsonify({"error": str(e)}), 400
    

    def update_employee_data(self, input_json):
        try:
            # Basic validation
            if not input_json.get('Name') or not input_json.get('PhoneNumber') or not input_json.get('Code') or not input_json.get('Email'):
                return jsonify({"error": "Required fields are missing."}), 400
            
            isemployeeExists = self.__employee_data_obj.employeeExists(input_json)

            if not isemployeeExists:
                return jsonify({"error": f"Employee not exists with Code: {input_json['Code']}"}), 400
            
            updateEmployee = self.__employee_data_obj.updateEmployeeRecord(input_json)
            return updateEmployee

        except Exception as e:
            return jsonify({"error": str(e)}), 400
    

    def delete_employee_data(self, em_code):
        try:
            if not em_code:
                return jsonify({"error": "Code is required"}), 400
            
            deleteEmployee = self.__employee_data_obj.deleteEmployeeRecord(em_code)
            return deleteEmployee

        except Exception as e:
            return jsonify({"error": str(e)}), 400