import React, { Component } from 'react';

var styles = {
    string: {
		color: '#0e4889',
		cursor: 'default',
	},
	bool: {
		color: '#06624b',
		cursor: 'default',
		fontStyle: 'italic',
	},
	number: {
		color: '#ca000a',
		cursor: 'default',
	},
	date: {
		color: '#009f7b',
		cursor: 'default',
	},
	empty: {
		color: '#999999',
		cursor: 'default',
	},
	array: {
		color: '#666666',
		cursor: 'default',
	},
	object: {
		color: '#0b89b6',
		cursor: 'default',
	},
	comma: {
		color: '#999999',
		cursor: 'default',
	},
}

function transformer (obj, fromRecur, comma) {
    var tag = (fromRecur) ? 'span' : 'div';
    var nextLevel = (fromRecur || 0) + 1;
    var children = [];
    comma = comma ? <span style={styles.comma}>,</span> : null;

    //String
    if (typeof obj === 'string') {
        return React.createElement(tag, { style: styles.string }, `"${obj}"`, comma);
    }
    //Booleans, null and undefined
    else if (typeof obj === 'boolean' || obj === null || obj === undefined) {
        return React.createElement(tag, { style: styles.bool }, String(obj), comma);
    }
    //Numbers
    else if (typeof obj === 'number') {
        return React.createElement(tag, { style: styles.number }, String(obj), comma);
    }
    //Dates
    else if (Object.prototype.toString.call(obj) === '[object Date]') {
        return React.createElement(tag, { style: styles.date }, String(obj), comma);
    }
    //Arrays
    else if (Array.isArray(obj)) {
        if (!obj.length) {
            return React.createElement(tag, { style: styles.empty }, 'Array: []');
        }
        children.push(React.createElement(tag, { key: '__array:open__', style: styles.array }, 'Array: ['));
        for (var i = 0; i < obj.length; i++) {
            children.push(
                <div key={'i' + i} style={{ paddingLeft: '20px' }}>
                    {transformer(obj[i], nextLevel, i < obj.length - 1)}
                </div>
            );
        }
        children.push(React.createElement(tag, { key: '__array:close__', style: styles.array }, ']'));
    }
    //Objects
    else if (obj && typeof obj === 'object') {
        var len = Object.keys(obj).length;
        if (fromRecur && !len) {
            return React.createElement(tag, { style: styles.empty }, 'Object: {}');
        }
        if (fromRecur) {
            children.push(
                React.createElement(tag, { key: '__object:open__', style: styles.object }, 'Object: {')
            );
        }
        for (var key in obj) {
            if (typeof obj[key] !== 'function') {
                children.push(
                    <div key={key} style={{ paddingLeft: fromRecur ? '20px' : '0px' }}>
                        <span style={{ paddingRight: '5px', cursor: 'default' }}>{key}:</span>
                        {transformer(obj[key], nextLevel)}
                    </div>
                );
            }
        }
        if (fromRecur) {
            children.push(
                React.createElement(tag, { key: '__object:close__', style: styles.object}, '}')
            );
        }
    }
    return <div>{children}{comma}</div>
}

class JSONFormatter extends Component {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                {transformer(this.props.data)}
            </div>
        )
    }
}

export default JSONFormatter;