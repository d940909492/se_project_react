const baseUrl = "http://localhost:3001";

function checkResponse(res, message) {
  return res.ok ? res.json() : Promise.reject(`${message}: ${res.status}`);
}

export function getItems() {
  return fetch(`${baseUrl}/items`, {
    credentials: "include",
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error when fetching and getting items api: ${res.status}`,
        );
  });
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error when adding items api: ${res.status}`);
  });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error when deleting items api: ${res.status}`);
  });
}

export function updateUser({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => checkResponse(res, "Error when updating user"));
}

export function addCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

export function removeCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
