var d3pie = require('d3pie')
var pie = new d3pie("pieChart", {
  "header": {
    "title": {
      "text": "Responses",
      "fontSize": 22,
      "font": "verdana"
    },
    "subtitle": {
      "color": "#999999",
      "fontSize": 10,
      "font": "verdana"
    },
    "titleSubtitlePadding": 12
  },
  "footer": {
    "color": "#999999",
    "fontSize": 11,
    "font": "open sans",
    "location": "bottom-center"
  },
  "size": {
    "canvasHeight": 400,
    "canvasWidth": 590,
    "pieInnerRadius": "70%",
    "pieOuterRadius": "88%"
  },
  "data": {
    "content": [
      {
        "label": "When's it going to be done?",
        "value": 8,
        "color": "#7e3838"
      },
      {
        "label": "Bennnnn!",
        "value": 5,
        "color": "#7e6538"
      }
    ]
  },
  "labels": {
    "outer": {
      "format": "none",
      "pieDistance": 32
    },
    "inner": {
      "format": "value"
    },
    "mainLabel": {
      "font": "verdana"
    },
    "percentage": {
      "color": "#e1e1e1",
      "font": "verdana",
      "decimalPlaces": 0
    },
    "value": {
      "color": "#e1e1e1",
      "font": "verdana"
    },
    "lines": {
      "enabled": true,
      "color": "#cccccc"
    },
    "truncation": {
      "enabled": true
    }
  },
  "tooltips": {
    "enabled": true,
    "type": "placeholder",
    "string": "{label}: {value}, {percentage}%",
    "styles": {
      "fadeInSpeed": 0,
      "backgroundOpacity": 1
    }
  },
  "effects": {
    "load": {
      "speed": 500
    },
    "pullOutSegmentOnClick": {
      "effect": "elastic",
      "speed": 400,
      "size": 8
    }
  },
});
