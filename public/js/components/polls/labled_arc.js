
import React from 'react'
import Arc from './arc'

class LabeledArc extends Arc {
  /*
  like an arc component but with a label added
  */ 
    render() {
        let [labelX, labelY] = this.arc.centroid(this.props.data),
            labelTranslate = `translate(${labelX}, ${labelY})`;

        return (
            <g>
                {super.render()}
                <text transform={labelTranslate}
                      textAnchor="middle">
                    {this.props.data.data.label}
                </text>
            </g>
        );
    }
}

export { LabeledArc };
