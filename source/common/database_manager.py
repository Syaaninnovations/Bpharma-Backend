import psycopg2


from source.common.response import generate_success, generate_error

class ManagePostgreSQLDB:
    __instance = None
    __client = None


    @staticmethod
    def get_instance():
        if ManagePostgreSQLDB.__instance is None:
            ManagePostgreSQLDB()
        return ManagePostgreSQLDB.__instance
    
    def __init__(self):
        """ Virtually private constructor. """
        if ManagePostgreSQLDB.__instance is not None:
            print("This class is a singleton!")
        else:
            ManagePostgreSQLDB.__instance = self
    
    def init_postgres(self, app, is_local=False):
        self.get_instance()
        self.connect_to_db(is_local)

    def get_database_object(self):
        return self.__client

    def connect_to_db(self, is_local=False):
        try:
            # self.__client = psycopg2.connect(connection_string)
            self.__client  = psycopg2.connect(
                host="localhost",
                database="bbmspharma",
                user="admin",
                password="password"
            )
            print("Database connection success..")
            return generate_success("Database connection success!!")
        except Exception as error:
            return generate_error(error)