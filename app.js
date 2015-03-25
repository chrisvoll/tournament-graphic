var animationSpeed = 200;
var teamColors = {'kentucky':'084D92','hampton':'00216E','cincinnati':'DC251D','purdue':'D4A10E','w-virginia':'E9A611','buffalo':'003399','maryland':'E03A3E','valparaiso':'613318','butler':'010066','texas':'D26B20','notre-dame':'002B5B','northeastern':'CC0000','wichita-st':'FEC02D','indiana':'AA2D3F','kansas':'0018A8','new-mexico-st':'882345','wisconsin':'CC1122','coastal-carolina':'007E84','oregon':'004A00','oklahoma-st':'F3791F','arkansas':'C41E3A','wofford':'CFB53B','north-carolina':'94C2E4','harvard':'DC143C','xavier':'00295D','mississippi':'002B7F','baylor':'004834','georgia-st':'003399','vcu':'000000','ohio-st':'B31021','arizona':'CC0033','texas-southern':'800000','villanova':'003E7E','lafayette':'E34234','nc-state':'E00000','lsu':'461D7C','uni':'660099','wyoming':'492F24','louisville':'DF1926','uc-irvine':'002244','providence':'000000','dayton':'DF1E36','oklahoma':'A81E2E','albany':'452663','michigan-st':'016A42','georgia':'FF0000','virginia':'F36127','belmont':'002469','duke':'034FA3','robert-morris':'14234B','san-diego-st':'C70C2B','st-johns':'D31045','utah':'CC0000','stephen-f-austin':'330066','georgetown':'002147','e-washington':'A10022','smu':'B10000','ucla':'0073CF','iowa-st':'CC0000','uab':'1E6B52','iowa':'000000','davidson':'BA0000','gonzaga':'002965','north-dakota-st':'0D5E4B','manhattan':'095234','byu':'002255','north-florida':'031B49','boise-state':'09347A'};

var teams = [
    ['kentucky','hampton','cincinnati','purdue','w-virginia','buffalo','maryland','valparaiso','butler','texas','notre-dame','northeastern','wichita-st','indiana','kansas','new-mexico-st','wisconsin','coastal-carolina','oregon','oklahoma-st','arkansas','wofford','north-carolina','harvard','xavier','mississippi','baylor','georgia-st','vcu','ohio-st','arizona','texas-southern','villanova','lafayette','nc-state','lsu','uni','wyoming','louisville','uc-irvine','providence','dayton','oklahoma','albany','michigan-st','georgia','virginia','belmont','duke','robert-morris','san-diego-st','st-johns','utah','stephen-f-austin','georgetown','e-washington','smu','ucla','iowa-st','uab','iowa','davidson','gonzaga','north-dakota-st'],
    ['kentucky', 'cincinnati', 'w-virginia', 'maryland', 'butler', 'notre-dame', 'wichita-st', 'kansas', 'wisconsin', 'oregon', 'arkansas', 'north-carolina', 'xavier', 'georgia-st', 'ohio-st', 'arizona', 'villanova', 'nc-state', 'uni', 'louisville', 'dayton', 'oklahoma', 'michigan-st', 'virginia', 'duke', 'san-diego-st', 'utah', 'georgetown', 'ucla', 'uab', 'iowa', 'gonzaga'],

    ['kentucky', 'w-virginia', 'notre-dame', 'wichita-st', 'wisconsin', 'north-carolina', 'xavier', 'arizona', 'nc-state', 'louisville', 'oklahoma', 'michigan-st', 'duke', 'utah', 'ucla', 'gonzaga'],


    // actual known data as of writing this
    // uncomment it to see graphic with real data
    //[], [], [], []]; /*

    // test seed data
    ['kentucky', 'notre-dame', 'wisconsin', 'arizona', 'louisville', 'oklahoma', 'duke', 'gonzaga'],
    ['kentucky', 'wisconsin', 'oklahoma', 'duke'],
    ['kentucky', 'duke'],
    ['kentucky']
];// */

var App = React.createClass({
    getInitialState: function() {
        var sortByColor = true;
        return {
            rounds: this.getRounds(sortByColor),
            hover: false,
            active: false,
            mouseLeaveTimer: null,
            sortByColor: sortByColor
        };
    },

    getRounds: function(sortByColor) {
        this.colors = this.sortColors(teamColors, sortByColor);
        var response = [];
        for (i in teams) {
            response.push(this.filter(teams[i]));
        }
        return response;
    },

    filter: function(teams) {
        var response = [];
        var c = this.colors;
        for (i in c) {
            if (teams.indexOf(c[i].slug) != -1) response.push(c[i]);
        }
        return response;
    },

    handleMouseEnter: function(slug) {
        clearTimeout(this.state.mouseLeaveTimer);
        if (slug == false) {
            var that = this;
            this.state.mouseLeaveTimer = setTimeout(function() {
                that.setState({
                    hover: false
                });
            }, 200);
        } else {
            this.setState({ hover: slug });
        }
    },
    handleMouseDown: function(slug) {
        if (typeof slug !== 'string') slug = false;
        // example click handler:
        // if (this.state.hover && this.state.hover == this.state.active) {
        //     console.log('click', this.state.active);
        // }
        this.setState({ active: slug });
    },

    changeSort: function() {
        this.setState({
            sortByColor: !this.state.sortByColor,
        });
        this.setState({
            rounds: this.getRounds()
        });
    },

    // credit http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
    sortColors: function(teams, sortByColor) {
        var colors = [];
        for (i in teams) {
            var hex = teams[i],
    
                r = parseInt(hex.substring(0,2),16)/255,
                g = parseInt(hex.substring(2,4),16)/255,
                b = parseInt(hex.substring(4,6),16)/255,
    
                val = Math.max(r,g,b),
                min = Math.min(r,g,b),
    
                chr = val-min,
                hue = -360;
     
            if (r == val) hue =     60*(((g-min)-(b-min))/chr);
            if (g == val) hue = 120+60*(((b-min)-(r-min))/chr); 
            if (b == val) hue = 240+60*(((r-min)-(g-min))/chr); 
            if (!hue && hue !== 0) hue = 210.5; // adjust for #000000
            colors.push({
                name: i.replace(/-/g, ' '),
                slug: i,
                hex: teams[i],
                hue: hue
            });
        }
        if (this.state && this.state.sortByColor)
            sortByColor = this.state.sortByColor;

        if (sortByColor == false) {
            return colors;
        } else {
            return colors.sort(function(a,b) {
                return b.hue - a.hue;
            });
        }
    },

    render: function() {
        var that = this;
        var rounds = this.state.rounds.map(function(el, i) {
            return <Round
                key   = {i}
                state = {that.state}
                teams = {el}
                handleMouseEnter = {that.handleMouseEnter}
                handleMouseDown  = {that.handleMouseDown} />;
        });
        return <div className="container" onMouseUp={this.handleMouseDown}>
                {rounds}
                <Canvas state={this.state} />
            </div>;

    }
});

var Round = React.createClass({
    render: function() {
        var that = this;
        var teams = this.props.teams.map(function(el, i) {
            return <Team
                key   = {i}
                state = {that.props.state}
                slug  = {el.slug}
                name  = {el.name}
                hex   = {el.hex}
                handleMouseEnter={that.props.handleMouseEnter}
                handleMouseDown={that.props.handleMouseDown} />;
        });
        return <div className="round">
                {teams}
            </div>
    }
});

var Team = React.createClass({
    handleMouseEnter: function(e) {
        this.props.handleMouseEnter(this.props.slug);
    },
    handleMouseLeave: function(e) {
        this.props.handleMouseEnter(false);
    },
    handleMouseDown: function(e) {
        this.props.handleMouseDown(this.props.slug);
    },
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'team'   : true,
            'hover'  : this.props.slug == this.props.state.hover,
            'active' : this.props.slug == this.props.state.active
        });
        classes += ' ' + this.props.slug;
        var style = { backgroundColor: '#' + this.props.hex };

        return <div
                className={classes}
                style={style}
                onMouseEnter = {this.handleMouseEnter}
                onMouseLeave = {this.handleMouseLeave}
                onMouseDown  = {this.handleMouseDown}
                data-slug    = {this.props.slug}>
                <div className="name-container">
                    <div className="name">{this.props.name}</div>
                </div>
            </div>;
    }
});

var Canvas = React.createClass({
    getInitialState: function() {
        return {
            animationTimer: null,
            animating: false
        }
    },

    componentDidMount: function() {
        this.initCanvas();
        this.renderCanvas();
        var that = this;
        $(window).on('resize', function() {
            that.rescaleCanvas();
            that.renderCanvas();
        });
    },

    componentDidUpdate: function() {
        this.startAnimating();
    },
    
    initCanvas: function() {
        this.pairs = this.cachePairs();
        this.canvas = this.refs.canvas.getDOMNode();
        this.ctx = this.canvas.getContext('2d');
        this.rescaleCanvas();
    },

    startAnimating: function() {
        clearTimeout(this.state.animationTimer);
        this.state.animating = true;
        window.requestAnimationFrame(this.animate);
        this.state.animationTimer = setTimeout(this.stopAnimating, animationSpeed);
    },

    stopAnimating: function() {
        this.state.animating = false;
    },

    animate: function() {
        if (!this.state.animating) return;
        this.renderCanvas();
        window.requestAnimationFrame(this.animate);
    },

    cachePairs: function() {
        var pairs = [];
        var that = this;
        $('.round').each(function() {
            var $nextRound = $(this).next();
            if (!$nextRound.length) return;
            $(this).find('.team').each(function() {
                var slug = $(this).attr('data-slug');
                var $next = $nextRound.find('.' + slug);
                if (!$next.length) {
                    $(this).addClass('loser');
                    return;
                }
                pairs.push({
                    start : this,
                    end   : $next[0],
                    slug  : slug,
                    color : that.darken(teamColors[slug])
                });
            });
        });
        return pairs;
    },

    darken: function(hex) {
        var r = this.addToColor(hex.substring(0,2), -30),
            g = this.addToColor(hex.substring(2,4), -30),
            b = this.addToColor(hex.substring(4,6), -30);
        return [r,g,b].join('');
    },

    addToColor: function(rgb, value) {
        rgb = parseInt(rgb, 16) + value;
        if (rgb < 0)   rgb = 0;
        if (rgb > 255) rgb = 255;
        rgb = rgb.toString(16);
        if (rgb.length == 1) rgb = '0' + rgb;
        return rgb;
    },

    rescaleCanvas: function() {
        this.$container = $('.container');
        var w = this.$container.width();
        var h = this.$container.height();
        this.canvas.width  = w * 2;
        this.canvas.height = h * 2;
        this.canvas.style.width  = w + 'px';
        this.canvas.style.height = h + 'px';
        this.ctx.scale(2, 2);
    },

    renderCanvas: function() {
        var that = this;
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.pairs.map(function(el, i) {
            that.drawPolygon(
                el.start.getBoundingClientRect(),
                el.end.getBoundingClientRect(),
                el.color
            );
        });

    },

    drawPolygon: function(a, b, color) {
        this.ctx.beginPath();
        var offset = this.$container[0].getBoundingClientRect();
        var x = offset.left;
        var y = offset.top;
        this.ctx.moveTo( a.left  -x, Math.floor(a.bottom) -y );
        this.ctx.lineTo( a.right -x, Math.floor(a.bottom) -y );
        this.ctx.lineTo( b.right -x, Math.ceil(b.top)     -y );
        this.ctx.lineTo( b.left  -x, Math.ceil(b.top)     -y );
        this.ctx.fillStyle = '#' + color;
        this.ctx.fill();
        this.ctx.closePath();
    },

    render: function() {
        return <canvas className="canvas" ref="canvas"></canvas>;
    }
});

App.start = function () {
    React.render(<App/>, document.body);
};

App.start();
