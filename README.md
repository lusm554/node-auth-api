<h1>API for authorization and file upload/download</h1>

## Singup

### Request

`GET /api/users/signup`

    curl --location --request POST 'http://localhost:8080/api/users/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "name": "loveyousomuch",
      "password": "123"
    }'

### Response

    {
      "_id":"5f763ef452b21b883d5eb551",
      "name":"loveyousomuch",
      "password":"123",
      "tokens": [
        {
          "_id":"5374a8de223ede6623893c64",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
              eyJpZCI6IjVmNzRhOGRlMjIzZWRlNjYyMzg5M2M2NCIsImlhdCI6MTYwMTQ4MDkyNn0.
              2OF5y31GsRNoEr62TkqpuyFhSM-3vWf8ZvRy_I-AH5E"
        }
      ],
      "created_at":"2020-10-01T20:41:24.716Z",
      "updatedAt":"2020-10-01T20:41:24.716Z",
      "__v":0}

### Get session token

`POST /api/users/auth`

    curl --location --request POST 'http://localhost:8080/api/users/auth' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
      eyJpZCI6IjVmNzRhOGRlMjIzZWRlNjYyMzg5M2M2NCIsImlhdCI6MTYwMTQ4MDkyNn0.
      2OF5y31GsRNoEr62TkqpuyFhSM-3vWf8ZvRy_I-AH5E' \
    --header 'sessiontoken: "" ' \
    --data-raw '{
      "name": "loveyousomuch",
      "password": "123"
    }'

### Response

    {
      "user": {
        "_id":"5374a8de223ede6623893c64",
        "name":"loveyousomuch",
        "password":"123",
        "tokens": [
          {
            "_id":"5f74a8de223ede6623893c65",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
              eyJpZCI6IjVmNzRhOGRlMjIzZWRlNjYyMzg5M2M2NCIsImlhdCI6MTYwMTQ4MDkyNn0.
              2OF5y31GsRNoEr62TkqpuyFhSM-3vWf8ZvRy_I-AH5E"
          }
        ],
        "created_at":"2020-09-30T15:48:46.487Z",
        "updatedAt":"2020-09-30T15:48:46.487Z",
        "__v":0
        },
        "token":"e0d94218-4bd6-4f36-be4c-bcba76984613"
      }