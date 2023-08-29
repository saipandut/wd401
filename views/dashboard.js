document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const countryInput = document.getElementById('country-input');
    const countryInfoElement = document.getElementById('country-info');
 
    searchButton.addEventListener('click', () => {
        const countryName = countryInput.value;
        console.log(countryName);
      
        // Fetch country data
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the data received from the API

                if (data.length === 0) {
                    countryInfoElement.innerHTML = `<p>No information found for "${countryName}".</p>`;
                    return;
                }

                const countryData = data[0];
                const capital = countryData.capital[0]; // Get the first capital if there are multiple
                const borders = countryData.borders.join(', '); // Convert the array of borders to a string

                countryInfoElement.innerHTML = `
                    <h2 style="color: red; ">${countryData.name.common}</h2>
                    <p >Population: ${countryData.population}</p>
                    <p>Languages: ${Object.values(countryData.languages).join(', ')}</p>
                    <p>Currency: ${Object.keys(countryData.currencies).join(', ')}</p>
                    <p>Region: ${countryData.region}</p> <!-- Display the region -->
                    <p>Capital: ${capital}</p> <!-- Display capital city -->
                    <p>Borders: ${borders}</p> <!-- Display bordering countries -->


                    <!-- Add more details as needed -->
                `;
            })
            .catch(error => {
                
                console.error('Error fetching country data:', error);
                countryInfoElement.innerHTML = `<p>An error occurred while fetching data.</p>`;
            });
    });
});
