document.addEventListener("DOMContentLoaded", function() {
    let circles = document.querySelectorAll('.circle');

    circles.forEach(function(circle) {
        circle.addEventListener("mouseover", function(e) {
            circle.style.backgroundColor = "rgb(81, 200, 120)";
        });

        circle.addEventListener("mouseout", function(e) {
            circle.style.backgroundColor = "rgb(135, 169, 108)";
        });
        circle.addEventListener("mousedown", function(e) {
            circle.style.boxShadow = "none";
            

        });
        circle.addEventListener("mouseup", function(e) {
            circle.style.boxShadow = "0px 5px 5px rgba(255, 26, 26, 0.22)";
            
            
        });
    });

    const musicplayer = document.querySelector('.musicplayer');
    const forwardbutton = document.querySelector('.forward');
    const backbutton = document.querySelector('.back');
    const outerdisk = document.querySelector('.outerone');
    const body = document.querySelector('.container');
    const screen = document.querySelector('.screen');
    const song = document.getElementById("song");
    const playbutton = document.querySelector('.play');
    const ctrlIcon = playbutton.querySelector('.play i');
    const Bar = document.getElementById("songbar");
    const titles = document.querySelector('.titles');

    let songs = [
        {name: "Not_Like_Us", artist: "Kendrick Lamar"},
        {name: "Sare_Jahan_Se_Achha", artist: "Lata Mangeshkar"},
        {name: "Lalkaara", artist: "Dilijit Dosanjh"},
        {name: "King_Shit", artist: "Shubh"},
        {name: "Hit_The_Road_Jack", artist: "Ray Charles"},
        {name: "Drop_It_Like_Its_Hot", artist: "Snoop Dogg"},
        {name: "Yeh_Shaam_Mastani", artist: "Kishore Kumar"}

    ];

    let index = 1;
    let currentRotation = 0;
    let isPlaying = false;
    let rotationInterval;

    function loadSong() {
        
        outerdisk.style.backgroundImage = `url(${songs[index].name}.png)`;
        
        song.src = `g${songs[index].artist} - ${songs[index].name}.mp3`;
        let realname = (songs[index].name);
        let fullname = realname.replace(/_/g, " ");

        screen.innerHTML = `
        <div class="titles">
            <h2 style="text-align:left; margin:0px 0px;">Now Playing: ${fullname}</h2>
            <h3 style="text-align:left; margin:0px 0px;">By: ${songs[index].artist}</h3>
        </div>`;
        song.addEventListener('loadedmetadata', function() {
            startRotation();
            Bar.max = song.duration;
        });

        if (isPlaying) {
            song.play();
        } else {
            song.pause();
        }
    }

    function playpause() {
        if (ctrlIcon.classList.contains("fa-pause")) {
            titles.style.animationPlayState = 'paused';
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            isPlaying = false;
        } else {
            song.play();
            titles.style.animationPlayState = 'running';
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
            isPlaying = true;
            startRotation();
        }
    }

    song.onloadedmetadata = function() {
        Bar.max = song.duration;
        Bar.value = song.currentTime;
    }

    if (song.play()) {
        setInterval(() => {
            Bar.value = song.currentTime;
        }, 200);
    }

    playbutton.addEventListener("click", function() {
        playpause();
    });

    Bar.addEventListener("input", function() {
        song.currentTime = Bar.value;
    });

    forwardbutton.addEventListener("click", function() {
        nextSong();
    });

    backbutton.addEventListener("click", function() {
        if (index == 0) {
            index = songs.length - 1;
        } else {
            index--;
        }
        loadSong();
    });

    function nextSong() {
        if (index == songs.length - 1) {
            index = 0;
        } else {
            index++;
        }
        loadSong();
    }

    song.addEventListener("ended", function() {
        nextSong();
    });

    function startRotation() {
        clearInterval(rotationInterval);
        let rotationSpeed = 360 / 3; 
        let rotationStep = rotationSpeed / 100; 
    
        rotationInterval = setInterval(() => {
            if (isPlaying) {
                currentRotation += rotationStep;
                outerdisk.style.transform = `rotate(${currentRotation}deg)`;
            }
        }, 10); 
    }
    


    loadSong();
    
    
});
