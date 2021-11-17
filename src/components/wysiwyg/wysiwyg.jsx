import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class Wysiwyg extends Component {
    static propTypes = {
        defaultValue : PropTypes.string
    }

    state = {
        editorState: EditorState.createEmpty(),
    }

    constructor(props) {
        super(props)
        const html = this.props.defaultValue
        if(html) {
            const contentBlock = htmlToDraft(html)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = { editorState, }
        }else {
            this.state = { editorState: EditorState.createEmpty(), }
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    getSetDetail = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
            <Editor
                editorState={editorState}
                editorStyle={{border : '2px solid', borderColor: '#d0021b', height:'250px'}}
                onEditorStateChange={this.onEditorStateChange}
            />
            </div>
        );
    }
}