const contests = document.getElementById('fetch-con');
const loader = document.getElementById('loader');
var timeZone = ''
var timeZonePoint = ''
fetch(`https://api.ipregistry.co/?key=xu1vqqbg0xmho0nq`)
    .then(response => response.json())
    .then(data=>{
        console.log(data);
        timeZonePoint = data.time_zone.current_time;
        timeZonePoint = timeZonePoint.substr(timeZonePoint.length-6, timeZonePoint.length);
        timeZone = data.time_zone.id;
    })
if(timeZone=='') timeZone='Asia/Dhaka', timeZonePoint="+06:00";

fetch(`https://cp-contests.vercel.app/?timeZone=${timeZone}`)
.then(response => response.json())
.then(data=>{
    let html = '';
    if(data){
        for(let i=0; i<data.length; i++){
            let host = data[i][1]['host'];
            if(host.length>15){
                host = host.substring(0, 15).concat('...');
            }
            console.log(data[i][1]['name']);
            loader.classList.add('hide-item');
            html+=`
                <tr>
                    <th>${i+1}</th>
                    <th><a target="blank" class="con-link" href="${data[i][1]['url']}">${data[i][1]['name']}</a></th>
                    <th class="tb"><a target="blank" href="${data[i][1]['startingAt']}">${data[i][1]['startTime']}</a></th>
                    <th class="tb"><a target="blank" href="${data[i][1]['endingAt']}">${data[i][1]['endTime']}</a></th>
                    <th class="tb">${host}</th>
                </tr>`;
        };
    
        // console.log(data.length);
        
    }
    else{
        html = 'Failed';
    }
    contests.innerHTML = html;
})


fetch(`https://cp-contests.vercel.app/time/?timeZone=${timeZone}`)
.then(response=>response.json())
.then(data=>{
    const dateTime = `${data}<br>Timezone : ${timeZonePoint}`;
    const timezone = document.getElementById('timezone').innerHTML = dateTime;
})

