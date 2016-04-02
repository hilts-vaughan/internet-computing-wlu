Electric Boogaloo (CP 476 - WLU)
===================================


# Development Guide

## DB

### Connecting to MySQL

To connect to MySQL, you will need to add your database settings to your local `development.json` and then
have it updated to reflect your local settings. To do this, you will need to create `config/development.json`
inside of the `server` folder. Then, inside, the contents of it should look something like:

```
{
  "db": {
    "host": "localhost",
    "username": "root",
    "password": ""
  }  
}
```

You will only need to change this if you're not using a blank root password (which you shouldn't be!).

### Importing the MySQL Dump

You can do this through the command line or a GUI tool such as **MySQl Workbench**. Just import it to your local instance.
