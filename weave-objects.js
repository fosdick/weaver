var weavePatterns = function() {

    this.set_dd = function(dd) {
        this.dd = dd;
    };
    this.drawCurrentPattern = function(dd) {
        dd = dd || this.dd;
        dd.thread = this.currentThread;
        dd.tread = this.currentTread;
        dd.tie_up = this.currentTie_up;
        dd.setupSvg();
        dd.draw();
        dd.legend();
    };
    this.setCurrentTTT = function(obj) {
        this.currentThread = obj.thread;
        this.currentTread = obj.tread;
        this.currentTie_up = obj.tie_up;
    };
    this.setCurrentAttrs = function(obj){
        for (var x in obj) {
            this.dd[x] = obj[x];
        }
    }
    this.setCurrentPattern = function(pattern) {
        if (this.patterns[pattern]) {
            var p = this.patterns[pattern]();
            this.setCurrentTTT(p);
            if (p.attrs) {
                this.setCurrentAttrs(p.attrs);
            }
        }
    };
    var down_draft = this.dd;
    this.patterns = {
        posseltsFig35 : function() {
            ////http://www.handweaving.net/draft-detail/58075/page-1-figure-35-posselts-textile-journal-march-1911-united-states-1907-1915
            return {
                thread : [1, 2, 3, 4, 1, 2, 3, 4],
                tread : [4,3,2,1,4,3,2,1],
                tie_up : [[1], [1, 3], [4],[2, 4]]
            };
        },
        posseltsFig37 : function() {
            ////http://www.handweaving.net/draft-detail/58077/page-1-figure-37-posselts-textile-journal-march-1911-united-states-1907-1915
            var o = {
                thread : [1, 2, 3, 4, 1, 2, 3, 4],
                tread : [4,3,2,4,4,3,2,4],
                tie_up : [[1,2], [1, 3], [3,4],[2, 4]]
            };
            o.thread = o.thread.concat (o.thread, o.thread, o.thread);
            o.tread = o.tread.concat (o.tread, o.tread, o.tread);
            return o;
        },
        posseltsFig18: function() {
            ////http://www.handweaving.net/draft-detail/53101/page-179-figure-18-posselts-textile-journal-february-1908-no-2-united-states-1907-1915
            var o = {
                thread : [1, 2, 3, 4, 1, 5, 6, 4],
                tread : [6,5,4,3,6,2,1,3],
                tie_up : [[1,2,5], [1,2,3,4], [1,5,6],[4,5,6],[3,4,6], [2,3,4]]
            };
            o.thread = o.thread.concat (o.thread, o.thread);
            o.tread = o.tread.concat (o.tread, o.tread);
            return o;
        },
        posseltsFig40: function() {
            ////http://www.handweaving.net/draft-detail/58081/page-1-figure-40-posselts-textile-journal-march-1911-united-states-1907-1915
            var o = {
                thread : [1, 2, 3, 4],
                tread : [4,3,2,3],
                tie_up : [[1,2], [1,4], [3,4],[2,3]]
            };
            o.thread = o.thread.concat (o.thread, o.thread,o.thread, o.thread,o.thread, o.thread);
            o.tread = o.tread.concat (o.tread, o.tread,o.tread, o.tread,o.tread, o.tread);
            o.attrs = {}
            o.attrs.weave_width = 20;
            o.attrs.weave_height = 20;
            return o;
        },
        posseltsFig41: function() {
            ////http://www.handweaving.net/draft-detail/58082/page-1-figure-41-posselts-textile-journal-march-1911-united-states-1907-1915
            var o = {
                thread : [1, 2, 3, 4],
                tread : [6,5,4,3,2,1],
                tie_up : [[1,2], [1,2,3], [2,3],[1,4],[1,3,4],[3,4]]
            };
            o.thread = o.thread.concat (o.thread, o.thread,o.thread, o.thread,o.thread, o.thread);
            o.tread = o.tread.concat (o.tread, o.tread,o.tread, o.tread,o.tread, o.tread);
            o.attrs = {}
            o.attrs.weave_width = 20;
            o.attrs.weave_height = 20;
            return o;
        },
        posseltsFig46: function() {
            //http://www.handweaving.net/draft-detail/58087/page-1-figure-46-posselts-textile-journal-march-1911-united-states-1907-1915
            var o = {
                thread : [1, 2, 3, 2],
                tread : [3,2,3,1],
                tie_up : [[1,2], [1,3], [2,3]]
            };
            o.thread = o.thread.concat (o.thread, o.thread,o.thread, o.thread,o.thread, o.thread);
            o.tread = o.tread.concat (o.tread, o.tread,o.tread, o.tread,o.tread, o.tread);
            o.attrs = {}
            o.attrs.weave_width = 20;
            o.attrs.weave_height = 20;
            return o;
        },
        ss1: function() {
            //based on signature sequence of sqrt of 2.
            //inspired form here: http://www.cs.arizona.edu/patterns/weaving/webdocs/mo/H/SignatureSequences.pdf
            var o = {
                thread : [2,3,2,4,3,2,5,4,3,6,2,5,4,7,3,6,2,5,8,4,7,3,6,1,2,5,8,4,7,2,3,6,1,2,5,8,3,4,7,2,3,6,1,2,4,5,8,3,4,7,2,3,5,6,1,2,4,5,8,3,4,6,7,2,3,5,6,1,2,4,5,7,8,3,4,6,7,2,3,5,6,8,1,2,4,5,7,8,3,4,6,7,1,2,3,5,6,8,1,2],
                tread : [7,6,7,5,6,7,4,5,6,3,7,4,5,2,6,3,7,4,1,5,2,6,3,8,7,4,1,5,2,7,6,3,8,7,4,1,6,5,2,7,6,3,8,7,5,4,1,6,5,2,7,6,4,3,8,7,5,4,1,6,5,3,2,7,6,4,3,8,7,5,4,2,1,6,5,3,2,7,6,4,3,1,8,7,5,4,2,1,6,5,3,2,8,7,6,4,3,1,8,7],
                tie_up : [[3,4,7,8], [2,3,6,7], [1,2,5,6], [8,1,4,5], [7,8,3,4], [6,7,2,3], [5,6,1,2], [4,5,8,1]]
            };
            o.attrs = {}
            o.thread = o.thread.splice(0,40);
            o.tread = o.tread.splice(0,40);
            o.attrs.weave_width = 15.3;
            o.attrs.weave_height = 15.3;
            return o;
        },
        mth1: function() {
            //Morse Thue.
            //inspired form here: http://www.cs.arizona.edu/patterns/weaving/webdocs/mo/H/SignatureSequences.pdf
            var o = {
                thread : [1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,1,2,2,1],
                tread : [2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,1,2,2,1,2,1,1,2,2,1,1,2,1,2,2,1,2,1,1,2,1,2,2,1,1,2,2,1,2,1,1,2,2,1,1,2],
                tie_up : [[2],[1]]
            };
            o.thread = o.thread.splice(0,40);
            o.tread = o.tread.splice(0,40);
            o.attrs = {}
            o.attrs.weave_width = 15;
            o.attrs.weave_height = 15;
            return o;
        },
        ss2: function() {
            //based on signature sequence of sqrt of 2.
            //ss2 differs from ss1 by the array splice
            //inspired form here: http://www.cs.arizona.edu/patterns/weaving/webdocs/mo/H/SignatureSequences.pdf
            var o = {
                thread : [2,3,2,4,3,2,5,4,3,6,2,5,4,7,3,6,2,5,8,4,7,3,6,1,2,5,8,4,7,2,3,6,1,2,5,8,3,4,7,2,3,6,1,2,4,5,8,3,4,7,2,3,5,6,1,2,4,5,8,3,4,6,7,2,3,5,6,1,2,4,5,7,8,3,4,6,7,2,3,5,6,8,1,2,4,5,7,8,3,4,6,7,1,2,3,5,6,8,1,2],
                tread : [7,6,7,5,6,7,4,5,6,3,7,4,5,2,6,3,7,4,1,5,2,6,3,8,7,4,1,5,2,7,6,3,8,7,4,1,6,5,2,7,6,3,8,7,5,4,1,6,5,2,7,6,4,3,8,7,5,4,1,6,5,3,2,7,6,4,3,8,7,5,4,2,1,6,5,3,2,7,6,4,3,1,8,7,5,4,2,1,6,5,3,2,8,7,6,4,3,1,8,7],
                tie_up : [[3,4,7,8], [2,3,6,7], [1,2,5,6], [8,1,4,5], [7,8,3,4], [6,7,2,3], [5,6,1,2], [4,5,8,1]]
            };
            o.attrs = {}
            o.thread = o.thread.splice(60,16);
            o.tread = o.tread.splice(60,16);
            o.attrs.weave_width = 31.3;
            o.attrs.weave_height = 31.3;
            return o;
        },
        ss3: function() {
            //based on signature sequence of sqrt of 2.
            //ss3 differs from ss2 and ss2 as it uses places 100-200 of sqrt of 2, rather than the first 100
            //inspired form here: http://www.cs.arizona.edu/patterns/weaving/webdocs/mo/H/SignatureSequences.pdf
            var o = {
                thread : [4,5,7,8,2,3,4,6,7,1,2,3,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,2,3,4,5,7,8,2,3,4,6,7,1,2,3,4,5,6,8,1,3,4,5,7,8,2,3,4,6,7,1,2,4,5,6,8,1,3,4,5,7,8,2,3,6,7,1,2,4,5,6,8,1,3,4,7,8,2,3,6,7,1,2,4,5,8,1,3,4,7,8],
                tread : [5,4,2,1,7,6,5,3,2,8,7,6,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,7,6,5,4,2,1,7,6,5,3,2,8,7,6,5,4,3,1,8,6,5,4,2,1,7,6,5,3,2,8,7,5,4,3,1,8,6,5,4,2,1,7,6,3,2,8,7,5,4,3,1,8,6,5,2,1,7,6,3,2,8,7,5,4,1,8,6,5,2,1],
                tie_up : [[3,4,7,8], [2,3,6,7], [1,2,5,6], [8,1,4,5], [7,8,3,4], [6,7,2,3], [5,6,1,2], [4,5,8,1]]
            };
            o.attrs = {};
            o.thread = o.thread.splice(60,26);
            o.tread = o.tread.splice(60,26);
            o.attrs.weave_width = 21;
            o.attrs.weave_height = 21;
            return o;
        },
        sqrt3: function() {
            //first 50 or so places of sqrt3 run throught some type of mod % operator
            var o = {
                thread : [8,4,3,1,6,1,1,1,8,6,7,1,1,8,8,3,2,4,6,3,8,5,5,7,4,5,2,6,1,6,1,8,3,4,7,7,2,5,3,1,1,6,3,6,4,1,2,1,4],
                tread : [1,5,6,8,3,8,8,8,1,3,2,8,8,1,1,6,7,5,3,6,1,4,4,2,5,4,7,3,8,3,8,1,6,5,2,2,7,4,6,8,8,3,6,3,5,8,7,8,5],
                tie_up : [[3,4,7,8], [2,3,6,7], [1,2,5,6], [8,1,4,5], [7,8,3,4], [6,7,2,3], [5,6,1,2], [4,5,8,1]]
            };
            o.attrs = {};
            //o.thread = o.thread.splice(16,66);
            //o.tread = o.tread.splice(16,66);
            o.attrs.weave_width = 10;
            o.attrs.weave_height = 10;
            return o;
        },
        sqrt5: function() {
            //first 75 or so places of sqrt5 run throught some type of mod % operator
            var o = {
                thread : [3,4,3,1,3,4,2,4,4,1,2,2,4,1,2,3,2,3,1,1,2,2,4,4,3,3,1,4,4,2,3,4,3,3,4,2,1,1,1,3,2,1,4,2,2,3,2,2,2,3,2,4,3,1,3,4,1,1,2,4,3,1,2,1,2,1,2,3,1,2],
                tread : [2,1,2,4,2,1,3,1,1,4,3,3,1,4,3,2,3,2,4,4,3,3,1,1,2,2,4,1,1,3,2,1,2,2,1,3,4,4,4,2,3,4,1,3,3,2,3,3,3,2,3,1,2,4,2,1,4,4,3,1,2,4,3,4,3,4,3,2,4,3],
                tie_up : [[1,3], [4,2], [3,1], [2,4]]
            };
            o.attrs = {};
            // o.thread = o.thread.splice(22,26);
            // o.tread = o.tread.splice(22,26);
            o.attrs.weave_width = 5;
            o.attrs.weave_height = 5;
            return o;
        },
    }
    this.patterns.parent = this;
}
