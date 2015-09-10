var PSINowApp = React.createClass({
  getInitialState: function() {
    return {
      PSI: ''
    };
  },

  componentWillMount: function() {
    this._getPSI();
  },

  render: function() {
    return (
      <div className="psi-now">
      <PSINowView PSI={this.state.PSI} />
      </div>
    );
  },

  _getPSI: function() {
    $.ajax({
      url: 'http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=781CF461BB6606ADE5BD65643F1781742CC0CF18B719027D',
      method: 'GET',
      dataType: 'xml',
      success: function(res) {
        var data = xml2json(res);
        var PSI = data.channel.item.region[0].record.reading[1]['@attributes'].value;
        this.setState({
          PSI: PSI
        });
      }.bind(this)
    });
  }
});

var PSINowView = React.createClass({

  render: function() {
    var indicatorClass = 'btn btn-positive btn-block btn-outlined';
    if (this.props.PSI >= 100 && this.props.PSI < 150) {
      indicatorClass = 'btn btn-block btn-outlined';
    } else if (this.props.PSI >= 150) {
      indicatorClass = 'btn btn-negative btn-block btn-outlined'
    }
    return (
      <span className={indicatorClass}>{this.props.PSI}</span>
    );
  }

});

React.render(
  <PSINowApp />,
  document.getElementById('content')
);

// Taken from http://davidwalsh.name/convert-xml-json
function xml2json(xml) {
  var obj = {};

  if (xml.nodeType == 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    obj = xml.nodeValue;
  }

  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(obj[nodeName]) == "undefined") {
        obj[nodeName] = xml2json(item);
      } else {
        if (typeof(obj[nodeName].push) == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xml2json(item));
      }
    }
  }
  return obj;
}

