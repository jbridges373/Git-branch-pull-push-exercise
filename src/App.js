import { useEffect, useState } from "react";
import './App.css';


const ZooAnimals = () => {
  
	const [zooAnimal, setZooAnimal] = useState([]);
	const [error, setError] = useState(null);

	// useEffect only runs once when component is first rendered
	useEffect(() => {
		// asynchronous function so we can wait for data to be fetched
		const fetchData = async () => {
			// try code in the 'try' block and if error occurs/is thrown then run catch block
			try {
				// wait for fetch request from API endpoint and store response in the useState variable
				const response = await fetch(
					'https://zoo-animal-api.herokuapp.com/animals/rand/10',
				);

				// check to see if the response was successful otherwise throw error
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				// parse JSON response into normal javascript
				const data = await response.json();

				// see returned data in console and set that data as new state value
				console.log(data);
				setZooAnimal(data);
				// catch an error that occurs in the try block
			} catch (error) {
				// console log the error
				console.log(error);
				setError('Could not fetch the data');
			}
		};
		// call the fetchData function which gets data from API
		fetchData();
		// empty array makes sure useEffect only runs when component mounts and not when component updates
	}, []);

	return (
		<div className="zoo-animals">
			{error && <p>{error}</p>}
			<h1>Random Zoo Animal</h1>
			{zooAnimal.map((animal) => (
				// map through API data stored in the state and display it to the user
				<div className="items-container" key={animal.id}>
					<h3>Name: {animal.name}</h3>
					<img src={animal.image_link} alt="animal" />
				</div>
			))}
		</div>
	);
};

export default ZooAnimals;