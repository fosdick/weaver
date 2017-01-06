var drawDown = (function() {
    return {
        offset : [0,0],
        col : 0,
        cnt2 : 0,
        p : document.getElementById("content"),
        weave_width:40,
        weave_height:40,
        fill: "#212121",
        fillBoth: false,
        setupSvg : function() {
            if (this.svg) {
                this.svg.parentNode.removeChild(this.svg)
            }
            var params = {};
            var xmlns="http://www.w3.org/2000/svg"
            var svg = document.createElementNS(xmlns,'svg');
            svg.style.height = (72*11) + "px";
            svg.style.width = (72*8.5) + "px";
            var params = {
            	'fill' : '#fff'
                ,'fill-opacity' : 0.5
            	,'stroke' : '#da2424'
            	,'x' : 0
            	,'y' : 0
                ,'height' : this.weave_width
                ,'width' : this.weave_height
            	,'class' : ""
            }
            this.xmlns = xmlns;
            this.p.appendChild(svg);
            this.params = params;
            this.svg = svg;
        },
        _append: function(c) {
            this.svg.appendChild(c);
        },
        _rec: function(attrs) {
        	var c = document.createElementNS(this.xmlns,"rect")
        	for (var a in attrs) {
        		c.setAttributeNS(null, a,attrs[a]);
        	}
        	return c;
        },
        insert_col_num: function(i) {
        	var c = document.createElementNS(this.xmlns,"circle");
            this.legend_circ_attrs = {
                cx : (this.weave_width * i) + this.weave_width + (this.weave_width / 2),
                cy : this.weave_width / 2,
                r : this.weave_width * 0.35,
                fill: 'none',
                stroke: '#333',
            }
            var attrs = this.legend_circ_attrs;
        	for (var a in attrs) {
        		c.setAttributeNS(null, a,attrs[a]);
        	}
        	this._append(c);
            var t = document.createElementNS(this.xmlns,"text");

            var attrs = {
                x : (this.weave_width * i) + this.weave_width + (this.weave_width / 2),
                y : this.weave_width / 2,
                'font-size' : (this.weave_width * .3)+'px',
                stroke: '#333',
                'text-anchor': 'middle'
            }

        	for (var a in attrs) {
        		t.setAttributeNS(null, a,attrs[a]);
        	}
            i++;
            var textNode = document.createTextNode(i);
            t.appendChild(textNode);
            this._append(t);
        },
        insert_row_num: function(i) {
        	var c = document.createElementNS(this.xmlns,"circle");
            this.legend_circ_attrs = {
                cy : (this.weave_height * i) + this.weave_height + (this.weave_height / 2),
                cx : this.weave_height / 2,
                r : this.weave_height * 0.35,
                fill: 'none',
                stroke: '#333',
            }
            var attrs = this.legend_circ_attrs;
        	for (var a in attrs) {
        		c.setAttributeNS(null, a,attrs[a]);
        	}
        	this._append(c);
            var t = document.createElementNS(this.xmlns,"text");
            var attrs = {
                y : (this.weave_height * i) + this.weave_height + (this.weave_height / 2),
                x : this.weave_height / 2,
                'font-size' : (this.weave_height * .3)+'px',
                stroke: '#333',
                'text-anchor': 'middle'
            }
        	for (var a in attrs) {
        		t.setAttributeNS(null, a,attrs[a]);
        	}
            i++;
            var textNode = document.createTextNode(i);
            t.appendChild(textNode);
            this._append(t);
        },
        ins_p_block: function(x,y) {
            x = ++x, y=++y;
            y = y + this.offset[1];
            var params = this.params;
            params['fill'] = "#fff",
            params.x = (this.weave_width*x) + this.offset[0];
            params.y = (this.weave_height*y);
            this._append(this._rec(params));
        },
        ins_p_block_solid: function(x,y) {
            x = ++x, y=++y;
            y = y + this.offset[1];
            var params = this.params;
            params.fill = "#333";
            params['fill-opacity'] = .5;
            params.x = (this.weave_width*x) + this.offset[0];
            params.y = (this.weave_height*y);
            this._append(this._rec(params));
        },
        row_places : function(tieup, thread_list) {
            var cnt = 0,row_list = [];
            for (x in thread_list) {
             if (tieup && tieup.indexOf(thread_list[x]) > -1) {
                             row_list.push(cnt);
                    }
              cnt++;
            }
            return row_list;
        },
        not_row_places: function (tieup, thread_list) {
            var cnt = 0,nrow_list = [];

            for (x in thread_list) {
             if (tieup && tieup.indexOf(thread_list[x]) < 0) {
                             nrow_list.push(cnt);
                    }
              cnt++;
            }
            return nrow_list;
        },
        legend: function() {
            for (var i in this.tread) {

                this.insert_col_num(i);
            }
            for (var i in this.tread) {
                //console.log("should see i for rows" , i)
                this.insert_row_num(i);
            }
        },
        draw: function() {
            var tread = this.tread
            , thread = this.thread
            , tie_up = this.tie_up
            , col = 0, cnt2 = 0;

            for (var i in tread) {
                var row = this.row_places(tie_up[tread[i]-1], thread);

                    for (var j in row) {

                      this.ins_p_block_solid(row[j],col);//type 1
                      // if (wrap_colors[row[j]] == 0) {
                      //   ins_p_block(row[j], col);//type 1
                      // }
                      // if (wrap_colors[row[j]] == 1) {
                      //   ins_p_block_solid(row[j],col);//type 1
                      // }
                    }
                if (this.fillBoth) {
                    var nrow = this.not_row_places(tie_up[tread[i]-1], thread);
                    for (var j in nrow) {

                        this.ins_p_block(nrow[j], col);

                      // if (weft_colors[cnt2] == 0) {
                      //   ins_p_block(row[j], col);//type 1
                      // }
                      // if (weft_colors[cnt2] == 1) {
                      //   ins_p_block_solid(row[j], col);//type 1
                      // }
                    //get tread #
                    }
                }
                col++;
                cnt2++;
            }
        }
    }
});
