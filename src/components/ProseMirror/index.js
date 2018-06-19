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
import { exampleSetup, buildMenuItems } from "./prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { xalgo } from './modes';
import CodeBlockView from './CodeBlockView';
import 'codemirror/addon/mode/simple';

import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
import 'prosemirror-view/style/prosemirror.css';
import './prosemirror-example-setup/style/style.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import './index.css';

import { MenuItem, Dropdown } from 'prosemirror-menu';


import {addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell, deleteTable} from "prosemirror-tables"
import {tableNodes, fixTables}  from "prosemirror-tables"
import "prosemirror-tables/style/tables.css"


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

function createTableMenu(schema) {
  let menu = buildMenuItems(schema).fullMenu;

  function item(label, cmd) {
    return new MenuItem({label, select: cmd, run: cmd});
  }

  let tableMenu = [
    item("Insert column before", addColumnBefore),
    item("Insert column after", addColumnAfter),
    item("Delete column", deleteColumn),
    item("Insert row before", addRowBefore),
    item("Insert row after", addRowAfter),
    item("Delete row", deleteRow),
    item("Delete table", deleteTable),
    item("Merge cells", mergeCells),
    item("Split cell", splitCell),
    item("Toggle header column", toggleHeaderColumn),
    item("Toggle header row", toggleHeaderRow),
    item("Toggle header cells", toggleHeaderCell),
    item("Make cell green", setCellAttr("background", "#dfd")),
    item("Make cell not-green", setCellAttr("background", null))
  ]
  menu.splice(2, 0, [new Dropdown(tableMenu, {label: "Table"})]);

  return menu;
}

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

          <table>
            <tbody>
            <tr><th colSpan={3} data-colwidth="100,0,0">Wide header</th></tr>
            <tr><td>One</td><td>Two</td><td>Three</td></tr>
            <tr><td>Four</td><td>Five</td><td>Six</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const baseNodes = baseSchema.spec.nodes;

    let schema = new Schema({
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

    const { current } = this.editorContainer;
    const editor = current.getElementsByClassName('editor')[0];
    const content = current.getElementsByClassName('content')[0];

    const menu = createTableMenu(schema);

    let state = EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(content),
      plugins: exampleSetup({schema: schema, menuContent: menu}).concat(arrowHandlers),
    });
    let fix = fixTables(state)
    if (fix) state = state.apply(fix.setMeta("addToHistory", false))

    this.editorView = new EditorView(editor, {
      state,
      nodeViews: {code_block: function (node, view, getPos) { return new CodeBlockView(node, view, getPos); }}
    });

    document.execCommand("enableObjectResizing", false, false)
    document.execCommand("enableInlineTableEditing", false, false)
  }
}

ProseMirror.propTypes = {
  rule: PropTypes.string,
};

export default ProseMirror
