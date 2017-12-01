import React from "react";
import Autosuggest from "react-autosuggest";

// AC fields for frequency, dosage and specialComments
class ACField extends React.Component {
  getSuggestions = value => {
    const { list } = this.props;
    return list;
  };

  sectionedSuggestions = list => {
    return [
      {
        title: "common",
        suggestions: list.filter(item => item.count)
      },
      {
        title: "rest",
        suggestions: list.filter(item => !item.count)
      }
    ];
  };
  getSuggestionValue = item => item.val;

  renderSuggestion = item => <div>{item.val}</div>;

  render() {
    const { input: { value, onChange }, label, list } = this.props;
    return (
      <div className="form-group row">
        <label className="col-form-label col-4">{label}</label>
        <div className="col-8">
          <Autosuggest
            multiSection={true}
            suggestions={this.sectionedSuggestions(list)}
            renderSectionTitle={() => <div />}
            getSectionSuggestions={section => section.suggestions}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            onSuggestionsFetchRequested={() => {}}
            onSuggestionsClearRequested={() => {}}
            shouldRenderSuggestions={() => true}
            onSuggestionSelected={(e, { suggestionValue }) =>
              onChange(suggestionValue)}
            inputProps={{
              value,
              onChange
            }}
            theme={{
              container: "react-autosuggest__container",
              containerOpen: "react-autosuggest__container--open",
              input: "form-control",
              inputOpen: "react-autosuggest__input--open",
              inputFocused: "react-autosuggest__input--focused",
              suggestionsContainer: "react-autosuggest__suggestions-container",
              suggestionsContainerOpen:
                "react-autosuggest__suggestions-container--open",
              suggestionsList: "react-autosuggest__suggestions-list",
              suggestion: "react-autosuggest__suggestion",
              suggestionFirst: "react-autosuggest__suggestion--first",
              suggestionHighlighted:
                "react-autosuggest__suggestion--highlighted",
              sectionContainer: "react-autosuggest__section-container",
              sectionContainerFirst:
                "react-autosuggest__section-container--first",
              sectionTitle: "react-autosuggest__section-title"
            }}
          />
        </div>
      </div>
    );
  }
}

export default ACField;
