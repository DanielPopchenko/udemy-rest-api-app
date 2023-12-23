// ! Now we outsorced the fetching logic
export const fetchAvailablePlaces = async () => {
  // ! do it if fetch is not failed
  const response = await fetch('http://localhost:3000/places');
  const responseData = await response.json();

  // ! Error handling
  if (!response.ok) {
    throw new Error('Failed to fetch places!');
  }

  return responseData.places;
};

export const fetchUserPlaces = async () => {
  // ! do it if fetch is not failed
  const response = await fetch('http://localhost:3000/user-places');
  const responseData = await response.json();

  // ! Error handling
  if (!response.ok) {
    throw new Error('Failed to fetch user places!');
  }

  return responseData.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    //   ! converting to a JSON format
    body: JSON.stringify({ places }),
    headers: { 'Content-Type': 'application/json' },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update new data!');
  }

  return responseData.message;
};
