function fetch_info(url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
        req.onerror = (e) => reject(Error(`Network Error: ${e}`));
        req.send();
      });
  }
  
  document.getElementById("button").addEventListener("click", function () {
    let input = document.getElementById("keyword");
    let keyword = input.value;
    let URL = `/api=${keyword}`;
    fetch_info(URL);
  });