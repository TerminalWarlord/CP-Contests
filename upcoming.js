const contests = document.getElementById('fetch-con');
const loader = document.getElementById('loader');

fetch(`https://cp-contests.vercel.app/`)
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


fetch('https://cp-contests.vercel.app/time')
.then(response=>response.json())
.then(data=>{
    const dateTime = `${data['time']}<br>Timezone : +00:00`;
    const timezone = document.getElementById('timezone').innerHTML = dateTime;
})