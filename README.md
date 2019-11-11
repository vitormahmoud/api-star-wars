## API NODE JS / MONGODB

## Routes STAR-WARS

|       Rota      | Método |     Descrição              |
|-----------------|--------|----------------------------|
| /api/rest/planetRouter/             | GET    | [List Planets](#list-planets)       |
| /api/rest/planetRouter/:id          | GET| [Get Planet By Id](#get-planet-by-id)       |
| /api/rest/planetRouter/:name        | GET| [Get Planet By Name](#get-planet-by-name)       |
| /api/rest/planetRouter/:id          | DELETE | [Delete Planet](#delete-planet)       |
| /api/rest/planetRouter/             | POST| [Insert Planet](#insert-planet)       |
-----------------------------------------------------

### List Planets

```
GET /api/rest/planetRouter/
```

**Resposta**

```JSON
[
    {
        "PLANET_ID": "12",
        "NAME": "Venus",
        "CLIMATE": "Quente",
        "TERRAIN": "Alternatino",
        "QTD_FILMS": 0
    },
    {
        "PLANET_ID": "14",
        "NAME": "Alderaan",
        "CLIMATE": "Quente",
        "TERRAIN": "Alternatino",
        "QTD_FILMS": 2
    }
]
```

-----------------------------------------------------

### Get Planet By Id

```
GET /api/rest/planetRouter/:id
```

**Resposta**

```JSON
    {
        "PLANET_ID": "14",
        "NAME": "Alderaan",
        "CLIMATE": "Quente",
        "TERRAIN": "Alternatino",
        "QTD_FILMS": 2
    }

```
-----------------------------------------------------

### Get Planet By Name

```
GET /api/rest/planetRouter/:name
```

**Resposta**

```JSON
    {
        "PLANET_ID": "14",
        "NAME": "Alderaan",
        "CLIMATE": "Quente",
        "TERRAIN": "Alternatino",
        "QTD_FILMS": 2
    }
```

-----------------------------------------------------

### Delete Planet

```
DELETE /api/rest/planetRouter/:id
```

**Resposta**

```JSON
    {
        "result":true
    }
```

-----------------------------------------------------

### Insert Planet

```
POST /api/rest/planetRouter/
```

**Exemplo(body)**
```JSON
{
	"name":"Alderaan",
	"climate":"temperate",
	"terrain":"grasslands, mountains"
}
```

**Resposta**

```JSON
    {
        "result":true
    }
```
