var drawDown = (function() {
    return {
        offset : [0,0],
        col : 0,
        cnt2 : 0,
        p : document.getElementById("content"),
        weave_width:40,
        weave_height:40,
        fill: "#212121",
        setupSvg : function() {
            var params = {};
            var xmlns="http://www.w3.org/2000/svg"
            var svg = document.createElementNS(xmlns,'svg');
            svg.style.height = "2000px";
            svg.style.width = "2000px";
            var params = {
            	'fill' : '#fff'
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
        ins_p_block: function(x,y) {
            x = ++x, y=++y;
            y = y + this.offset[1];
            var params = this.params;
            params.x = (this.weave_width*x) + this.offset[0];
            params.y = (this.weave_height*y);
            params.fill = this.fill;
            this._append(this._rec(params));
        },
        ins_p_block_solid: function(x,y) {
            x = ++x, y=++y;
            y = y + this.offset[1];
            var params = this.params;
            params.x = (this.weave_width*x) + this.offset[0];
            params.y = (this.weave_height*y);
            params.fill = this.fill;
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
            var cnt = 0,row_list = [];

            for (x in thread_list) {
             if (tieup && tieup.indexOf(thread_list[x]) < 0) {
                             row_list.push(cnt);
                    }
              cnt++;
            }
            return row_list;
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
                var nrow = this.not_row_places(tie_up[tread[i]-1], thread);
                for (var j in nrow) {
                  this.ins_p_block(row[j], col);//type 1
                  // if (weft_colors[cnt2] == 0) {
                  //   ins_p_block(row[j], col);//type 1
                  // }
                  // if (weft_colors[cnt2] == 1) {
                  //   ins_p_block_solid(row[j], col);//type 1
                  // }
                //get tread #
                }
                col++;
                cnt2++;
            }
        }
    }
});
