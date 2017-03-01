var tieUpController = function() {

    this.stringList = {
        sqrt3 : [7,3,2,0,5,0,8,0,7,5,6,8,8,7,7,2,9,3,5,2,7,4,4,6,3,4,1,5,0,5,8,7,2,3,6,6,9,4,2,8,0,5,2,5,3,8,1,0,3,8,0,6,2,8,0,5,5,8,0,6,9,7,9,4,5,1,9,3,3,0,1,6,9,0,8,8,0,0,0,3,7,0,8,1,1,4,6,1,8,6,7,5,7,2,4,8,5,7,5,6,7,5,6,2,6,1,4,1,4,1,5,4,0,6,7,0,3,0,2,9,9,6,9,9,4,5,0,9,4,9,9,8,9,5,2,4,7,8,8,1,1,6,5,5,5,1,2,0]
        ,sqrt5 : [2,3,6,0,6,7,9,7,7,4,9,9,7,8,9,6,9,6,4,0,9,1,7,3,6,6,8,7,3,1,2,7,6,2,3,5,4,4,0,6,1,8,3,5,9,6,1,1,5,2,5,7,2,4,2,7,0,8,9,7,2,4,5,4,1,0,5,2,0,9,2,5,6,3,7,8,0,4,8,9,9,4,1,4,4,1,4,4,0,8,3,7,8,7,8,2,2,7,4,9,6,9,5,0,8,1,7,6,1,5,0,7,7,3,7,8,3,5,0,4,2,5,3,2,6,7,7,2,4,4,4,7,0,7,3,8,6,3,5,8,6,3,6,0,1,2,1,5]
        ,mth1 : [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0]
    };
    // function ppth(a) {
    //     document.getElementById('thread').innerHTML = a.toString();
    // }
    // function pptr(a) {
    //     document.getElementById('tread').innerHTML = a.toString();
    // }
    // function ppjson(o) {
    //     document.getElementById('json').innerHTML = JSON.stringify(o);
    // }
    // function pptp(a) {
    //     for (var x in a) {
    //         document.getElementById('tieup').innerHTML += "["+a[x]+"], ";
    //     }
    //
    // }

    this.setMod = function(v) {
        this.modVal = v;
        this.inVerMod = this.modVal + v;
    }
    this.setMod(4);
    function _pluck(nl, pl) {
        var tr = [];
        for (var i = 0, len = pl.length; i<len; i++) {
            tr = tr.concat(nl[pl[i]-1]);
        }
        return tr;
    }
    function _roll(a) {
        var aa = a.shift();
        a = a.concat([aa]);
        return a;
    }
    function _rollf(a) {
        var aa = a.pop();
        a = [aa].concat(a);
        return a;
    }
    function modN(n) {
        return (n % 4) + 1;
    }
    function inVer(n) {
        return 5 - n;
    }
    this.setThread = function(t) {
        this.thread = t;
    }
    this.setTread = function(t) {
        this.tread = t;
    }
    this.setThread(this.stringList.sqrt5);
    this.setTread(this.stringList.sqrt5);
    this.modTreddle = function() {
        this.thread = this.thread.map(modN)
        this.tread = this.tread.map(modN).map(inVer);
    }
    this.modTreddle();



    this.setTieUp = function() {
        var pl = [1,3]
        var blank_pl = [2,4]
        var nl = [1,2,3,4]

        var i = 0,tie_up = [];
        tie_up.push(_pluck(nl,pl));
        while (i < 4) {
            nl = _rollf(nl);
            tie_up.push(_pluck(nl,pl));
            i++;
        }
        this.tie_up = tie_up;
    }
    this.setTieUp();
    this.getDefaultDraft = function() {
        return {
            thread : this.thread,
            tread : this.tread,
            tie_up : this.tie_up
        }
    }
    //ppjson(obj);
    //ppth(thread);
    //pptr(tread);
    //pptp(tie_up);
}
