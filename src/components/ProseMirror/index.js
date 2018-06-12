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
import { schema } from "prosemirror-schema-basic";
import { exampleSetup } from "prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { xalgo } from './modes';
import CodeBlockView from './CodeBlockView';
import 'codemirror/addon/mode/simple';

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-example-setup/style/style.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
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

    this.editorContainer = React.createRef();
    this.editorView = null;
  }
  render() {
    return(
      <div className="code_editor" ref={this.editorContainer}>
        <div className="editor"></div>
        <div className="content" style={{display: 'none'}}>
          <h3>Test Xalgorithms rules</h3>
          <p>Test</p>

          <pre>WHEN aaa:bbb</pre>
          <p>asdnkasndjksankdnsa andlasndsajn</p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const baseNodes = schema.spec.nodes;
    const schema$1 = new Schema({
      nodes: baseNodes.update(
        'code_block',
        Object.assign({}, baseNodes.get('code_block'), {isolating: true})
      ),
      marks: schema.spec.marks
    });

    const {current} = this.editorContainer;
    const editor = current.getElementsByClassName('editor')[0];
    const content = current.getElementsByClassName('content')[0];

    this.editorView = new EditorView(editor, {
      state: EditorState.create({
        doc: DOMParser.fromSchema(schema$1).parse(content),
        plugins: exampleSetup({schema: schema$1}).concat(arrowHandlers),
      }),
      nodeViews: {code_block: function (node, view, getPos) { return new CodeBlockView(node, view, getPos); }}
    });
  }
}

ProseMirror.propTypes = {
  rule: PropTypes.string,
};

export default ProseMirror
