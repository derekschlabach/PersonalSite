instruments = [
    ['ts', 'ts', 'ck'], ['bb', 'bb', 'bb'], ['pbf', 'ts', 'ck'], ['bb', 'ts', 'pbf'],
    ['ck', 'ck', 'pbf'], ['pbf', 'ts', 'ck'], ['bb', 'bb', 'ts'], ['pbf', 'pbf', 'ts'],
    ['bb', 'bb', 'pbf'], ['bb', 'bb', 'ck'], ['bb', 'ts', 'ck'], ['pbf', 'pbf', 'ck']
];

rhythms = [['1020', '3020', '1120', '3020'], ['1010', '3011', '0101', '3000']];

document.getElementById('textInput').onblur = function(event) { setTimeout(function() { event.target.focus(); }, 0);};
document.getElementById('textInput').onkeydown = inputKeyDown;
function inputKeyDown(event) {
    if (event.keyCode === 13 && event.currentTarget.value != '') {
        metronome.playTrack(new AudioTrack(event.currentTarget.value, true));
        event.currentTarget.value = '';
    }
}

var mp3Tracks = { bb : 'Assets/BeatBox/Bb.mp3', ck : 'Assets/BeatBox/Ck.mp3', pbf : 'Assets/BeatBox/Pbf.mp3', ts : 'Assets/BeatBox/Ts.mp3'};
var instruments, rhythms;
var metronome = new function() {
    this.audioTracks = [];
    this.playingQueue = [];
    this.running = false;
    this.tempo = 128;
    this.beat = this.note = 0;
    this.intervalHandle = null;

    this.playTrack = function(audioTrack) {
        var newAudioTrack = true;
        for (var i in this.audioTracks)
            if (this.audioTracks[i] === audioTrack) newAudioTrack = false;

        if (newAudioTrack) this.audioTracks.push(audioTrack);
        this.playingQueue.push(audioTrack);
        if (!this.running) this.start();
    };

    this.stop = function() {
        this.running = false;
        this.beat = this.note = 0;
        if (this.intervalHandle) clearInterval(this.intervalHandle);
    };

    this.start = function() {
        if (this.intervalHandle) clearInterval(this.intervalHandle);
        this.intervalHandle = setInterval(function() {metronome.run();}, 15000 / this.tempo);
    };

    this.changeTempo = function(newTempo) {
        this.tempo = newTempo;
        this.start();
    };

    this.run = function() {
        if (this.beat === 0 && this.note === 0)
            while (this.playingQueue.length > 0)
                this.playingQueue.pop().play();

        var trackPlaying = false;
        for (var i = 0; i < this.audioTracks.length; i++)
            if (this.audioTracks[i].isPlaying()) {
                trackPlaying = true;
                this.audioTracks[i].playNote(this.beat, this.note);
            }

        if (!trackPlaying) this.stop();
        else {
            this.note = (this.note + 1) % 4;
            if (this.note === 0) {
                this.beat = (this.beat + 1) % 4;
                if (this.beat === 0)
                    this.audioTracks.forEach(function (audioTrack) { if (audioTrack.isPlaying()) audioTrack.incrementMeasure(); });
            }
        }
    }
};

function AudioTrack(text, looping) {
    this.instruments = [];
    this.rhythms = [];
    for (var i = 0; i < text.length; i++) {
        this.instruments.push(instruments[getInstrumentIndex(text[i])]);
        this.rhythms.push(rhythms[getRhythmIndex(text[i])]);
    }
    console.log(this.instruments.join());
    this.tracks = { bb : document.createElement('audio'), ck : document.createElement('audio'),
        pbf : document.createElement('audio'), ts : document.createElement('audio')};
    for (var key in this.tracks) if (this.tracks.hasOwnProperty(key)) {
        var tmpSource = document.createElement('source');
        tmpSource.type = 'audio/mpeg'; tmpSource.src = mp3Tracks[key];
        this.tracks[key].appendChild(tmpSource);
    }
    this.playingTrack = null;
    this.measure = 0;
    this.looping = looping || false;
    this.playing = false;

    this.playNote = function(beat, note) {
        var trackNum = parseInt(this.rhythms[this.measure][beat].substr(note, 1));
        console.log(trackNum);
        if (trackNum) {
            if (this.playingTrack) {
                this.playingTrack.pause();
                this.playingTrack.currentTime = 0;
            }
            this.playingTrack = this.tracks[this.instruments[this.measure][trackNum - 1]];
            this.playingTrack.play();
        }
    };

    this.isPlaying = function() { return this.playing; };
    this.play = function() { this.playing = true; };
    this.stop = function() { this.playing = false; this.measure = 0; };

    this.incrementMeasure = function() {
        this.measure = (this.measure + 1) % this.rhythms.length;
        if (this.measure == 0 && !this.looping) this.stop();
    };
}

function getInstrumentIndex(char) { return ((char.charCodeAt(0) & 0x78) >> 3) - 4; }
function getRhythmIndex(char) { return (char.charCodeAt(0) & 0x7) % 2; }
