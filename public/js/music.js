var leftPath = new Path({
    strokeColor: 'rgb(255, 123, 0)',
    opacity: 1
});

var rightPath = new Path({
    strokeColor: 'rgb(0, 255, 0)',
    opacity: 1
});

var amount = 8;
var step = view.size.width / (amount + 1);
var flip = true;

for (var i = 0; i <= amount; i++) {
    leftPath.add(new Point(i * step, 0));
    rightPath.add(new Point(i * step, 0));
}

var group = new Group({
    children: [leftPath, rightPath],
    applyMatrix: false,
    strokeWidth: 2,
    strokeJoin: 'round',
    strokeCap: 'butt',
    pivot: leftPath.position,
    position: view.center
});

var context;

var audio, source, analyserL, analyserR, freqByteData;

view.onFrame = function () {
    var step = view.size.width / (amount + 1);
    var scale = view.size.height / 1.5;
    analyserL.getByteFrequencyData(freqByteData);
    var leftBands = getEqualizerBands(freqByteData, true);
    analyserR.getByteFrequencyData(freqByteData);
    var rightBands = getEqualizerBands(freqByteData, true);
    for (var i = 1; i <= amount; i++) {
        leftPath.segments[i].point = [i * step, -leftBands[i - 1] * scale];
        rightPath.segments[i].point = [i * step, -rightBands[i - 1] * scale * (flip ? -1 : 1)];
    }
    leftPath.smooth();
    rightPath.smooth();
    group.pivot = [leftPath.position.x, 0];
    group.position = view.center;
}

// Pause animation until we have data
view.pause();
group.opacity = 0;

var trigger = false;
var AudioContext = window.AudioContext || window.webkitAudioContext;

var index = 0;

function onMouseDown() {
    if (index === 0) {
        group.opacity = 1;
        index = 1;
        if (audio && audio.state === "suspend") {
            audio.resume();
        } else {
            if (AudioContext) {
                audio = new AudioContext();
                source = audio.createBufferSource();
                // Create two separate analyzers for left and right channel.
                analyserL = audio.createAnalyser();
                analyserL.smoothingTimeConstant = 0.25;
                analyserL.fftSize = Math.pow(2, amount) * 2;
                analyserR = audio.createAnalyser();
                analyserR.smoothingTimeConstant = analyserL.smoothingTimeConstant;
                analyserR.fftSize = analyserL.fftSize;
                // Create the buffer to receive the analyzed data.
                freqByteData = new Uint8Array(analyserL.frequencyBinCount);
                // Create a splitter to feed them both
                var splitter = audio.createChannelSplitter();
                // Connect audio processing graph
                source.connect(splitter);
                splitter.connect(analyserL, 0, 0);
                splitter.connect(analyserR, 1, 0);
                // Connect source to output also so we can hear it
                source.connect(audio.destination);
                loadAudioBuffer('./files/gnossienne.mp3');
            } else {
                // TODO: Print error message
                alert('Audio not supported');
            }
        }
    } else if (index === 1) {
        //audio.close();
        flip = !flip;
        index = 2;
    } else if (index === 2) {
        audio.close();
        group.opacity = 0;
        index = 0;
    }
}

function loadAudioBuffer(url) {
    // Load asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        audio.decodeAudioData(
            request.response,
            function (buffer) {
                source.buffer = buffer;
                source.loop = true;
                source.start(0);
                view.play();
            },

            function (buffer) {
                alert("Error loading MP3");
            }
        );
    };
    request.send();
}

function getEqualizerBands(data) {
    var bands = [];
    var amount = Math.sqrt(data.length) / 2;
    for (var i = 0; i < amount; i++) {
        var start = Math.pow(2, i) - 1;
        var end = start * 2 + 1;
        var sum = 0;
        for (var j = start; j < end; j++) {
            sum += data[j];
        }
        var avg = sum / (255 * (end - start));
        bands[i] = Math.sqrt(avg / Math.SQRT2);
    }
    return bands;
}