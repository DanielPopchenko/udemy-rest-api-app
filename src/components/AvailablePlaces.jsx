import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace, isLoading, loadingText }) {
  const [availablePlaces, setAvailablePlaces] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();

        // Sorting out places by distance
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          );
          console.log('sortedPlaces: ', sortedPlaces);
          setAvailablePlaces(sortedPlaces);
          // ? We are done fetching places so the loading is also stopped
          setLoading(false);
        });
      } catch (error) {
        // ! do it if it is failed
        setError({ message: error.message || 'Couldn`t load places! Try again!' });
        // ? We had an error so we should stop loading

        setLoading(false);
      }

      // Now we cannot put it here, because js will not be waiting
      // for code in getCurrentPosition to be done
      // ! This code here will be executed earlier than callback in getCurrentPosition
      // setLoading(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title={'An error occured'} message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces === undefined ? [] : availablePlaces}
      fallbackText="No places available."
      loadingText="Fetching place data"
      isLoading={loading}
      onSelectPlace={onSelectPlace}
    />
  );
}
