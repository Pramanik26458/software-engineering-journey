# Authentication Notes (JWT + Cookies + Hashing + bcrypt)

---

# Table of Contents

1. Hashing
2. MD5 Hashing
3. bcrypt
4. Salt & Salt Rounds
5. Cookies
6. JWT (JSON Web Token)
7. Authentication Flow
8. Protected Routes
9. Common Status Codes
10. Interview Questions

---

# 1. Hashing (Passwords)

## What is Hashing?

Hashing is a one-way cryptographic process that converts data (like a password) into a fixed-length string called a hash.

### Properties of Hashing

* One-way process
* Cannot be reversed
* Same input → same output
* Used for secure password storage

---

## Why Hash Passwords?

If a database gets hacked:

### Plain Password ❌

```text
email: basak@gmail.com
password: basak123
```

Attacker can directly see the password.

---

### Hashed Password ✅

```text
email: basak@gmail.com
password: e10adc3949ba59abbe56e057f20f883e
```

Original password is hidden.

---

# 2. MD5 Hashing

## What is MD5?

MD5 (Message Digest 5) is a hashing algorithm.

Used for learning purposes only.

NOT recommended for production applications.

---

## MD5 Example

```js
const crypto = require("crypto");

const hash = crypto
  .createHash("md5")
  .update(password)
  .digest("hex");
```

---

## Line by Line Explanation

### createHash("md5")

```js
crypto.createHash("md5")
```

Creates a hashing object using MD5 algorithm.

---

### update(password)

```js
.update(password)
```

Feeds the password into the hashing function.

Example:

```js
password = "123456"
```

---

### digest("hex")

```js
.digest("hex")
```

Finalizes the hash and converts it into hexadecimal format.

---

## Final Result

```js
password = "123456"

hash = "e10adc3949ba59abbe56e057f20f883e"
```

Store the hash in DB, NOT the original password.

---

## Problems with MD5 ❌

* Fast hashing
* Easy to crack
* No automatic salting
* Vulnerable to rainbow table attacks

Modern applications use:

* bcrypt
* argon2

---

# 3. bcrypt (Modern Password Hashing)

## What is bcrypt?

bcrypt is a password hashing library specially designed for authentication systems.

It is the industry standard for password security.

---

## Why bcrypt is Better than MD5?

| MD5           | bcrypt             |
| ------------- | ------------------ |
| Fast hashing  | Intentionally slow |
| Easy to crack | Harder to crack    |
| No salt       | Automatic salt     |
| Weak security | Strong security    |
| Old algorithm | Industry standard  |

---

## Installing bcrypt

```bash
npm i bcrypt
```

---

## Importing bcrypt

```js
const bcrypt = require("bcrypt");
```

---

# Hashing Password using bcrypt

## Example

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

---

## Explanation

| Value    | Meaning                   |
| -------- | ------------------------- |
| password | Original password         |
| 10       | Salt rounds / cost factor |

---

# Meaning of Salt Rounds (`10`)

The `10` controls how much computational work bcrypt performs.

Mathematically:

```text
2^10 = 1024
```

bcrypt internally performs around 1024 rounds of processing.

---

## Salt Round Comparison

| Salt Rounds | Security    | Speed       |
| ----------- | ----------- | ----------- |
| 5           | Low         | Fast        |
| 10          | Balanced    | Recommended |
| 12          | Strong      | Slower      |
| 15+         | Very Strong | Very Slow   |

Most developers use:

```js
10
```

---

# 4. Salt

## What is Salt?

Salt is random data added to a password before hashing.

---

## Why Salt is Important?

Without salt:

```text
123456 → same hash every time
```

Easy to crack.

---

## With Salt

```text
123456 + random salt → unique hash
```

Even same passwords produce different hashes.

bcrypt automatically adds salt internally.

---

## Example

User 1:

```text
password = basak123
hash = $2b$10$abc...
```

User 2:

```text
password = basak123
hash = $2b$10$xyz...
```

Same password → different hashes.

---

# Register Flow using bcrypt

```text
User enters password
        ↓
bcrypt.hash()
        ↓
Password converted into secure hash
        ↓
Store hash in database
```

---

# Login using bcrypt.compare()

Passwords are never decrypted.

Instead bcrypt compares the entered password with stored hash.

---

## Example

```js
const isMatch = await bcrypt.compare(
  password,
  user.password
);
```

---

## Result

```text
true  → password correct
false → invalid password
```

---

# Login Flow

```text
User enters password
        ↓
bcrypt.compare()
        ↓
Compare with stored hash
        ↓
true / false
```

---

# Hashing vs Encryption

| Hashing            | Encryption                    |
| ------------------ | ----------------------------- |
| One-way            | Two-way                       |
| Cannot decrypt     | Can decrypt                   |
| Used for passwords | Used for secure communication |

Passwords should always be HASHED, not encrypted.

---

# 5. Cookies

## What is a Cookie?

A cookie is small data stored in the browser and automatically sent with every request.

---

## Why Cookies?

* Maintain login sessions
* Store JWT token
* Track user authentication

---

## Example

```js
res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict"
});
```

---

## Important Cookie Flags

| Flag     | Purpose                             |
| -------- | ----------------------------------- |
| httpOnly | Prevents JS access (XSS protection) |
| secure   | Sent only over HTTPS                |
| sameSite | Prevents CSRF attacks               |

---

# Cookie Flow

```text
User logs in
      ↓
Server sends cookie
      ↓
Browser stores cookie
      ↓
Cookie automatically sent with every request
```

---

# 6. JWT (JSON Web Token)

## What is JWT?

JWT is a token-based authentication mechanism used to verify user identity.

---

# JWT Structure

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## JWT Components

| Part      | Purpose               |
| --------- | --------------------- |
| Header    | Algorithm info        |
| Payload   | User data             |
| Signature | Security verification |

---

# Why Use JWT?

* Stateless authentication
* No session storage
* Easy scalability
* Fast verification

---

# Creating JWT

```js
const token = jwt.sign(
  {
    id: user._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
```

---

# Verifying JWT

```js
const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);
```

---

## JWT Verification Purpose

* Checks token validity
* Decodes user data
* Protects private routes

---

# JWT Authentication Flow

```text
User logs in
      ↓
Server creates JWT
      ↓
JWT stored in cookie/localStorage
      ↓
Client sends token with request
      ↓
Server verifies token
```

---

# 7. Authentication Flow

```text
User Registers
       ↓
Password gets hashed
       ↓
Store user in database
       ↓
Generate JWT token
       ↓
Send token in cookie
       ↓
User authenticated
```

---

# 8. Protected Routes

## What is a Protected Route?

A route accessible only to authenticated users.

---

## Example

```js
authRouter.get("/get-me", async (req, res) => {

  const token = req.cookies.token;

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await userModel.findById(decoded.id);

  res.json(user);

});
```

---

# Protected Route Flow

```text
Client sends token
        ↓
Server verifies token
        ↓
Token valid ?
   YES        NO
    ↓          ↓
Access      Unauthorized
Granted
```

---

# 9. Common Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 409         | Conflict              |
| 500         | Internal Server Error |

---

# 10. Important Interview Questions

## Q1. Why use bcrypt instead of MD5?

bcrypt is more secure because it uses:

* automatic salting
* slow hashing
* brute-force protection

MD5 is fast and easier to crack.

---

## Q2. What does `10` mean in bcrypt?

It is the salt rounds / cost factor.

Higher values increase security but make hashing slower.

---

## Q3. Can bcrypt decrypt passwords?

No.

bcrypt is a hashing algorithm, not encryption.

Passwords are verified using:

```js
bcrypt.compare()
```

---

## Q4. Difference between Authentication and Authorization?

| Authentication    | Authorization      |
| ----------------- | ------------------ |
| Verifies identity | Checks permissions |
| Login process     | Access control     |

---

## Q5. Why use JWT?

JWT provides stateless authentication.

* No session storage
* Easy scalability
* Faster verification

---

# Final Summary

## Register

```text
Hash password
↓
Store user
↓
Generate JWT
↓
Send cookie
```

---

## Login

```text
Find user
↓
bcrypt.compare()
↓
Generate JWT
↓
Authenticate user
```

---

## Protected Route

```text
Read token
↓
Verify JWT
↓
Get user info
↓
Allow access
```
