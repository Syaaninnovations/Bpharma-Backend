
"""
/****************************************************************************
* Copyright (C) , Inc 2024- - All Rights Reserved.
*
*
* 3rd party commercial software libraries used:
*     none
*
* Opensource software libraries used:
*     configparser
*
* Written by Anees Hassan M <aneesmhassan@gmail.com>, Sep 2024
*****************************************************************************/
"""

import configparser
import os


class ParseConfig:
    __config = configparser.ConfigParser()
    __results = dict()

    def __init__(self, file_name):
        self.__config.read(file_name)
        self.__env_url = self.get_env_url()

    def get_env_url(self):
        system_env_details = self.__config['SYSTEM_ENV']
        try:
            sys_env = str(os.environ['ENVIRONMENT'])
            return str(system_env_details[sys_env])
        except Exception as error:
            # iLogger(iLogLevel.ERROR.name, "Config Parser: get_env_url", str(error))
            return str(system_env_details['DEV'])

    def get_server_details(self):
        server_details = self.__config['SERVER_DETAILS']
        if server_details['ServerIP']:
            self.__results["host"] = server_details['ServerIP']
        if server_details['ServerListeningPort']:
            self.__results["port"] = server_details['ServerListeningPort']
        print("Host: " + self.__results["host"])
        print("Port: " + self.__results["port"])
        return self.__results