# Understanding REST APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on stateless, client-server communication over HTTP using standard methods and status codes. RESTful APIs are designed around resources, which can be anything from users and products to documents.

## Key Concepts

1. **Resources**  
   Everything that can be accessed via a RESTful API is considered a "resource." Each resource has a unique identifier (URI).

2. **Representations**  
   Resources are transferred in some representation like JSON or XML.

3. **Stateless Communication**  
   Each request from client to server contains all needed information; the server does not store any state about the client session.

4. **HTTP Methods**  
   REST APIs use standard HTTP methods to perform actions on resources.

5. **HTTP Status Codes**  
   Servers use HTTP status codes to indicate the outcome of a client's request.

---

## HTTP Methods

HTTP methods define the action you want to perform on a resource.

| Method  | Description                                                                 | Idempotent |
|--------|------------------------------------------------------------------------------|-----------|
| GET    | Retrieves a resource or list of resources. Does not modify server data.     | Yes       |
| POST   | Creates a new resource using request body data.                             | No        |
| PUT    | Replaces a resource with new data (full update).                            | Yes       |
| PATCH  | Partially updates a resource.                                               | Yes       |
| DELETE | Deletes a resource.                                                         | Yes       |

### Important Notes

- **Idempotence:** Same result if repeated multiple times (GET, PUT, PATCH, DELETE)  
- **POST is not idempotent**  
- **Safe methods:** GET, HEAD, OPTIONS (do not modify server data)

---

## HTTP Status Codes

### Categories

| Range | Meaning |
|------|--------|
| 1xx  | Informational |
| 2xx  | Success |
| 3xx  | Redirection |
| 4xx  | Client Error |
| 5xx  | Server Error |

---

## Common Status Codes

| Code | Category       | Description                                      | Use Case |
|------|---------------|--------------------------------------------------|----------|
| 200  | Success       | OK                                               | Successful GET |
| 201  | Success       | Created                                          | Successful POST |
| 204  | Success       | No Content                                       | Successful DELETE |
| 301  | Redirection   | Moved Permanently                                | URL changed |
| 302  | Redirection   | Found                                            | Temporary redirect |
| 304  | Redirection   | Not Modified                                     | Cache validation |
| 400  | Client Error  | Bad Request                                      | Invalid request |
| 401  | Client Error  | Unauthorized                                     | Authentication required |
| 403  | Client Error  | Forbidden                                        | No permission |
| 404  | Client Error  | Not Found                                        | Resource missing |
| 405  | Client Error  | Method Not Allowed                               | Wrong HTTP method |
| 409  | Client Error  | Conflict                                         | Resource conflict |
| 422  | Client Error  | Unprocessable Entity                             | Semantic error |
| 500  | Server Error  | Internal Server Error                            | Server failure |
| 501  | Server Error  | Not Implemented                                  | Feature not supported |
| 503  | Server Error  | Service Unavailable                              | Server down |

---

## RESTful API Design Best Practices

- Use nouns for resources (e.g., `/users`, `/products`)
- Use plural naming (`/users`)
- Use HTTP methods correctly:
  - GET → Read
  - POST → Create
  - PUT → Update
  - DELETE → Delete
- Use appropriate status codes
- Keep APIs consistent
- Design stateless APIs

---

## Interview Questions and Answers

### Q1: What is a REST API?
REST is an architectural style for designing networked applications. It uses stateless communication and standard HTTP methods to interact with resources.

---

### Q2: Common HTTP methods and meaning?

- GET → Retrieve data  
- POST → Create resource  
- PUT → Replace resource  
- PATCH → Partial update  
- DELETE → Remove resource  

---

### Q3: Difference between PUT and PATCH?

- **PUT:** Replaces entire resource  
- **PATCH:** Updates only specific fields  

---

### Q4: What are HTTP status codes?

They are three-digit codes used by servers to indicate the result of a request.

---

### Q5: Examples of status codes?

- 200 OK → Success  
- 201 Created → Resource created  
- 400 Bad Request → Invalid request  
- 401 Unauthorized → Authentication required  
- 403 Forbidden → No permission  
- 404 Not Found → Resource not found  
- 500 Internal Server Error → Server issue  

---

### Q6: What is idempotent?

An operation that gives the same result even if repeated multiple times.

**Idempotent methods:** GET, PUT, PATCH, DELETE  

---

### Q7: What are safe methods?

Methods that do not modify server data.

**Safe methods:** GET, HEAD, OPTIONS  

---

### Q8: Should API return error status codes?

Yes. APIs should return proper error codes with descriptive messages.

---



Link:- https://drive.google.com/file/d/1UWpPkjL9q3sqiRAN7FZ37cCDGgX2MpB4/view
