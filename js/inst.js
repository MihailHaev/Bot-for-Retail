if (location.href.match(/https:\/\/www.instagram.com\/[\w\-\.\/]+/i)) {   
  onload = getStories;
  let counter = 0;
  const observer = new MutationObserver((mutations) => {
    counter++; 
    if (counter == 3) {
      const instCanvas = document.getElementsByClassName('CfWVH')[0];
      log(instCanvas.style.width + ' это произшло на: ' + counter);
      if (instCanvas.style.width == '170px') {
        instCanvas.click();
        log('Прошло');
        const e = $.Event("keypress", { keyCode: 32});
        setTimeout(() => {
              log('Нажимаем на кнопочку 1');
              $("body").trigger(e);
            }, 700);
        setTimeout(() => {
          document.getElementsByClassName('GHEPc')[0].click();
          log('Нажимаем на кнопочку 2');
        }, 10000);
      }
      // const instCanvas = document.getElementsByClassName('CfWVH')[0];
      // const instImg = document.getElementsByClassName('_6q-tv')[0]; 
      // const observeStyle = new MutationObserver((mutations) => {
      //   log('Через 2 секунды запуститься релоуд');
      //   setTimeout(() => {
      //     location.reload();
      //   }, 2000);
      // });
      // observeStyle.observe(instCanvas, {
      //   attributeOldValue: true
      // });
      // if (instCanvas.style.width == '170px') {
      //   const e = $.Event("keypress", { keyCode: 32});
      //   instImg.click();
        
      //   setTimeout(() => {
      //     log('Нажимаем на кнопочку');
      //     $("body").trigger(e);
      //   }, 700);
      //   setTimeout(() => {
      //     $("body").trigger(e);
      //   }, 3000)
      // }
      
  }
  });
  
  const root = document.getElementById('react-root');
  observer.observe(root, {
    childList: true,
    subtree: true
  });
  function getStories() {
      // 87px - нету сториз 91px - есть сториз
      const instCanvas = document.getElementsByClassName('CfWVH')[0];
      // Потом можно сравнить с со спаном всегда 77px, чтоб можно было отслеживать сториз при любов разрешении
      // Так как при увелечении экрана санвас становиться 168px
      const instSpan = document.getElementsByClassName('_2dbep')[0];
      const instImg = document.getElementsByClassName('_6q-tv')[0]; 
      if(instCanvas.style.width == '91px') {
      } else {
        // setTimeout(() => {
        //   location.reload();
        // }, 1500);
      }
  }
}

