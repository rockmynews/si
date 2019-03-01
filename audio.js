function init() {
    var ad3 = document.getElementsByTagName('audio');
    for (var i = 0; i < ad3.length; i++) {
        var store = ad3[i].getAttribute("preload");
        ad3[i].preload = "none";
        ad3[i].id = "someID" + i;
        ad3[i].removeAttribute("controls");

        var el = document.getElementById("someID" + i);
        var wrapper = document.createElement('div');
        wrapper.classList.add("a3o-wrap");
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }

        var newEl = document.createElement('button');
        newEl.innerHTML = "<img src='http://si.rockmynews.com/play1.png' />";
        newEl.title = "Play";
        newEl.alt = "Play";
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
        newEl.setAttribute("min", "1");
        newEl.setAttribute("max", "100");
        newEl.setAttribute("value", "0");
        var ref = document.getElementById('a3o-len' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('input');
        newEl.classList.add("range");
        newEl.id = "range" + i;
        newEl.setAttribute("type", "range");
        newEl.setAttribute("min", "1");
        newEl.setAttribute("value", "0");
        newEl.setAttribute("max", "100");
        newEl.setAttribute("step", "any");
        var ref = document.getElementById('progress' + i);
        insertAfter(newEl, ref);

        function insertAfter(el, referenceNode) {
            referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        }
        var newEl = document.createElement('input');
        newEl.classList.add("volume");
        newEl.id = "volume" + i;
        newEl.setAttribute("min", "0");
        newEl.setAttribute("value", "1");
        newEl.setAttribute("max", "1");
        newEl.setAttribute("type", "range");
        newEl.setAttribute("step", "any");
        newEl.setAttribute("orient", "vertical");
        var ref = document.getElementById('range' + i);
        insertAfter(newEl, ref);

        (function() {
            var a3o = ad3[i];
            var btn = document.getElementById("a3o-btn" + i);
            var ct = document.getElementById("a3o-ct" + i);
            var dt = document.getElementById("a3o-len" + i);
            var pg = document.getElementById("progress" + i);
            var range = document.getElementById("range" + i);
            var vc = document.getElementById("volume" + i);

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
                range.style.cursor = "pointer";

                if (a3o.paused) {
                    a3o.play();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/pause1.png' />";
                    btn.title = "Pause";
                    btn.alt = "Pause";

                } else {
                    a3o.pause();
                    btn.innerHTML = "<img src='http://si.rockmynews.com/play1.png' />";
                    btn.title = "Play";
                    btn.alt = "Play";
                }

                a3o.addEventListener('loadedmetadata', function() {
                    dt.innerHTML = convertTime(a3o.duration);
                });

                a3o.ontimeupdate = function() {
                    ct.innerHTML = convertTime(a3o.currentTime);
                    percent = (a3o.currentTime * 100) / a3o.duration;
                    // ww.style.width= percent + "%";
                    range.value = pg.value = percent;
                }
                ;

                range.oninput = function() {
                    pg.value = range.value;
                    a3o.currentTime = (range.value / 100) * a3o.duration;
                    ct.innerHTML = convertTime(a3o.currentTime);

                }
                ;

                vc.oninput = function() {
                    a3o.volume = vc.value;
                }
                ;

            }
            ;
        }
        )();

    }

}
window.onload = init;
