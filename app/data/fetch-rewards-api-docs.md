# Fetch Rewards Frontend Exercise — API Reference

**Base URL:** `https://frontend-take-home-service.fetch.com`

All requests must include credentials. Use `credentials: 'include'` with the Fetch API or `withCredentials: true` with axios.

---

## Authentication

### POST /auth/login

Log in and receive an auth cookie.

**Request body:**

| Field | Type | Required |
|-------|------|----------|
| `name` | string | yes |
| `email` | string | yes |

**Response:**

Returns `200 OK`. Sets an HttpOnly cookie `fetch-access-token` (expires in 1 hour) via the `set-cookie` response header. The browser sends this cookie automatically on all subsequent credentialed requests.

---

### POST /auth/logout

End a user's session and invalidate the auth cookie.

**Request:** No body required.

**Response:** Returns `200 OK`.

---

## Dogs

### GET /dogs/breeds

Returns an array of all possible breed names.

**Response:**

```ts
string[]
```

---

### GET /dogs/search

Search and filter dogs with pagination. All query parameters are optional. If none are provided, all dogs are matched.

**Query parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `breeds` | `string[]` | Filter by breed name(s) |
| `zipCodes` | `string[]` | Filter by zip code(s) |
| `ageMin` | `number` | Minimum age |
| `ageMax` | `number` | Maximum age |
| `size` | `number` | Number of results to return; defaults to `25` |
| `from` | `string` | Pagination cursor from a previous response |
| `sort` | `string` | Format: `field:[asc\|desc]`. Sortable fields: `breed`, `name`, `age`. Default: `breed:asc` |

**Response:**

```ts
{
  resultIds: string[]  // dog IDs matching the query
  total:     number    // total matching dogs (max 10,000)
  next?:     string    // query string for the next page
  prev?:     string    // query string for the previous page
}
```

---

### POST /dogs

Fetch full dog objects by their IDs.

**Request body:**

An array of up to 100 dog ID strings (obtained from `/dogs/search`).

```ts
string[]
```

**Response:**

```ts
interface Dog {
  id:       string
  img:      string  // image URL
  name:     string
  age:      number
  zip_code: string
  breed:    string
}
```

Returns `Dog[]`.

---

### POST /dogs/match

Generate an adoption match from a list of favorited dog IDs. The API selects a single dog as the user's match.

**Request body:**

```ts
string[]  // array of favorited dog IDs
```

**Response:**

```ts
{ match: string }  // the matched dog's ID
```

---

## Locations

### POST /locations

Fetch location objects by zip code.

**Request body:**

An array of up to 100 zip code strings.

```ts
string[]
```

**Response:**

```ts
interface Location {
  zip_code:  string
  latitude:  number
  longitude: number
  city:      string
  state:     string
  county:    string
}
```

Returns `Location[]`.

---

### POST /locations/search

Search for locations by city, state, or geographic bounding box. All body parameters are optional. If none are provided, all locations are matched.

**Request body:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `city` | `string` | Filter by city name |
| `states` | `string[]` | Filter by state abbreviation(s) |
| `geoBoundingBox` | `object` | Geographic bounding box (see below) |
| `size` | `number` | Number of results to return; defaults to `25` |
| `from` | `string` | Pagination cursor |

**Bounding box structure:**

```ts
geoBoundingBox: {
  top:    number  // highest latitude
  left:   number  // left-most longitude
  bottom: number  // lowest latitude
  right:  number  // right-most longitude
}
```

**Response:**

```ts
{
  results: Location[]
  total:   number      // max 10,000
}
```

> The maximum number of zip codes matched by a single query is 10,000.

---

## Typical request flow

1. **Login** — `POST /auth/login` with `name` and `email` to set the auth cookie.
2. **Get breeds** — `GET /dogs/breeds` to populate filter options.
3. **Search dogs** — `GET /dogs/search` with desired filters and pagination params to get a list of dog IDs.
4. **Fetch dog details** — `POST /dogs` with the IDs from step 3 to get full `Dog` objects.
5. **Match** — `POST /dogs/match` with favorited dog IDs to receive a single matched dog ID.
6. **Resolve location (optional)** — `POST /locations` with zip codes to get city/state/county info, or `POST /locations/search` to filter by region.
7. **Logout** — `POST /auth/logout` to invalidate the session.
