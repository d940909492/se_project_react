const baseUrl = "http://localhost:3001";

function checkResponse(res, message) {
  return res.ok ? res.json() : Promise.reject(`${message}: ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error when fetching and getting items api: ${res.status}`,
        );
  });
}

export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error when adding items api: ${res.status}`);
  });
}

export function deleteItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error when deleting items api: ${res.status}`);
  });
}

export function updateUser({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => checkResponse(res, "Error when updating user"));
}

export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
