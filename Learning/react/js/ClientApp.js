import React from 'react';
import ReactDOM from 'react-dom';
import MyTitle from './MyTitle';

var div = React.DOM.div;

var MyTitleFactory = React.createFactory(MyTitle)

var MyFirstComponent = React.createClass({
    render: function () {
        return (
            div(null,
                MyTitleFactory({
                    title: 'I am a title.',
                    color: 'peru'
                }),
                MyTitleFactory({
                    title: 'How about you?',
                    color: 'mediumaquamarine'
                }),
                MyTitleFactory({
                    title: 'Being a title is unlucky.',
                    color: 'rebeccapurple'
                }),
                MyTitleFactory({
                    title: 'So I am gonna leave here.',
                    color: 'darkvioletred'
                })

            )
        )
    }
})

ReactDOM.render(React.createElement(MyFirstComponent), document.getElementById('app'))