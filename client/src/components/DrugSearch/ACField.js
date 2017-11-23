import React from "react";
import Autocomplete from "react-autocomplete";

// AC fields for frequency, dosage and specialComments
class ACField extends React.Component {
  constructor(props) {
    super(props);
    const { input: { onChange } } = this.props;
    // console.log(props.list);
    // onChange(props.list[0].count ? props.list[0].val : "");
  }

  renderItems = items => {
    var barPlaced = false;
    return items.map(item => {
      const { count } = item.props.item; // full item is stored in props of item
      if (barPlaced || count > 0) return item;
      else {
        barPlaced = true;
        return [<div className="dropdown-divider" key="divider" />, item];
      }
    });
  };

  render() {
    var menuStyle = {
      borderRadius: "3px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      background: "rgba(255, 255, 255, 0.9)",
      padding: "2px 0",
      fontSize: "90%",
      position: "fixed",
      overflow: "auto",
      maxHeight: "50%", // TODO: don't cheat, let it flow to the bottom
      zIndex: 100
    };
    const { list, label, input: { value, onChange } } = this.props;
    return (
      <div className="form-group row">
        <label className="col-form-label col-4">{label}</label>
        <div className="col-8">
          <Autocomplete
            getItemValue={item => item.val}
            items={list}
            renderMenu={(items, value, style) => (
              <div style={{ ...style, ...menuStyle }}>
                {this.renderItems(items)}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                style={{
                  background: isHighlighted ? "lightgray" : "white"
                }}
                key={item.val}
                item={item}
                className="dropdown-item"
              >
                {item.val}
              </div>
            )}
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
            onSelect={value => onChange(value)}
            renderInput={props => <input {...props} className="form-control" />}
          />
        </div>
      </div>
    );
  }
}

export default ACField;
