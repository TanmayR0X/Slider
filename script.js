let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnail = document.querySelectorAll('.thumbnail .item');

let countItem = items.length;
let itemActive = 0;

// auto run slider 
let refrestInterval = setInterval(() => {
  next.click();
}, 5000);

// event next click
next.addEventListener('click', ()=> {
    itemActive = itemActive+1;

  if(itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
})

//event prev click
prev.addEventListener('click', ()=> {
  itemActive = itemActive-1;
  if(itemActive < 0) {
    itemActive = countItem-1;
  }
  showSlider()

})

function showSlider() {
  // remove active class from old item
  let itemActiveOld = document.querySelector('.slider .list .item.active');
  let thumbnailActive = document.querySelector('.thumbnail .item.active');
  itemActiveOld.classList.remove('active');
  thumbnailActive.classList.remove('active');

  // active new item
  items[itemActive].classList.add('active');
  thumbnail[itemActive].classList.add('active');

  // clear auto run slider
  clearInterval(refrestInterval);
  refrestInterval = setInterval(() => {
  next.click();
}, 5000);
}

// click thumbnail event 
thumbnail.forEach((thumbnail,index)=> {
  thumbnail.addEventListener('click', ()=> {
    itemActive = index;
    showSlider();
  })
})