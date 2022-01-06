const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const contests = document.getElementById('recent-centests');
const loader = document.getElementById('loader');
loader.classList.add("hide-item");
// Sreya_Mazumder
searchBtn.addEventListener('click', fetchQuery);

function fetchQuery(){
    loader.classList.remove("hide-item");
    let table = document.querySelector('.content');
    table.classList.remove('content');
    searchBox.classList.remove('search-box');
    searchBox.classList.add('hide-item');
    table.classList.add('content-table');
    let query = document.getElementById('query').value;
    if(query=='') {
        query = 'TerminalWarlord';
    }
    let secret = 'bcdff73b13ec3c9eff879b0ebcdd0172b4c99a79';
    let key = '18daf62d77a918cfa4ff528490a8abb732e3ec57';
    fetch(`https://codeforces.com/api/user.rating?handle=${query}&secret=${secret}&key=${key}`)
    .then(response=>response.json())
    .then(data=>{
        let html = '';
        if(data){
            if(data['status'] === 'FAILED'){
                html = `<tr><th>Failed to fetch data for ${query}<th></tr>`;
            }
            // <th>${data['result'][i]['handle']}</th>

            else{
                for(let i=0; i<data['result'].length; i++){
                    loader.classList.add('hide-item');
                    html+=`
                        <tr>
                            <th>${i+1}</th>
                            <th>${data['result'][i]['contestId']}</th>
                            <th>${data['result'][i]['contestName']}</th>
                            <th>${data['result'][i]['newRating']}</th>
                            <th>${data['result'][i]['oldRating']}</th>
                            <th>${data['result'][i]['rank']}</th>
                        </tr>`;
                };    
            }
        }
        else{
            html = `<tr>Failed to fetch data for ${query}</tr>`;
        }
        contests.innerHTML = html;
    })
}


