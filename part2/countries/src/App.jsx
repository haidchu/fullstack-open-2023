import { useEffect, useState } from "react";
import axios from "axios";

const api = "https://studies.cs.helsinki.fi/restcountries/api";

const Country = ({ country }) => {
    console.log(country);
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            {Object.keys(country.languages).map((key) => {
                return <li key={key}>{country.languages[key]}</li>;
            })}
            <img
                src={country.flags.png}
                alt={country.name.common}
                width="200"
            />
        </div>
    );
};

function App() {
    const [query, setQuery] = useState("");
    const [allCountries, setAllCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const fetchCountries = (url) => {
        axios.get(url).then((response) => {
            // console.log(response.data);
            setAllCountries(response.data);
        });
    };

    const handleFilteredCountries = () => {
        const filtered = allCountries.filter((country) => {
            return country.name.common
                .toLowerCase()
                .includes(query.toLowerCase());
        });
        setFilteredCountries(filtered);
    };

    // Custom hook
    useEffect(() => {
        fetchCountries(`${api}/all`);
    }, []);

    return (
        <div>
            <p>
                find countries{" "}
                <input
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        handleFilteredCountries();
                    }}
                />
            </p>
            <div>
                {filteredCountries.length > 10 ? (
                    "Too many matches, specify another filter"
                ) : filteredCountries.length > 1 ? (
                    filteredCountries.map((country) => {
                        return (
                            <p key={country.name.common}>
                                {country.name.common}
                            </p>
                        );
                    })
                ) : filteredCountries.length > 0 ? (
                    <Country country={filteredCountries[0]} />
                ) : (
                    <p>No matches</p>
                )}
            </div>
        </div>
    );
}

export default App;
