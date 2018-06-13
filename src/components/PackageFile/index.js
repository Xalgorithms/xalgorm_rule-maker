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
import Button from '@material-ui/core/Button';

import ProseMirror from '../ProseMirror';
import { fetchContents, storeContents } from '../../actions';

class PackageFile extends Component {
  constructor(props) {
    super(props);
    this.rules = props.contents;
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  render() {
    const {contents: {file_content}} = this.props;

    return (
      <div>
        <ProseMirror rule={file_content}></ProseMirror>

        <Button variant="raised" color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const path =  new URLSearchParams(search).get('path');

    this.props.fetchContents(path);
  }

  handleChange(editor, data, value) {
    this.rules = value;
  }

  handleSave() {
    const {contents} = this.props;
    const payload = Object.assign({}, contents, {file_content: this.rules});

    this.props.storeContents(payload);
  }
}

PackageFile.propTypes = {
  contents: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  fetchContents: PropTypes.func.isRequired,
  storeContents: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { contents } = state;

  return { contents };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContents: (path) => dispatch(fetchContents(path)),
    storeContents: (payload) => dispatch(storeContents(payload)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(PackageFile);
