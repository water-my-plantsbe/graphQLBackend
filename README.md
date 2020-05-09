## Endpoints

### POST /api/register
* To register a user, user must have username, password, email, and phone number.
* Request example: 
```
{
  username: "David",
  password: "password",
  email: "david@email.com",
  phone: "1(123)456-7890"
}
```
* Returns
```
{
  username: "David",
  email: "david@email.com",
  phone: "1(123)456-7890"
}
```

### POST /api/login
* Provide a body with username and password. Returns a user object and a jwt token.
* Request example:
```
{
  "username": "David",
  "password": "password"
}
```
* Returns 
```
{
  "user": {
    username: "David",
    password: "password",
  },
    "token": "eyJhbI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imp1c3RpbiIsImlhdCI6MTU0OTI5MTkyNiwiZXhwmTIW7fdXkrA8"
}
```
---
### GET /api/users/{user id}
**JWT token required**
* Returns an object with a single user's info. Only accessible by that user.
```
{
 "user": {
    "id": 1,
    "username": "david",
    "email": "david@gmail.com",
    "phone": "1(123)456-7890",
}
```
### GET /api/users/
**JWT token required**
* Returns a list of all usernames

### GET /api/plants
* returns all plants in the db:
```
[
    {
        "name": "rose",
        "description": Red,
    },
]
```
### GET /api/plants/{plantId}
* Returns information on a single plant. Only accessible by plant owner.
```
{
    "id": 23,
    "user_id": 1,
    "name": "Marigold",
    "description": "My Favorite tree",
    "last_water": null
}
```
---
### GET /api/users/{userId}/plants
**JWT token required**
* Returns a list of all plants of a user(json objects) and scheduled watering times. Only accessible by plant owner.
* Return example:
```
[
    {
        "id": 23,
        "user_id": 1,
        "name": "Marigold",
        "description": "My Favorite tree",
        "last_water": null,
        "schedule": [
            {
                "id": 2,
                "watering_time": "2019-04-17T15:33:50.000Z"
            },
            {
                "id": 3,
                "watering_time": "2019-04-17T16:50:50.000Z"
            }
        ]
    },
]
```
---
### PUT /api/users/{userId}
**JWT token required**
* Update user info. Only accessible by that user.

---
### PUT /api/plants/{plantId}
**JWT token required**
* Update plant. Only accessible by plant owner.

---
### POST /api/users/{userId}/plants
**JWT token required**
* Add a new plant for the user
* POST BODY:
```
{
	"name": "Ganda",
    "description": yellow,

}
```
* Returns:
```
{
    "id": 12,
    "user_id": 2,
    "name": "Ganda",
    "description": yellow,
    "last_water": null
}
```
---
### DELETE /api/plants/{plantId}
**JWT token required**
* Delete plant. Only accessible by plant owner.

---
### POST /api/plants/{plantId}
**JWT token required**
* Add watering times to a plant.
* Accepts an array of times in format `YYYY-MM-DD HH:SS` and adds them to the watering schedule
* POST body:
```
	"times": ["2019-04-17 18:00", "2019-04-18 8:00"]
```
* Returns the updated plant watering schedule:
```
[
    {
        "id": 2191,
        "watering_time": "2019-04-17T18:00:00.000Z"
    },
    {
        "id": 2192,
        "watering_time": "2019-04-18T08:00:00.000Z"
    }
]
```
---
### GET /api/plants/{plantId}/schedule
**JWT token required**
* Returns an array of scheduled watering times
```
[
    {
        "id": 2,
        "watering_time": "2019-04-17T18:00:00.000Z"
    },
    {
        "id": 3,
        "watering_time": "2019-04-18T08:00:00.000Z"
    }
]
```

---
### DELETE /api/plants/{plantId}/schedule
**JWT token required**
* Deletes the entire schedule for the selected plant

---
### DELETE /api/plants/{plantId}/schedule/{wateringId}
**JWT token required**
* Deletes a specific watering time from the schedule
* Returns the updated watering schedule
