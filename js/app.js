
const myButton = document.getElementById('knof');
myButton.addEventListener('click', async () => getData());

async function getData() {
    console.log("Calling API");

    // call api
    const response = await axios({ method: "get", url: "https://www.kia.si/naloga_api" });

    // prepare data
    const cars = response.data;

    // get unordered list HTML element (id = test)
    const ourListOfCars = document.getElementById('test')

    // for each car in the list we got
    Object.keys(cars).forEach(carId => {
        // extract car name
        const carName = cars[carId].name;

        // create new list item
        const listItem = document.createElement('li');

        // set text of list item to the list item
        listItem.innerText = carName;

        // add list item to the unordered list (id = test in html)
        ourListOfCars.appendChild(listItem);
    });
}