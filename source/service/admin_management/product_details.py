from flask import jsonify
from source.common.database_manager import ManagePostgreSQLDB
class Product:
    def __init__(self):
        
        database_object = ManagePostgreSQLDB.get_instance()
        self.__db_obj = database_object.get_database_object()


    def get_product_data(self, product_id):
        print("input_json.........",product_id)
        cur = self.__db_obj.cursor()
        if product_id: 
            query = f"SELECT * FROM products where product_id={product_id}"
        else:
            query = f"SELECT * FROM products"
        cur.execute(query)
        # Fetch all results
        products = cur.fetchall()
        cur.close()
        return jsonify(products)
        



    def add_or_update_product_data(self, input_json):
        print("input_json.........",input_json)
    
    def delete_product_data(self, product_id):
        try:
            # Assuming you're using SQLAlchemy
            product = ProductModel.query.filter_by(id=product_id).first()
            
            if product is None:
                return {"response": False, "message": "Product not found"}
            
            # Delete the product
            db.session.delete(product)
            db.session.commit()
            
            return {"response": True, "message": "Product deleted successfully"}
        
        except Exception as e:
            # Handle any exceptions that occur during the process
            db.session.rollback()
            return {"response": False, "message": f"Error occurred: {str(e)}"}



        