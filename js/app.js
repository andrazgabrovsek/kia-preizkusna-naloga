window.onload = async function () {
  const cars = await getData();
  const carousel = createCarousel(cars);

  console.log(carousel);
};

async function getData() {
  console.log("Calling API");

  // call api
  const response = await axios({ method: "get", url: "https://www.kia.si/naloga_api" });

  return response.data;
}

function createHTMLElement(elementName, attributes = []) {
  // create new element
  const element = document.createElement(elementName);

  // go through all attributes and create attribute objects
  attributes.forEach(attr => {

    const key = Object.keys(attr)[0];
    const value = attr[key];

    // create new attribute
    const newAttr = document.createAttribute(key);

    // assign values
    newAttr.value = [].concat(value).join(' ');

    // assign attribute to element
    element.setAttributeNode(newAttr);
  })

  // return new HTML element
  return element;
}

function createCarousel(cars) {

  const carouselList = document.getElementById('carousel-indicators');
  const carouselDiv = document.getElementById('carousel-inner');

  Object.keys(cars).forEach((key, index) => {
    const carouselIndicator = createCarouselIndicator(index);
    const carouselItem = createCarouselItem(cars[key], index);

    carouselList.appendChild(carouselIndicator);
    carouselDiv.appendChild(carouselItem);
  })

}

function createCarouselIndicator(index) {
  const element = createHTMLElement('li', [{ 'data-target': '#carousel' }, { 'data-slide-to': index }]);

  // add active class to first item
  if (index === 0) {
    element.classList.add('active');
  }

  return element;
}

function createCarouselItem(car, index) {

  const carouselItem = createHTMLElement('div', [{ class: 'carousel-item' }]);
  const img = createHTMLElement('img', [{ src: car.picture }, { class: ['d-block', 'w-55', 'mx-auto'] }, { alt: car.name }]);
  const caption = createHTMLElement('div', [{ class: ['carousel-caption', 'd-none', 'd-md-block'] }]);
  const h5 = createHTMLElement('h5');
  const p = createHTMLElement('p');

  h5.innerText = car.name;
  const { prefix, price, suffix } = car.price_wrapper;
  p.innerText = `${car.name} ${prefix} ${price} ${suffix}`;

  // add active class to first item
  if (index === 0) {
    carouselItem.classList.add('active');
  }

  caption.appendChild(h5);
  caption.appendChild(p);

  carouselItem.appendChild(img);
  carouselItem.appendChild(caption);

  return carouselItem;
}

{/* <div class="carousel-item">
              <img src="..." class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div> */}

//     // prepare data
//     const cars = response.data;

//     // get unordered list HTML element (id = test)
//     const ourListOfCars = document.getElementById('test')

//     // for each car in the list we got
//     Object.keys(cars).forEach(carId => {
//         // extract car name
//         const carName = cars[carId].name;

//         // create new list item
//         const listItem = document.createElement('li');

//         // set text of list item to the list item
//         listItem.innerText = carName;

//         // add list item to the unordered list (id = test in html)
//         ourListOfCars.appendChild(listItem);
//     });
// }