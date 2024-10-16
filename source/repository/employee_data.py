from flask import jsonify
from datetime import datetime, timezone
from source.common.database_manager import ManagePostgreSQLDB

class EmployeeData:
    def __init__(self):
        database_object = ManagePostgreSQLDB.get_instance()
        self.__db_obj = database_object.get_database_object()
    
    def employeeExists(self,input_json):
        try:
            # Create a cursor
            cursor = self.__db_obj.cursor()

            # Check if em_code exists in the employee table
            check_sql = """
            SELECT 1 FROM employee WHERE em_code = %(em_code)s
            """

            # Execute the check
            cursor.execute(check_sql, {'em_code': input_json['Code']})
            employee_data = cursor.fetchone()
            return employee_data
        except Exception as e:
            print("Exception",e)
            return None
    
    def createEmployeeRecord(self,input_json):
        try:
            # Get the current time in UTC
            utc_now = datetime.now(timezone.utc)

            
            # Create a cursor
            cursor = self.__db_obj.cursor()
            
            #Prepare raw SQL query to insert employee data
            sql = """
            INSERT INTO employee (emp_name, dob, email, phone_num, em_code, created_by, created_on, updated_by, updated_on, isactive)
            VALUES (%(emp_name)s, %(dob)s, %(email)s, %(phone_num)s, %(em_code)s, %(created_by)s, %(created_on)s, %(updated_by)s, %(updated_on)s, %(isactive)s)
            """
            # Execute the query using the SQLAlchemy engine
            cursor.execute(sql, {
                'emp_name': input_json['Name'],
                'dob': input_json['DOB'],
                'email': input_json['Email'],
                'phone_num': input_json.get('PhoneNumber'),
                'em_code': input_json.get('Code'),
                'created_by': "Admin",
                'created_on': utc_now,
                'updated_by': "Admin",
                'updated_on': utc_now,
                'isactive': 1
            })
            # Commit the transaction
            self.__db_obj.commit()

            # Close the cursor
            cursor.close()
            return jsonify({"message": "Employee added successfully"}), 201
        except Exception as e:
            print("Exception",e)
            return jsonify({"error": str(e)}), 400
    
    def updateEmployeeRecord(self,input_json):
        try:
            # Get the current time in UTC
            utc_now = datetime.now(timezone.utc)

            
            # Create a cursor
            cursor = self.__db_obj.cursor()
            
            #Update employee data
            update_sql = """
            UPDATE employee
            SET emp_name = %(emp_name)s, dob = %(dob)s, email = %(email)s, 
                phone_num = %(phone_num)s, updated_by = %(updated_by)s, updated_on = %(updated_on)s
            WHERE em_code = %(em_code)s
            """
            # Execute the query using the SQLAlchemy engine
            cursor.execute(update_sql, {
                'emp_name': input_json['Name'],
                'dob': input_json['DOB'],
                'email': input_json['Email'],
                'phone_num': input_json.get('PhoneNumber'),
                'em_code': input_json.get('Code'),
                'updated_by': "Admin",
                'updated_on': utc_now,
            })
            # Commit the transaction
            self.__db_obj.commit()

            # Close the cursor
            cursor.close()
            return jsonify({"message": "Employee details updated successfully"}), 201
        except Exception as e:
            print("Exception",e)
            return jsonify({"error": str(e)}), 400
    
    def deleteEmployeeRecord(self,em_code):
        try:
            # Create a cursor
            cursor = self.__db_obj.cursor()
            
            # Prepare the delete SQL query
            delete_sql = """
            DELETE FROM employee WHERE em_code = %(em_code)s
            """

            # Execute the query using the SQLAlchemy engine
            cursor.execute(delete_sql, {'em_code': em_code})
            # Commit the transaction
            self.__db_obj.commit()

            # Close the cursor
            cursor.close()

            # Provide feedback
            return jsonify({"message": f"Employee with Code {em_code} has been deleted"}), 200

        except Exception as e:
            # Rollback if there is an error and return a 500 status code
            self.__db_obj.rollback()
            return jsonify({"error": str(e)}), 500