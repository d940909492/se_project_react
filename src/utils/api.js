const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error when fetching and getting items api: ${res.status}`
        );
  });
}

export function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
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
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error when deleting items api: ${res.status}`);
  });
}
