import React from "react";
import PropTypes from "prop-types";

import _ from "underscore";
import { AuditParametersInput } from "./AuditParameters.styled";

const DEBOUNCE_PERIOD = 300;

const propTypes = {
  parameters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ),
  children: PropTypes.func,
};

export default class AuditParameters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      committedValues: {},
    };
  }

  changeValue = (key, value) => {
    this.setState({
      inputValues: { ...this.state.inputValues, [key]: value },
    });
    this.commitValueDebounced(key, value);
  };

  commitValueDebounced = _.debounce((key, value) => {
    this.setState({
      committedValues: { ...this.state.committedValues, [key]: value },
    });
  }, DEBOUNCE_PERIOD);

  render() {
    const { parameters, children } = this.props;
    const { inputValues, committedValues } = this.state;
    return (
      <div>
        <div className="pt4">
          {parameters.map(({ key, placeholder, icon }) => (
            <AuditParametersInput
              key={key}
              type="text"
              value={inputValues[key] || ""}
              placeholder={placeholder}
              onChange={value => {
                this.changeValue(key, value);
              }}
              icon={icon}
            />
          ))}
        </div>
        {children && children(committedValues)}
      </div>
    );
  }
}

AuditParameters.propTypes = propTypes;
