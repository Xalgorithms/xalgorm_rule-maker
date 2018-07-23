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
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

import ProseMirror from '../ProseMirror';
import { fetchEditorState, saveEditorState } from '../../actions';

class PackageEditor extends Component {
  render() {
    const { editorState } = this.props;

    return (
      <div>
        <ProseMirror editorStateJson={editorState} onSave={this.handleSaveEditorState()}></ProseMirror>
      </div>
    );
  }

  componentDidMount() {
    const { match: { params: { owner, repo, name } } } = this.props;

    this.props.fetchEditorState(owner, repo, name);
  }

  handleSaveEditorState = () => {
    const { match: { params: { name: id, owner, repo } } } = this.props;

    return (payload) => {
      this.props.saveEditorState(owner, repo, id, payload);
    }
  }
}

PackageEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  saveEditorState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { editorState } = state;

  return { editorState };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEditorState: (owner, repo, id) => dispatch(fetchEditorState(owner, repo, id)),
    saveEditorState: (owner, repo, id, payload) => dispatch(saveEditorState(owner, repo, id, payload)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PackageEditor);
