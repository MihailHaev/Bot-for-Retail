const log = console.log;
// let timer = new Date();
// timer = (new Date()) - timer;
getItem();


function getItem() {
  log('Dom go');
  const srcForProduct = /(http|https):\/\/retailsat.com\/collections\/[\w\-\.\=\_]+\/[\w\-\.\=\_]+/i,
    srcCheckout = /(http|https):\/\/retailsat.com\/[\w\-\.\=\_]+\/checkouts\/[\w\-\.\=\_]+/i,
    srcCart = 'https://retailsat.com/cart',
    // Регэксп для дробного размера x[\w\-\.\/\,\ ]+y
    // Регэксп для недробного размера x
    sizeNeed = /1[\-\.\/\,\ ]+5/i;
    
    if ((location.href).match(srcForProduct)) {
      const size = document.getElementById('SingleOptionSelector-0'),
        btnAddToCard = document.getElementById('AddToCart-product-template'),
        cartIndicator = document.getElementsByClassName('site-header__cart-indicator')[0],
        itemInCard = new MutationObserver((mutations) => {
          location.href = srcCart;
        });
      
      itemInCard.observe(cartIndicator, {
        attributes: true
      });
      btnAddToCard.disabled = false;

      if(!size) {
        log('Размеров не было, поэтому добавили в корзину, то что есть');
        btnAddToCard.click();
      }
      else if (fill(size, sizeNeed)) {
        log('Добавляем в корзину');
        btnAddToCard.click();
      }
  }

  if (location.href == srcCart) {
    const btnCheckout = document.querySelector('button[name="checkout"]');
    btnCheckout.click();
  }

  if((location.href).match(srcCheckout)) {
    let btn = document.getElementsByClassName('btn__content')[0];
    const cardBody = document.getElementsByTagName('body')[0], 
      itemInCard = new MutationObserver((mutations) => {
        log('Нажимаем на кнопку чекаута');
        document.getElementsByClassName('btn__content')[1].click();
      });
    if (btn.innerHTML.trim() == 'Continue to shipping method') {
      log(btn.innerHTML.trim());
      btn.click();
    }
    if (btn.innerHTML.trim() == 'Continue to payment method') {
      log(btn.innerHTML.trim());
      btn.click();
    } else if(!(btn.innerHTML.trim() == 'Continue to shipping method')) {
      itemInCard.observe(cardBody, {
        childList: true,
        subtree: true
      }); 
    }
  }
}

function fill(el, value) {
    const evt = document.createEvent("HTMLEvents");	
    evt.initEvent("change", false, true);
    if (el.options.length == 1) {
      el.value = el.options[0].value;
      el.dispatchEvent(evt);
      log('Сайз один, поэтому его и берём');
      return checkForSoldOut();
    }
    for (let i = 0; i < el.options.length; i++) {
      if (el.options[i].value.match(value)) {
        el.value = el.options[i].value;
        el.dispatchEvent(evt);
        if(checkForSoldOut()) {
          log('Нужный сайз найден и доступен');
          return true;
        } else {
          log('Сайз найден, но он недоступен');
          return takeWhatAvailable(el, evt);
        }
      }
      if (i == (el.options.length - 1)) {
        log('Сайз не найден, пытаемся взять, то что есть');
        return takeWhatAvailable(el, evt);
      }
    }
}

// Если вещь СОЛД возвращает - FALSE
function checkForSoldOut() {
  const text = document.getElementById('AddToCartText-product-template').innerHTML.toLowerCase().replace(/\s/g, '');
  return !(text == 'soldout' || text == 'unavailable');
}

function takeWhatAvailable(elem, event) {
  for(let i = 0; i < elem.options.length; i++) {
    elem.value = elem.options[i].value;
    elem.dispatchEvent(event);
    if (checkForSoldOut()) {
      log('Взяли первый доступный');
      return true;
    } 
  }
  log('Нету доступных');
  return false;
}