chartIt(); // Using chart.js
chartOnline(); // Using quickchart.io

async function chartOnline() {
    const data = await getData(); // We can also do it like this here instead of chaining 'then'
    const url = 'https://quickchart.io/chart?width=800&height=400&c=';
    document.getElementById('image').src = url + JSON.stringify(await getChartData(data));
}

async function chartIt() {
    const data = await getData(); // We can also do it like this here instead of chaining 'then'
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, await getChartData(data));
}

function getChartData(data) {
    return {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [{
                label: 'Global Average Temperature',
                data: data.ys,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            callback: function (value, index, values) {
                                return value + '°'; // Option + Shift + 8
                            }
                        }
                    }
                ]
            }
        }
    }
}


// getData().then (response => {
//   chartIt();
// });


async function getData() {
    const xs = []; // Years
    const ys = []; // Global temp
    const nhems = []; // Northern hemisphere
    const shems = []; // Southern hemisphere
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await response.text();
    //console.log(data);
    const table = data.split('\n').slice(1);
    //console.log(table);
    table.forEach(row => {
        const cols = row.split(',');
        //console.log(cols);
        const year = cols[0];
        xs.push(year);
        const temp = cols[1];
        ys.push(parseFloat(temp) + 14); // Global mean is 14 degrees
        // console.log(year, temp);

        nhems.push(parseFloat(cols[2] + 14));
        shems.push(parseFloat(cols[3] + 14));
    });
    //console.log(nhems, shems);

    return { xs, ys, nhems, shems };
}

// console.log('Fetching image');
// normalFetch();
//getImage()
// .then(response => {
//   console.log('Yes!!!');
// })
// .catch(error => {
//   console.log('Error!!!');
//   console.error(error);
// });;

async function getImage() {
    const response = await fetch('demo.jpg');
    const blob = await response.blob();
    document.getElementById('image').src = URL.createObjectURL(blob);
}

function normalFetch() {
    fetch('demo.jpg')
        .then(response => {
            console.log(response);
            return response.blob();
        })
        .then(blob => {
            console.log(blob);
            const url = URL.createObjectURL(blob);
            console.log(url);
            document.getElementById('image').src = url;
        })
        .catch(error => {
            console.log('Error!!!');
            console.error(error);
        });
}