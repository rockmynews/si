function init() {
    var ad3 = document.getElementsByTagName('audio');
    for (var i = 0; i < ad3.length; i++) {
        var store = ad3[i].getAttribute("preload");
        ad3[i].preload = "none";    	
        ad3[i].id = "someID" + i;
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
        var newEl = document.createElement('input');
        newEl.id = "range" + i;
        newEl.setAttribute("min", "1");
        newEl.setAttribute("max", "100");
        newEl.setAttribute("type", "range");
        var ref = document.getElementById('a3o-len' + i);
        insertAfter(newEl, ref);

        // function insertAfter(el, referenceNode) {
        //     referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
        // }
        // var newEl = document.createElement('b');
        // newEl.classList.add("www");
        // newEl.id = "www" + i;
        // var ref = document.getElementById('a3o-len' + i);
        // insertAfter(newEl, ref);
        

        // // element that will be wrapped
        // var el = document.getElementById("www" + i);
        // // create wrapper container
        // var wrapper = document.createElement('b');
        // wrapper.id = "qq" + i;
        // wrapper.classList.add("qq");
        // // insert wrapper before el in the DOM tree
        // el.parentNode.insertBefore(wrapper, el);
        // // move el into wrapper
        // wrapper.appendChild(el);


        (function() {
            var a3o = ad3[i];
            var btn = document.getElementById("a3o-btn" + i);
            var ct = document.getElementById("a3o-ct" + i);
            var dt = document.getElementById("a3o-len" + i);
            var pg = document.getElementById("progress" + i);
            var input = document.getElementById("input" + i);
            var ww = document.getElementById("www" + i);
            var qq = document.getElementById("qq" + i);
            var range = document.getElementById("range" + i);

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
                    percent = (a3o.currentTime * 100)/a3o.duration ;
                    // ww.style.width= percent + "%";
                    range.value = percent;
                };

                // range.addEventListener("click", move);
                // function move(e) {
                //     a3o.pause();
                //     var percent = e.offsetX / this.offsetWidth;
                //     ww.style.width= (percent*100) + "%";
                //     a3o.currentTime = percent * a3o.duration;
                //     a3o.play();
                // }

range.oninput  = function() {
 console.log(range.value);
a3o.currentTime = (range.value/100) * a3o.duration;

};


            };
        })();

    }
}
window.onload = init;


// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', afterDOMLoaded);
// } else {
//     afterDOMLoaded();
// }

// function afterDOMLoaded() {
//     //Everything that needs to happen after the DOM has initially loaded.
// }
