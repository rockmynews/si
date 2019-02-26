    function init() {
    var imgDefer = document.getElementsByTagName('audio');
    for (var i = 0; i < imgDefer.length; i++) {
        imgDefer[i].id = "someID" + i;

        this["marker" + i] = document.getElementById("someID" + i);


// element that will be wrapped
var el = document.getElementById("someID" + i);

// create wrapper container
var wrapper = document.createElement('div');
wrapper.classList.add("hah-wrap");
// insert wrapper before el in the DOM tree
el.parentNode.insertBefore(wrapper, el);

// move el into wrapper
wrapper.appendChild(el);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }

        var newEl = document.createElement('button');
        newEl.innerHTML = "<img src='http://si.rockmynews.com/play.png' style='max-width:100%;vertical-align:middle;' />";

        newEl.id = "button" + i;
        newEl.classList.add("btn");
        var ref = document.getElementById('someID' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('span');
        newEl.id = "ctime" + i;
        newEl.innerHTML = '0:00 ';
        var ref = document.getElementById('button' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('progress');
        newEl.id = "progress" + i;
        newEl.setAttribute("max", "100");
        newEl.setAttribute("value", "0");
        var ref = document.getElementById('ctime' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('span');
        newEl.id = "duration" + i;
        newEl.innerHTML = ' 0:00';
        var ref = document.getElementById('progress' + i);
        insertAfter(newEl, ref);




        function convertElapsedTime(inputSeconds) {
            var seconds = Math.floor(inputSeconds % 60)
            if (seconds < 10) {
                seconds = "0" + seconds
            }
            var minutes = Math.floor(inputSeconds / 60)
            return minutes + ":" + seconds
        }


        (function() {
            var hah = this["marker" + i];
            var btn = document.getElementById("button" + i);
            var ct = document.getElementById("ctime" + i);
            var dt = document.getElementById("duration" + i);
            var pg = document.getElementById("progress" + i);
            btn.onclick = function() {
                if (hah.paused) {
                    hah.play();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/pause.png' style='max-width:100%;vertical-align:middle;' />";
                } else {
                    hah.pause();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/play.png' style='max-width:100%;vertical-align:middle;' />";
                }


                hah.addEventListener('loadedmetadata', function() {
                    dt.innerHTML = " " + convertElapsedTime(hah.duration);
                });

                hah.ontimeupdate = function() {
                    myFunction()
                };

                function myFunction() {
                    ct.innerHTML = convertElapsedTime(hah.currentTime) + " ";
                }



                var timer;
                var percent = 0;
                var audio = hah;
                audio.addEventListener("playing", function(_event) {
                    var duration = _event.target.duration;
                    advance(duration, audio);
                });
                audio.addEventListener("pause", function(_event) {
                    clearTimeout(timer);
                });
                var advance = function(duration, element) {
                    var progress = pg;
                    increment = 10 / duration;
                    percent = Math.min(increment * element.currentTime * 10, 100);
                    progress.value = percent;
                    startTimer(duration, element);
                }
                var startTimer = function(duration, element) {
                    if (percent < 100) {
                        timer = setTimeout(function() {
                            advance(duration, element);
                        }, 100);
                    }
                }


//                audio.onplaying = function() {
                    pg.addEventListener("click", seek);
                    pg.style.cursor = "pointer";
                    function seek(e) {
                        var percent = e.offsetX / this.offsetWidth;
                        audio.currentTime = percent * audio.duration;
                        pg.value = percent / 100;
                    }
//                };

            };
        })();



    }




}



window.onload = init;