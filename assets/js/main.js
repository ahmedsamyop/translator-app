const
inputText = document.querySelector('.input-text'),
outputText = document.querySelector('.output-text'), 
selectBox = document.querySelectorAll('select'),
speekBtne = document.querySelectorAll('.sound'),
copyBtn = document.querySelectorAll('.copy'),
exchangeBtn = document.querySelector('.exchange'),
translateBtn = document.getElementById('btn');




selectBox.forEach((ele,index) => {
  for (const key in countries) {
    let selected = index == 0 ? key == "en-GB" ? "selected" : "" : key == "ar-SA" ? "selected" : "";
    let option = `<option ${selected} value="${key}">${countries[key]}</option>`;
    ele.insertAdjacentHTML('beforeend', option);
  }
});

translateBtn.addEventListener('click', () => {
  let apiUrl = `https://api.mymemory.translated.net/get?q=${inputText.value}&langpair=${selectBox[0].value}|${selectBox[1].value}`;
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    outputText.value = data.responseData.translatedText;
  })
  .catch((err) => console.log(err))

})

copyBtn.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    if (ele.dataset.icon === "input") {
      navigator.clipboard.writeText(inputText.value)
    }
    else {
      navigator.clipboard.writeText(outputText.value)
    }
  })
})



speekBtne.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    
    let speek;
    if (ele.dataset.icon === "input") {
      speek = new SpeechSynthesisUtterance(inputText.value);
      speek.lang = selectBox[0].value;
    }
    else {
      speek = new SpeechSynthesisUtterance(outputText.value);
      speek.lang = selectBox[1].value;
    }

    speechSynthesis.speak(speek);
  
  })
})


exchangeBtn.addEventListener('click', () => {
  [inputText.value, outputText.value] = [ outputText.value, inputText.value];
  [selectBox[0].value, selectBox[1].value] = [selectBox[1].value, selectBox[0].value]
})
