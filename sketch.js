const wordnikAPI = "https://api.wordnik.com/v4/words.json/randomWord?&api_key=48dd829661f515d5abc0d03197a00582e888cc7da2484d5c7";
const giphyAPI = "https://api.giphy.com/v1/gifs/search?rating=G&api_key=dc6zaTOxFJmzC&q=";

function setup() {
    noCanvas();

    // let promises = [wordGIFAsync(), wordGIFAsync(), wordGIFAsync(), wordGIFAsync()];
    let promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(wordGIFAsync());        
    }

    Promise.all(promises) // If any promise gives an error, NO results are processed at all
    .then((results) => {
        results.forEach(result => {
            createP(result.word);
        });
    })
    .catch(err => console.error(err));

    return;

    wordGIFAsync()
        .then(results => {
            document.getElementById('text').innerText = results.word;
            if (results.img !== null) {
                document.getElementById('image').src = results.img;
            }
            return wordGIFAsync();
        })
        .then(results => {
            document.getElementById('text').innerText = results.word;
            if (results.img !== null) {
                document.getElementById('image').src = results.img;
            }
        })
        .catch(err => console.error(err));


    return;

    delay(1000)
        .then(() => createP('This works'))
        .catch(error => console.error(error));

    delay('this breaks')
        .then(() => createP('HI THERE'))
        .catch(error => console.error(error));

    delayES8(1000)
        .then(() => createP('HI ES8'))
        .catch(error => console.error(error));

}

async function wordGIFAsync() {
    const response1 = await(fetch(wordnikAPI));
    const json = await response1.json();
    const word = json.word;
    const response2 = await fetch('biplanes.jpg');
    const blob = await response2.blob();
    let img = null;
    
    try {
        img = URL.createObjectURL(blob);
        // reject();
    } catch (err) {
        console.log('No image found for ' + word);
        console.error(err);
    }
    return { word, img }
}

function wordGIF() {
    fetch(wordnikAPI)
        .then(response => response.json())
        .then(json => {
            // createP(json.word);
            document.getElementById('text').innerText = json.word;
            // return fetch(giphyAPI + json.word);
            return fetch('biplanes.jpg');
        })
        .then(response => response.blob())
        .then(blob => {
            //createImg(json.data[0].images['fixed_height_small'].url);
            document.getElementById('image').src = URL.createObjectURL(blob);
        })
        .catch(err => console.error(err));
}

function delay(time) {
    return new Promise((resolve, reject) => {
        if (isNaN(time)) {
            reject(new Error('delay requires a valid number'));
        } else {
            setTimeout(resolve, time);
        }
    });
}

// If a function returns a promise we can use async/await
async function delayES8(time) {
    // delay returns a promise
    await delay(time);
    // return;
}