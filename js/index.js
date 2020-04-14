API_KEY = 'AIzaSyDu9cBk7_Mgbt5_nwD3yli1_iCbon61cHE'
NEXT_TOKEN = ""
PREV_TOKEN = undefined

function results(data){
    let results = document.querySelector( '.results' );
    console.log("dentro")
    results.innerHTML = ''
    data.items.forEach(item => {
        results.innerHTML += `
            <div>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                  <h3>
                      ${item.snippet.title}
                  </h3>
                </a>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
                  <div>
                      <img src="${item.snippet.thumbnails.medium.url}" />
                  </div>
                </a>
            </div>
        `
    });
}

function searchVideos(e, token) {
    e.preventDefault();
    let searchTerm = document.querySelector('#search').value;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchTerm}&maxResults=10&pageToken=${token || ""}`
    console.log( url );
    fetch( url )
        .then( response => response.json())
        .then( data => {
            NEXT_TOKEN = data.nextPageToken;
            PREV_TOKEN = data.prevPageToken;
            if(NEXT_TOKEN != undefined || NEXT_TOKEN != "")
                document.querySelector('.next').style.display = "flex";
            else
                document.querySelector('.next').style.display = "none";
            if(PREV_TOKEN != undefined)
                document.querySelector('.prev').style.display = "flex";
            else
                document.querySelector('.prev').style.display = "none";
            results(data)
        })
        .catch( error => {
            console.log( error );
        });
}

function nextVideos(e){
    e.preventDefault();
    searchVideos(e, NEXT_TOKEN);
}

function prevVideos(e){
    e.preventDefault();
    searchVideos(e, PREV_TOKEN);
}

function init() {
    document.querySelector(".submit-btn").addEventListener("click", searchVideos);
    document.querySelector(".submit-btn").addEventListener("submit", searchVideos);
    document.querySelector('.next').addEventListener("click", nextVideos);
    document.querySelector('.prev').addEventListener("click", prevVideos);
}


window.onload = init;
