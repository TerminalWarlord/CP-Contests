const searchBtn = document.getElementById('search-btn');
const searchBox = document.querySelector('.search-box');
const contests = document.getElementById('recent-centests');
const loader = document.getElementById('loader');
const statsCard = document.getElementById('Cards');
statsCard.classList.add("hide-item");
var timeZone = ''
var timeZonePoint = ''
fetch(`https://api.ipregistry.co/?key=xu1vqqbg0xmho0nq`)
    .then(response => response.json())
    .then(data=>{
        timeZonePoint = data.time_zone.current_time;
        timeZonePoint = timeZonePoint.substr(timeZonePoint.length-6, timeZonePoint.length);
        timeZone = data.time_zone.id;
    })
if(timeZone=='') timeZone='Asia/Dhaka', timeZonePoint="+06:00";

loader.classList.add("hide-item");

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
    fetch(`https://codeforces.com/api/user.rating?handle=${query}`)
    .then(response=>response.json())
    .then(data=>{
        fetchMore(query);
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

function fetchMore(username){
    fetch(`https://codeforces.com/api/user.status?handle=${username}`)
    .then(response=>response.json())
    .then(data=>{
        statsCard.classList.remove("hide-item");
        // document.getElementById('footer').classList.add("hide-item");
        let index = data['result'].map(item => item['problem']['index']);
        let rating = data['result'].map(item => item['problem']['rating']);
        let tags = data['result'].map(item => item['problem']['tags'][0]);
        let programmingLanguage = data['result'].map(item => item['programmingLanguage']);

        // VERDICT
        let verdict = data['result'].map(item => item['verdict']);
        var AC = verdict.filter(x=>x === 'OK').length;
        var TIME_LIMIT_EXCEEDED = verdict.filter(x=>x === 'TIME_LIMIT_EXCEEDED').length;
        var RUNTIME_ERROR = verdict.filter(x=>x === 'RUNTIME_ERROR').length;
        var WA = verdict.filter(x=>x === 'WRONG_ANSWER').length;
        var COMPILATION_ERROR = verdict.filter(x=>x === 'COMPILATION_ERROR').length;
        // var verdictPie = {}
        // let contestName = data['result'].map(item => item['contestId']);
        var piedata= [AC, WA,RUNTIME_ERROR,COMPILATION_ERROR, TIME_LIMIT_EXCEEDED];
        // piedata.sort(function(a,b){return a-b});
        console.log(piedata);
        const backgroundColor= [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 218, 2)',
            'rgb(123, 205, 4)',
            'rgb(255, 124, 45)',
            'rgb(211, 189, 86)',
            'rgb(177, 245, 128)',
            'rgb(255, 205, 86)',
            'rgb(126, 205, 65)',
            'rgb(255, 25, 125)',
            'rgb(126, 225, 125)',
            'rgb(25, 251, 15)',
            'rgb(205, 50, 135)',
            'rgb(215, 75, 145)',
            'rgb(225, 95, 155)',
            'rgb(235, 105, 165)',
            'rgb(245, 115, 175)',
            'rgb(255, 125, 185)',
            'rgb(255, 135, 195)',
        ];
        // ['AC', 'WA', 'RUNTIME_ERROR', 'CA', 'TLE']


        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['AC', 'WA', 'RUNTIME_ERROR', 'CA', 'TLE'],
                datasets: [{
                label: 'Verdicts',
                data: piedata,
                backgroundColor: ['lightgreen','red','yellow','brown','rgb(255, 205, 86)'],
                hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Verdicts',
                        fontSize: 25
                    },
                    legend: {
                        position: 'right',
                        display: true,
                        labels: {
                            color: 'rgb(255, 99, 132)'
                        }
                    }
                },
                responsive: true
            }
        });
        // TAGS

        var tagTitle = tags.filter((v, i, a)=>a.indexOf(v)===i);
        var solvedByTag = {};
        for(let i=0; i<tagTitle.length; i++){
            solvedByTag[tagTitle[i]] = tags.filter(x=>x === tagTitle[i]).length;
        }
        // console.log(solvedByTag);
        var tagValue = Object.values(solvedByTag);
        var tagName = Reflect.ownKeys(solvedByTag);
        var tagObj = tagName.map((tname, i)=>{
        return { "tname": tagName[i],
        "tvalue": tagValue[i]}
        });
        tagObj = tagObj.sort(function (a,b){
            return a.tvalue - b.tvalue;
        });
        var tvalue = [];
        var tname = [];
        for(i=tagObj.length-1; i>0; i--){
            tvalue.push(tagObj[i].tvalue);
            tname.push(tagObj[i].tname);
        }
        const taaag = document.getElementById('solvedByTag');
        const tagChart = new Chart(taaag, {
            type: 'doughnut',
            data: {
                labels: tname,
                datasets: [{
                label: 'Problems with Tags',
                data: tvalue,
                backgroundColor: backgroundColor,
                hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Problems with Tags',
                        padding: {
                            bottom: 5,
                            top: 2
                        }
                    },
                    legend: {
                        position: 'right',
                        display: true,
                        
                    }
                },
                responsive: true
            }
        });




    // prblem rating
        // VERDICT PIECHART
        var lmao = {};
        let count=800;
        for(let i=0; i<28; i++){
            if(rating.filter(x => x ===count).length!=0){
                lmao[count] = rating.filter(x => x ===count).length;
                
            }
            count+=100;
        }
        var val = Object.values(lmao);
        var allkeys = Reflect.ownKeys(lmao);
        // console.log(Reflect.ownKeys(lmao));
        const prRat = document.getElementById('problemratings').getContext('2d');
        const problemratings = new Chart(prRat, {
            type: 'bar',
            data: {
                labels: allkeys,
                datasets: [{
                label: 'Rating',
                data: val,
                backgroundColor: backgroundColor,
                hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Problems by Rating',
                        padding: {
                            bottom: 2,
                            top: 2
                        }
                    },
                    legend: {
                        position: 'right',
                        display: true,
                        
                    }
                },
                responsive: true
            }
        });


        // RECENT CON
        fetch(`https://codeforces.com/api/user.rating?handle=${username}`)
        .then(response=>response.json())
        .then(data=>{
            let ratingsNew = data['result'].map(item => item['newRating']);
            let contestName = data['result'].map(item => item['contestId']);
            const ratChange = document.getElementById('recentCon');
            const ratChanged = new Chart(ratChange, {
                type: 'line',
                data: {
                    labels: contestName,
                    datasets: [{
                        label: 'Rating',
                        data: ratingsNew,
                        borderWidth: 1,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000'
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Rating Changes',
                            padding: {
                                bottom: 5,
                                top: 2
                            }
                        },
                        legend: {
                            position: 'top',
                            display: true,
                        }
                    },
                    responsive: true
                }
            });
        })
        // console.log(data);
    })
}
fetch(`https://cp-contests.vercel.app/time/?timeZone=${timeZone}`)
.then(response=>response.json())
.then(data=>{
    const dateTime = `${data}<br>Timezone : ${timeZonePoint}`;
    const timezone = document.getElementById('timezone').innerHTML = dateTime;
})

// fetch('https://codeforces.com/api/user.rating?handle=TerminalWarlord')
// .then(response=>response.json())
// .then(data=>{
//     let ratings = data['result'].map(item => item['oldRating']);
//     let contestName = data['result'].map(item => item['contestId']);
//     const ctx = document.getElementById('myChart');
//     const myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: contestName,
//             datasets: [{
//                 label: 'Rating',
//                 data: ratings,
//                 borderWidth: 1,
//                 backgroundColor: 'rgb(255, 99, 132)',
//                 borderColor: 'rgb(255, 99, 132)',
//                 hoverBorderWidth: 3,
//                 hoverBorderColor: '#000'
//             }]
//         },
//         options: {
//             title:{
//                 display:true,
//                 text: 'Rating Changes',
//                 fontSize: 25
//             },
//             legend:{
//                 position: 'left'
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
//     // console.log(data);
// })
