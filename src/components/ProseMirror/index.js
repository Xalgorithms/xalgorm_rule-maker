// Copyright 2018 Hayk Pilosyan <hayk.pilos@gmail.com>
// This file is part of Xalgo Authoring UI, a functional component of an
// Internet of Rules (IoR)
// ACKNOWLEDGEMENTS
// Funds: Xalgorithms Foundation
// Collaborators: Don Kelly, Joseph Potvin and Bill Olders.
// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License. You may
// obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import { EditorState, Selection } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema as baseSchema } from "prosemirror-schema-basic";
import {tableNodes}  from "prosemirror-tables"
import { exampleSetup } from "./prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import Button from '@material-ui/core/Button';
import { xalgo } from './modes';
import CodeBlockView from './CodeBlockView';
import 'codemirror/addon/mode/simple';

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import 'prosemirror-view/style/prosemirror.css';
import './prosemirror-example-setup/index.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import "prosemirror-tables/style/tables.css"
import './index.css';


function arrowHandler(dir) {
  return (state, dispatch, view) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      let side = dir === "left" || dir === "up" ? -1 : 1, $head = state.selection.$head;
      let nextPos = Selection.near(state.doc.resolve(side > 0 ? $head.after() : $head.before()), side);
      if (nextPos.$head && nextPos.$head.parent.type.name === "code_block") {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  }
}

const arrowHandlers = keymap({
  ArrowLeft: arrowHandler("left"),
  ArrowRight: arrowHandler("right"),
  ArrowUp: arrowHandler("up"),
  ArrowDown: arrowHandler("down"),
});

class ProseMirror extends Component {
  constructor(props) {
    super(props);

    CodeMirror.defineSimpleMode("xalgo", xalgo);

    this.editorView = null;
    this.editorContainer = React.createRef();

    this.handleSave = this.handleSave.bind(this);
    this.createEditorView = this.createEditorView.bind(this);

    // Define schema with custom code editor(CodeMirror) and table editing
    const baseNodes = baseSchema.spec.nodes;
    this.schema = new Schema({
      nodes: baseNodes
      .update(
        'code_block',
        Object.assign({}, baseNodes.get('code_block'), {isolating: true})
      )
      .append(tableNodes({
        tableGroup: "block",
        cellContent: "block+",
        cellAttributes: {
          background: {
            default: null,
            getFromDOM(dom) { return dom.style.backgroundColor || null },
            setDOMAttr(value, attrs) { if (value) attrs.style = (attrs.style || "") + `background-color: ${value};` }
          }
        }
      })),
      marks: baseSchema.spec.marks
    })
  }

  render() {
    return (
      <div>
        <div className="code_editor" ref={this.editorContainer}>
          <div className="editor"></div>
          <div className="content" style={{display: 'none'}}></div>
        </div>
        <Button variant="raised" color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }

  handleSave() {
    this.props.onSave(this.editorView.state.toJSON());
  }

  createEditorView() {
    const { current } = this.editorContainer;
    const { editorStateJson } = this.props;
    const { schema } = this;
    const editor = current.getElementsByClassName('editor')[0];
    const content = current.getElementsByClassName('content')[0];

    const plugins = exampleSetup({schema}).concat(arrowHandlers);

    let editorState = null;
    // Check if initial state is provided
    if (!Object.keys(editorStateJson).length) {
      editorState = EditorState.create({
        doc: DOMParser.fromSchema(schema).parse(content),
        plugins,
      });
    } else {
      editorState = EditorState.fromJSON({
        schema,
        plugins
      }, editorStateJson);
    }

    this.editorView = new EditorView(editor, {
      state: editorState,
      nodeViews: {code_block: function (node, view, getPos) { return new CodeBlockView(node, view, getPos); }}
    });
  }

  componentDidUpdate() {
    this.createEditorView();
  }
}

ProseMirror.propTypes = {
  editorStateJson: PropTypes.object,
  onSave: PropTypes.func,
};

export default ProseMirror
