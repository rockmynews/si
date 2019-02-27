function init() {
    var ad3 = document.getElementsByTagName('audio');
    for (var i = 0; i < ad3.length; i++) {
        ad3[i].preload = "none";    	
        ad3[i].id = "someID" + i;
		ad3[i].preload = "none";
        ad3[i].removeAttribute("controls");
        // this["ad3" + i] = document.getElementById("someID" + i);

        // element that will be wrapped
        var el = document.getElementById("someID" + i);
        // create wrapper container
        var wrapper = document.createElement('div');
        wrapper.classList.add("a3o-wrap");
        // insert wrapper before el in the DOM tree
        el.parentNode.insertBefore(wrapper, el);
        // move el into wrapper
        wrapper.appendChild(el);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }

        var newEl = document.createElement('button');
        newEl.innerHTML = "<img src='http://si.rockmynews.com/play1.png' />";

        newEl.id = "a3o-btn" + i;
        newEl.classList.add("btn");
        var ref = document.getElementById('someID' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('span');
        newEl.id = "a3o-ct" + i;
        newEl.classList.add("time-len");
        newEl.innerHTML = ' 0:00 ';
        var ref = document.getElementById('a3o-btn' + i);
        insertAfter(newEl, ref);


        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('span');
        newEl.id = "a3o-len" + i;
        newEl.classList.add("time-duration");
        newEl.innerHTML = ' 0:00';
        var ref = document.getElementById('a3o-ct' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('progress');
        newEl.id = "progress" + i;
        newEl.setAttribute("max", "100");
        newEl.setAttribute("value", "0");
        var ref = document.getElementById('a3o-len' + i);
        insertAfter(newEl, ref);



        // function convertTime(inputSeconds) {
        //     var seconds = Math.floor(inputSeconds % 60)
        //     if (seconds < 10) {
        //         seconds = "0" + seconds
        //     }
        //     var minutes = Math.floor(inputSeconds / 60)
        //     return minutes + ":" + seconds
        // }


        (function() {
            var a3o = ad3[i];
            var btn = document.getElementById("a3o-btn" + i);
            var ct = document.getElementById("a3o-ct" + i);
            var dt = document.getElementById("a3o-len" + i);
            var pg = document.getElementById("progress" + i);

            function convertTime(inputSeconds) {
                d = inputSeconds;
                var h = Math.floor(d / 3600);
                var m = Math.floor(d % 3600 / 60);
                var s = Math.floor(d % 3600 % 60);

                if (a3o.duration > 3599) {
                    return ('' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                } else {
                    return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
                }
            }


            btn.onclick = function() {
                if (a3o.paused) {
                    a3o.play();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/pause1.png' />";
                    // btn.classList.add('active');

                } else {
                    a3o.pause();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/play1.png' />";
                    // btn.classList.remove('active');
                }


                a3o.addEventListener('loadedmetadata', function() {
                    dt.innerHTML = convertTime(a3o.duration);
                });

                //getAttribute('preload')
                a3o.ontimeupdate = function() {
                    ct.innerHTML = convertTime(a3o.currentTime);
                };




                var timer;
                var percent = 0;
                var audio = a3o;
                audio.addEventListener("playing", function(_event) {
                    pg.style.visibility = 'visible';
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


                //audio.onplaying = function() {
                pg.addEventListener("click", seek);
                pg.style.cursor = "pointer";

                function seek(e) {
                    var percent = e.offsetX / this.offsetWidth;
                    audio.currentTime = percent * audio.duration;
                    pg.value = percent / 100;
                }

            };
        })();

    }
}
window.onload = init;
