var div1 = document.createElement("div");
div1.style.margin = "20px 0";
div1.style.fontSize = "18px";
document.getElementById("result").appendChild(div1);

var n1, n2, div2, div3;
function fun1() {
    div2 = document.getElementById("edit1")
    div3 = document.getElementById("edit2")
    n1 = parseInt(div2.value);
    n2 = parseInt(div3.value);
}
var url;
var time = 0;
var videotime;

function getval() {
    url = document.getElementById("form1").value;
}
function get_url(play_url) {
    let s = `${play_url}`;
    let u = 0;
    let i;

    for (i = 0; i < s.length; i++) {
        if (s[i] == "=") {
            u = i;
        }

    }
    if (u == 0) {
        return play_url;
    }
    else {
        var url = "";
        u = u + 1;
        while (u < i) {

            url = url.concat(s[u]);
            u++;
        }
        return url;
    }
}
function end(){
    if(document.getElementById("result").classList.contains("results")){
        document.getElementById("result").classList.remove("results")
    }
}

const cal = document.getElementById("cal");
cal.addEventListener("click", function () {
    cal.innerHTML=`<i class="fa fa-spinner fa-spin"></i>`
    fun1();

    getval();

    loadVideos();
    document.getElementById("result").classList.add("results")
    setTimeout(end, 10000);
    // cal.innerHTML= "Calculate"
});
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

function loadVideos() {

    let pagetoken = '';
    let resultCount = 0;
    let videoid;
    let content;
    let check;
    const mykey = "AIzaSyDCskWpTFkgZT4CEnW-3TU8k3QZZbtoTxA";
    const playListID = get_url(document.getElementById("form1").value);
    let day =1;
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=`;


    fetch(URL)
        .then(response => {
            return response.json();
        })
        .then(function (response) {
            resultCount = response.pageInfo.totalResults;
            if(resultCount>500){
                resultCount =500;
              }
            total = resultCount;
            div1.innerHTML =" ";
            pagetoken = response.nextPageToken;
            check = resultCount;
            let j = 0;
            if (div2.value === '') {
                n1 = 1;
            }
            if (n1 > resultCount ) {
                div1.innerHTML = "Please fill correct video number.";
                cal.innerHTML= "Calculate";
            }
            if (n1 > n2 ) {
                div1.innerHTML = "Please fill correct video number.";
                cal.innerHTML= "Calculate";
            }
            if (n2 > resultCount) {
                n2 = resultCount;
            }
            if (div3.value === '') {
                n2 = resultCount;
            }
            let i;
            if (resultCount >= 50) {
                n = 49;
            }
            else {
                n = resultCount;
            }
            let gettime = 0;
      l = n1;
      let t = n1;
      x = n2 - n1 + 1;
      for (i = 0; i <= n; i++) {
        if (i == (n1 - 1) || (i >= (n1 - 1) && i < n2)) {
          videoid = response.items[i];
          if (videoid == null) {
            continue;
          }
          content = videoid.contentDetails.videoId;
          const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
          fetch(url1).then(durate => {
            return durate.json();
          }).then(function (durate) {
            let items = durate.items[0]
            // let contentdet= items.contentDetails;
            l++;
            if (items == null) {

            }
            else {
              let videoduration = items.contentDetails.duration;
              time = time + YTDurationToSeconds(videoduration);
              gettime = gettime + YTDurationToSeconds(videoduration);
            }
            // time = time + YTDurationToSeconds(videoduration);
            // if (gettime >= 3600) {
            //   day++;
            //   //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
            //   gettime = 0;
            //   t = l;
            // }
            if (x == 1) {
              addondisplay(time, 1);
              atspeed(time / 1.25, 1.25);
              atspeed(time / 1.50, 1.50);
              atspeed(time / 1.75, 1.75);
              atspeed(time / 2.00, 2.00);
            }
            x--;
          })
        }
      }
      resultCount = resultCount - 50;
      check = resultCount;
      let k = i;

      const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
      fetch(URL1).then(respond => {
        return respond.json();
      }).then(function (respond) {

        pagetoken = respond.nextPageToken;

        if (resultCount >= 50) {
          n = 49;
          resultCount = resultCount - 50;
        }
        else {
          n = resultCount;
          resultCount = resultCount - 50;
        }
        for (i = 0; i <= n; i++) {

          if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

            videoid = respond.items[i];
            if (videoid == null) {
              continue;
            }
            content = videoid.contentDetails.videoId;


            const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
            fetch(url1).then(durate => {
              return durate.json();
            }).then(function (durate) {
              let items = durate.items[0]
              l++;
              if (items == null) {

              }
              else {
                let videoduration = items.contentDetails.duration;
                time = time + YTDurationToSeconds(videoduration);
                gettime = gettime + YTDurationToSeconds(videoduration);
              }
            //   if (gettime >= 3600) {
            //     day++;
            //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
            //     gettime = 0;
            //     t = l;
            //   }
              if (x == 1) {
                addondisplay(time, 1);
                atspeed(time / 1.25, 1.25);
                atspeed(time / 1.50, 1.50);
                atspeed(time / 1.75, 1.75);
                atspeed(time / 2.00, 2.00);
              }
              x--;
            })

          }
          k++;
        }

        if (resultCount > 0) {
          const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
          fetch(URL1).then(respond => {
            return respond.json();
          }).then(function (respond) {

            pagetoken = respond.nextPageToken;

            if (resultCount >= 50) {
              n = 49;
              resultCount = resultCount - 50;
            }
            else {
              n = resultCount;
              resultCount = resultCount - 50;
            }
            for (i = 0; i <= n; i++) {
              if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                videoid = respond.items[i];
                if (videoid == null) {
                  continue;
                }
                content = videoid.contentDetails.videoId;


                const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                fetch(url1).then(durate => {
                  return durate.json();
                }).then(function (durate) {
                  let items = durate.items[0]
                  if (items == null) {

                  }
                  else {
                    let videoduration = items.contentDetails.duration;
                    time = time + YTDurationToSeconds(videoduration);
                    gettime = gettime + YTDurationToSeconds(videoduration);
                  }
                  l++;
                //   if (gettime >= 3600) {
                //     day++;
                //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                //     gettime = 0;
                //     t = l;
                //   }
                  if (x == 1) {
                    addondisplay(time, 1);
                    atspeed(time / 1.25, 1.25);
                    atspeed(time / 1.50, 1.50);
                    atspeed(time / 1.75, 1.75);
                    atspeed(time / 2.00, 2.00);
                  }
                  x--;
                }
                )
              }
              k++;
            }

            if (resultCount > 0) {
              console.log(resultCount)
              const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
              fetch(URL1).then(respond => {
                return respond.json();
              }).then(function (respond) {

                pagetoken = respond.nextPageToken;

                if (resultCount >= 50) {
                  n = 49;
                  resultCount = resultCount - 50;
                }
                else {
                  n = resultCount;
                  resultCount = resultCount - 50;
                }
                for (i = 0; i <= n; i++) {
                  if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                    videoid = respond.items[i];
                    if (videoid == null) {
                      continue;
                    }
                    content = videoid.contentDetails.videoId;


                    const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                    fetch(url1).then(durate => {
                      return durate.json();
                    }).then(function (durate) {
                      let items = durate.items[0]
                      if (items == null) { }
                      else {
                        let videoduration = items.contentDetails.duration;
                        time = time + YTDurationToSeconds(videoduration);
                        gettime = gettime + YTDurationToSeconds(videoduration);
                      }
                      l++;
                    //   if (gettime >= 3600) {
                    //     day++;
                    //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                    //     gettime = 0;
                    //     t = l;
                    //   }
                      if (x == 1) {
                        addondisplay(time, 1);
                        atspeed(time / 1.25, 1.25);
                        atspeed(time / 1.50, 1.50);
                        atspeed(time / 1.75, 1.75);
                        atspeed(time / 2.00, 2.00);
                      }
                      x--;
                    })
                  }
                  k++;
                }
                if (resultCount > 0) {
                  console.log(resultCount)
                  const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                  fetch(URL1).then(respond => {
                    return respond.json();
                  }).then(function (respond) {

                    pagetoken = respond.nextPageToken;

                    if (resultCount >= 50) {
                      n = 49;
                      resultCount = resultCount - 50;
                    }
                    else {
                      n = resultCount;
                      resultCount = resultCount - 50;
                    }
                    for (i = 0; i <= n; i++) {
                      if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                        videoid = respond.items[i];
                        if (videoid == null) {
                          continue;
                        }
                        content = videoid.contentDetails.videoId;


                        const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                        fetch(url1).then(durate => {
                          return durate.json();
                        }).then(function (durate) {
                          let items = durate.items[0]
                          if (items == null) { }
                          else {
                            let videoduration = items.contentDetails.duration;
                            time = time + YTDurationToSeconds(videoduration);
                            gettime = gettime + YTDurationToSeconds(videoduration);
                          }
                          l++;
                        //   if (gettime >= 3600) {
                        //     day++;
                        //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                        //     gettime = 0;
                        //     t = l;
                        //   }
                          if (x == 1) {
                            addondisplay(time, 1);
                            atspeed(time / 1.25, 1.25);
                            atspeed(time / 1.50, 1.50);
                            atspeed(time / 1.75, 1.75);
                            atspeed(time / 2.00, 2.00);
                          }
                          x--;
                        })
                      }
                      k++;
                    }
                    if (resultCount > 0) {
                      const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                      fetch(URL1).then(respond => {
                        return respond.json();
                      }).then(function (respond) {

                        pagetoken = respond.nextPageToken;

                        if (resultCount >= 50) {
                          n = 49;
                          resultCount = resultCount - 50;
                        }
                        else {
                          n = resultCount;
                          resultCount = resultCount - 50;
                        }
                        for (i = 0; i <= n; i++) {
                          if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                            videoid = respond.items[i];
                            if (videoid == null) {
                              continue;
                            }
                            content = videoid.contentDetails.videoId;


                            const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                            fetch(url1).then(durate => {
                              return durate.json();
                            }).then(function (durate) {
                              let items = durate.items[0]
                              if (items == null) { }
                              else {
                                let videoduration = items.contentDetails.duration;
                                time = time + YTDurationToSeconds(videoduration);
                                gettime = gettime + YTDurationToSeconds(videoduration);
                              }
                              l++;
                            //   if (gettime >= 3600) {
                            //     day++;
                            //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                            //     gettime = 0;
                            //     t = l;
                            //   }
                              if (x == 1) {
                                addondisplay(time, 1);
                                atspeed(time / 1.25, 1.25);
                                atspeed(time / 1.50, 1.50);
                                atspeed(time / 1.75, 1.75);
                                atspeed(time / 2.00, 2.00);
                              }
                              x--;
                            })
                          }
                          k++;
                        }
                        if (resultCount > 0) {
                          const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                          fetch(URL1).then(respond => {
                            return respond.json();
                          }).then(function (respond) {

                            pagetoken = respond.nextPageToken;

                            if (resultCount >= 50) {
                              n = 49;
                              resultCount = resultCount - 50;
                            }
                            else {
                              n = resultCount;
                              resultCount = resultCount - 50;
                            }
                            for (i = 0; i <= n; i++) {
                              if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                                videoid = respond.items[i];
                                if (videoid == null) {
                                  continue;
                                }
                                content = videoid.contentDetails.videoId;


                                const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                                fetch(url1).then(durate => {
                                  return durate.json();
                                }).then(function (durate) {
                                  let items = durate.items[0]
                                  if (items == null) { }
                                  else {
                                    let videoduration = items.contentDetails.duration;
                                    time = time + YTDurationToSeconds(videoduration);
                                    gettime = gettime + YTDurationToSeconds(videoduration);
                                  }
                                  l++;
                                //   if (gettime >= 3600) {
                                //     day++;
                                //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                                //     gettime = 0;
                                //     t = l;
                                //   }
                                  if (x == 1) {
                                    addondisplay(time, 1);
                                    atspeed(time / 1.25, 1.25);
                                    atspeed(time / 1.50, 1.50);
                                    atspeed(time / 1.75, 1.75);
                                    atspeed(time / 2.00, 2.00);
                                  }
                                  x--;
                                })
                              }
                              k++;
                            }
                            if (resultCount > 0) {
                              const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                              fetch(URL1).then(respond => {
                                return respond.json();
                              }).then(function (respond) {

                                pagetoken = respond.nextPageToken;

                                if (resultCount >= 50) {
                                  n = 49;
                                  resultCount = resultCount - 50;
                                }
                                else {
                                  n = resultCount;
                                  resultCount = resultCount - 50;
                                }
                                for (i = 0; i <= n; i++) {
                                  if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                                    videoid = respond.items[i];
                                    if (videoid == null) {
                                      continue;
                                    }
                                    content = videoid.contentDetails.videoId;


                                    const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                                    fetch(url1).then(durate => {
                                      return durate.json();
                                    }).then(function (durate) {
                                      let items = durate.items[0]
                                      if (items == null) { }
                                      else {
                                        let videoduration = items.contentDetails.duration;
                                        time = time + YTDurationToSeconds(videoduration);
                                        gettime = gettime + YTDurationToSeconds(videoduration);
                                      }
                                      l++;
                                    //   if (gettime >= 3600) {
                                    //     day++;
                                    //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                                    //     gettime = 0;
                                    //     t = l;
                                    //   }
                                      if (x == 1) {
                                        addondisplay(time, 1);
                                        atspeed(time / 1.25, 1.25);
                                        atspeed(time / 1.50, 1.50);
                                        atspeed(time / 1.75, 1.75);
                                        atspeed(time / 2.00, 2.00);
                                      }
                                      x--;
                                    })
                                  }
                                  k++;
                                }
                                if (resultCount > 0) {
                                  const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                                  fetch(URL1).then(respond => {
                                    return respond.json();
                                  }).then(function (respond) {

                                    pagetoken = respond.nextPageToken;

                                    if (resultCount >= 50) {
                                      n = 49;
                                      resultCount = resultCount - 50;
                                    }
                                    else {
                                      n = resultCount;
                                      resultCount = resultCount - 50;
                                    }
                                    for (i = 0; i <= n; i++) {
                                      if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                                        videoid = respond.items[i];
                                        if (videoid == null) {
                                          continue;
                                        }
                                        content = videoid.contentDetails.videoId;


                                        const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                                        fetch(url1).then(durate => {
                                          return durate.json();
                                        }).then(function (durate) {
                                          let items = durate.items[0]
                                          if (items == null) { }
                                          else {
                                            let videoduration = items.contentDetails.duration;
                                            time = time + YTDurationToSeconds(videoduration);
                                            gettime = gettime + YTDurationToSeconds(videoduration);
                                          }
                                          l++;
                                        //   if (gettime >= 3600) {
                                        //     day++;
                                        //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                                        //     gettime = 0;
                                        //     t = l;
                                        //   }
                                          if (x == 1) {
                                            addondisplay(time, 1);
                                            atspeed(time / 1.25, 1.25);
                                            atspeed(time / 1.50, 1.50);
                                            atspeed(time / 1.75, 1.75);
                                            atspeed(time / 2.00, 2.00);
                                          }
                                          x--;
                                        })
                                      }
                                      k++;
                                    }
                                    if (resultCount > 0) {
                                      const URL1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken,pageInfo&key=${mykey}&playlistId=${playListID}&pageToken=${pagetoken}`;
                                      fetch(URL1).then(respond => {
                                        return respond.json();
                                      }).then(function (respond) {

                                        pagetoken = respond.nextPageToken;

                                        if (resultCount >= 50) {
                                          n = 49;
                                          resultCount = resultCount - 50;
                                        }
                                        else {
                                          n = resultCount;
                                          resultCount = resultCount - 50;
                                        }
                                        for (i = 0; i <= n; i++) {
                                          if ((k == (n1 - 1) || (k >= (n1 - 1) && k < n2))) {

                                            videoid = respond.items[i];
                                            if (videoid == null) {
                                              continue;
                                            }
                                            content = videoid.contentDetails.videoId;


                                            const url1 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${mykey}&id=${content}&fields=items/contentDetails/duration`
                                            fetch(url1).then(durate => {
                                              return durate.json();
                                            }).then(function (durate) {
                                              let items = durate.items[0]
                                              if (items == null) { }
                                              else {
                                                let videoduration = items.contentDetails.duration;
                                                time = time + YTDurationToSeconds(videoduration);
                                                gettime = gettime + YTDurationToSeconds(videoduration);
                                              }
                                              l++;
                                            //   if (gettime >= 3600) {
                                            //     day++;
                                            //     //div1.innerHTML += `${t} to ${l} on day ${day}<br>`;
                                            //     gettime = 0;
                                            //     t = l;
                                            //   }
                                              if (x == 1) {
                                                addondisplay(time, 1);
                                                atspeed(time / 1.25, 1.25);
                                                atspeed(time / 1.50, 1.50);
                                                atspeed(time / 1.75, 1.75);
                                                atspeed(time / 2.00, 2.00);
                                              }
                                              x--;
                                            })
                                          }
                                          k++;
                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
      time = 0;
    })
    .catch(function (error) {
      div1.innerHTML = `The playlist identified with the request's playlistId parameter cannot be found or video numbers filled are wrong.`;
      cal.innerHTML= "Calculate"
    });

}
function addondisplay(time) {
    var hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    var Minutes = Math.floor(time / 60);
    time = Math.floor(time - Minutes * 60);
    div1.innerHTML = `Total Videos in playlist : ${total}<br><br>`
    div1.innerHTML += `Length of playlist from Video No. ${n1} to ${n2} is : ${hours} Hours, ${Minutes} Minutes, ${time} seconds<br><br>`;
}
function atspeed(time, speed) {
    var hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    var Minutes = Math.floor(time / 60);
    time = Math.floor(time - Minutes * 60);
    speed = speed.toFixed(2);
    div1.innerHTML += `At ${speed}x : ${hours} Hours, ${Minutes} Minutes, ${time} seconds<br><br>`;
    document.getElementById("form1").value = '';
    div2.value='';
    div3.value='';
    cal.innerHTML= "Calculate";
}


// let btn = document.getElementById("menu")
// let arr = document.getElementsByClassName("nav-linker")
// let head = document.getElementsByClassName("heading")[0];
// btn.addEventListener("click", ()=>{
//   head.classList.toggle("expand")
//   btn.classList.toggle("fa-bars")
//   btn.classList.toggle("fa-close")
//   for (let i = 0; i < arr.length; i++) {
//       arr[i].classList.toggle("act")
//   }
// })