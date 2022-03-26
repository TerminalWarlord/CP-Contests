// const rating = document.getElementById('ratings');
const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const loader = document.getElementById('loader');
const content = document.getElementById('add_problems');
const hiddenTable = document.getElementsByClassName('content');
// var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone


loader.classList.add("hide-item");

searchBtn.addEventListener('click', fetchQuery);


function fetchQuery(){
    loader.classList.remove("hide-item");
    let query = document.getElementById('query').value;
    if(query.length<3) query='terminalwarlord';
    let rating = parseInt(document.getElementById('rate').value);
    console.log(query);
    console.log(rating);
    var browserWidth = document.body.offsetWidth;
    var fontSize = `1rem`;
    if(browserWidth>700) fontSize = `1.7rem`
    var solved = `<i class="fa-solid fa-circle-check" style="color:green;font-size:${fontSize}"></i>`;
    var notSolved = `<i class="fa-solid fa-circle-xmark" style="color:red;font-size:${fontSize}"></i>`;
    
    fetch(`https://tw-cfladder.vercel.app/${rating}/${query}`)
    .then(response => response.json())
    .then(data=>{
        const keys = Object.keys(data);
        let table = document.querySelector('.content');
        table.classList.remove('content');
        searchBox.classList.remove('search-box');
        searchBox.classList.add('hide-item');
        table.classList.add('content-table');
        let html = '';
        if(data){
            for(let i=0; i<keys.length; i++){
                var isSolved = notSolved;
                if(data[keys[i]]['solved']) isSolved = solved;
                loader.classList.add('hide-item');
                html+=`
                    <tr>
                        <th>${i+1}</th>
                        <th><a target="blank" class="con-link" href="${data[keys[i]]['link']}">${data[keys[i]]['problem_id']}</a></th>
                        <th><a target="blank" class="con-link" href="${data[keys[i]]['link']}">${data[keys[i]]['problem_name']}</a></th>
                        <th class="tb">${isSolved}</th>
                    </tr>`;
            }
        }
        else{
            html+="Failed to fetch data!"
        }
            // console.log(html);
        loader.classList.add("hide-item");
        content.innerHTML = html;
    })
}

// fetch(`https://cp-contests.vercel.app/time/?timeZone=${timeZone}`)
// .then(response=>response.json())
// .then(data=>{
//     const dateTime = `${data}<br>Timezone : ${timeZone}`;
//     const timezone = document.getElementById('timezone').innerHTML = dateTime;
// })