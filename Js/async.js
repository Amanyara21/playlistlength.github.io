var n1, n2, div2, div3;
function fun1() {
    div2 = document.getElementById("edit1")
    div3 = document.getElementById("edit2")
    n1 = parseInt(div2.value);
    n2 = parseInt(div3.value);
}


var div1 = document.getElementById("data");

var err =  document.createElement("div");
document.getElementById("wrngOutput").appendChild(err)

function getval() {
    div1.innerHTML == "";
    let url = document.getElementById("form1").value;
    let equal;
    let flag = 0;
    let length = url.length;
    let j = 0;
    while (length != 0) {
        if (url[j] == "=") {
            equal = j;
            flag++;
        }
        j++;
        length--;
    }
    if (flag == 0) {
        return url;
    }
    if (flag == 1) {
        return url.slice(equal + 1, equal + 35);
    }
}

const cal = document.getElementById("getbtn");
cal.addEventListener("click", function () {


    div1.innerHTML=""
    err.innerHTML= ""
    cal.innerHTML = `<i class="fa fa-spinner fa-spin"></i>`
    getval();
    fun1();
    init();
})
async function init() {
    var time = 0;
    let day = 1;
    let hours;
    if (document.getElementById("gethours").value == "") {
        hours = 1
    }
    else {
        hours = document.getElementById("gethours").value;
    }
    try {
        const mykey = "AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA";
        const playListID = getval();
        let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=`)
        let data = await response.json()
        let resultCount = data.pageInfo.totalResults;
        if (div2.value === '') {
            n1 = 1;
        }
        if (n1 > resultCount || n1<=0 || n2<=0) {
            document.getElementsByClassName("error")[0].classList.add("visibleErr")
            err.innerHTML = "Please fill correct video number.";
            cal.innerHTML = "Calculate";
        }
        if (n1 > n2) {
            document.getElementsByClassName("error")[0].classList.add("visibleErr")
            err.innerHTML = "Please fill correct video number.";
            cal.innerHTML = "Get Table";
        }
        if (n2 > resultCount) {
            n2 = resultCount;
        }
        if (div3.value === '') {
            n2 = resultCount;
        }
        if (resultCount >= 50) {
            n = 49;
        }
        else {
            n = resultCount;
        }
        if( err.innerHTML ==""){
            document.getElementsByClassName("output")[0].classList.add("outputVisible")
        }
        let x = n2;
        let starts = n1;
        let ends = n1;
        pageToken = data.nextPageToken;
        // console.log(pageToken)
        let i;
        for (i = 0; i < 50; i++) {
            if (i >= n1 - 1 && i < n2) {
                // if(data.items[i].contentDetails== undefined){
                //     continue;
                // }
                let content = data.items[i].contentDetails.videoId;
                let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                let durate = await respond.json()
                if (durate.items[0] == undefined) {
                    i++;
                    ends++;
                    continue;
                }

                time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                if (time > (3300 * hours)) {
                    if (time > (5800 * hours)) {
                        div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                        day++;
                    }
                    else {
                        console.log(i, time, hours);
                        div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                    }
                    starts = ends + 1;
                    day++;
                    time = 0;
                }
                ends++;
                if (i == n2 - 1) {
                    cal.innerHTML = `Get Table`
                }
            }
        }

        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                // if(data.items[i].contentDetails== undefined){
                //     continue;
                // }
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else{
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                       
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {
                        cal.innerHTML = `Get Table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {
                        cal.innerhtml = `Get table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {

                        cal.innerhtml = `Get Table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {

                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {
                        cal.innerhtml = `Get table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {

                        cal.innerhtml = `Get Table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }

                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {

                        cal.innerhtml = `Get Table`
                    }
                }
            }
        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    if (data.items[i].contentDetails == undefined) {
                        continue;
                    }
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {

                        cal.innerhtml = `Get Table`
                    }
                }
            }

        }
        n1 = n1 - 50;
        n2 = n2 - 50;
        // console.log("n2 is ", n2);
        if (n2 > 1) {
            let response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pageToken}`)
            let data = await response.json()
            pageToken = data.nextPageToken;
            // console.log(pageToken)
            let i;
            for (i = 0; i < 50; i++) {
                if (i >= n1 - 1 && i < n2) {
                    let content = data.items[i].contentDetails.videoId;
                    let respond = await fetch(`https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA&id=${content}&fields=items/contentDetails/duration`)
                    let durate = await respond.json()
                    time += YTDurationToSeconds(durate.items[0].contentDetails.duration)
                    // console.log(i, time);
                    if (time > (3300 * hours)) {
                        if (time > (5800 * hours)) {
                            div1.innerHTML += `<td>${day} and ${day + 1}</td><td>${starts}</td><td>${ends}</td>`
                            day++;
                        }
                        else {
                            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${ends}</td>`
                        }
                        starts = ends + 1;
                        day++;
                        time = 0;
                    }
                    ends++;
                    if (i == n2 - 1) {
                        cal.innerhtml = `Get Table`
                    }
                }
            }
        }
        console.log(x, ends);
        if (x >= starts) {
            div1.innerHTML += `<td>${day}</td><td>${starts}</td><td>${x}</td>`;
        }
    }   
    catch(error) {
        document.getElementsByClassName("error")[0].classList.add("visibleErr")
        err.innerHTML = "The playlist identified with the request's playlistId parameter cannot be found or video numbers filled are wrong.";
        cal.innerHTML = `Get Table`
        document.getElementsByClassName("output")[0].classList.remove("outputVisible")
    }

}

function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function (x) {
        if (x != null) {
            return x.replace(/\D/, '');
        }
    });

    var hours = (parseInt(match[0]) || 0);
    var Minute = (parseInt(match[1]) || 0);
    var seconds = (parseInt(match[2]) || 0);

    return hours * 3600 + Minute * 60 + seconds;
}
