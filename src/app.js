import './scss/style.scss'


document.addEventListener("DOMContentLoaded", () => {

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "9a234295f4msh7754bbf6c7eedd0p1a39d2jsnb6097b10e994"
            }
        })
        .then(response => response.json()
            .then(data => {
                console.log(data);
            }))
        .catch(err => {
            console.log(err);
        });

    //Decalring the Different Variable and Objects
    let new_cases = document.getElementById("new_case");
    let new_death = document.getElementById("new_death");
    let total_death = document.getElementById("total_death");
    let total_recovered = document.getElementById("total_recovered");
    let total_cases = document.getElementById("total_cases");
    let table = document.getElementById('countries_stat')
    // Fetching the Data from the server

    //Fetching the World Data
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "9a234295f4msh7754bbf6c7eedd0p1a39d2jsnb6097b10e994"
            }
        })
        .then(response => response.json()
            .then(data => {
                console.log(data);
                total_cases.innerHTML = data.total_cases;
                new_cases.innerHTML = data.new_cases;
                new_death.innerHTML = data.new_deaths;
                total_death.innerHTML = data.total_deaths;
                total_recovered.innerHTML = data.total_recovered;

            })).catch(err => {
            console.log(err);
        });

    //Fetching The Case by Country Data
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "9a234295f4msh7754bbf6c7eedd0p1a39d2jsnb6097b10e994"
            }
        })
        .then(response => response.json()
            .then(data => {
                console.log(data)
                let countries_stat = data.countries_stat;
                //Getting all the country statistic using a loop
                for (let i = 0; i < countries_stat.length; i++) {
                    console.log(countries_stat[i]);
                    //we will start by inserting the new rows inside our table
                    let row = table.insertRow(i + 1);
                    let country_name = row.insertCell(0);
                    let total_cases = row.insertCell(1);
                    let new_cases = row.insertCell(2);
                    let deaths = row.insertCell(3);
                    let new_deaths = row.insertCell(4);
                    let recovered_per_country = row.insertCell(5);
                    let active_cases = row.insertCell(6) //
                    let serious_critical = row.insertCell(7);

                    country_name.innerHTML = countries_stat[i].country_name;
                    total_cases.innerHTML = countries_stat[i].cases;
                    new_cases.innerHTML = countries_stat[i].new_cases;
                    deaths.innerHTML = countries_stat[i].deaths;
                    new_deaths.innerHTML = countries_stat[i].new_deaths;
                    recovered_per_country.innerHTML = countries_stat[i].total_recovered;
                    active_cases.innerHTML = countries_stat[i].active_cases;
                    serious_critical.innerHTML = countries_stat[i].serious_critical;

                }
            }))
        .catch(err => {
            console.log(err);
        });
})