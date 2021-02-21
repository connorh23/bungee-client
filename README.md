# Bungee Client
```bungee-client``` is a wrapper for the ```bungee-server``` web apis.  The client manages domain routing, implements request retries, and parses resposnes for ease of use, among other functions.

---
### Installation
```shell script
npm install bungee-lib
``` 
---
### Usage Example
Together with ```bungee-lib/environment``` you can make requests to your bungee cluster in the following manner
```javascript
const { rest } = require('./rest');
const { environment } = require('bungee-lib');

const test = async () => {
   
    // Create new items
    const create_response = await rest.create({
        model: environment.vars.USERS,
        item: {
            name: "test",
            email: "test"
        }
    });
    const new_user = create_response.data;

    // Fetch item by id
    const retrieve_user_response = await rest.retrieve({
        model: environment.vars.USERS,
        id: new_user.id
    });
    const retrieved_user = retrieve_user_response.data;
    
    // Update an item
    new_user.name = 'updated name';
    const update_response = await rest.update({
        model: environment.vars.USERS,
        item: new_user
    });

    // Destroy an item
    const destroy_response = await rest.destroy({
        model: environment.vars.USERS,
        id: new_user.id
    });
    const destroy_success = destroy_response.data === 1;
   
};

test();
```
