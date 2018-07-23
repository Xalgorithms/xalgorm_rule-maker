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

import * as api from '../api';
import * as types from '../constants/types';

export function fetchPackages(owner, repo) {
  return (dispatch) => {
    api.fetchPackages(owner, repo).then((data) => {
      dispatch({
        type: types.PACKAGES_FETCHED,
        data,
      });
    });
  };
};

export function newPackage(owner, repo, name) {
  return (dispatch) => {
    api.newPackage(owner, repo, name).then((data) => {
      dispatch({
        type: types.PACKAGE_CREATED,
        data,
      });
    });
  };
};

export function fetchEditorState(owner, repo, id) {
  return (dispatch) => {
    api.fetchEditorState(owner, repo, id).then((data) => {
      dispatch({
        type: types.EDITOR_STATE_FETCHED,
        data,
      });
    });
  };
}

export function saveEditorState(owner, repo, id, payload) {
  return (dispatch) => {
    api.saveEditorState(owner, repo, id, payload).then((data) => {
      dispatch({
        type: types.EDITOR_STATE_STORED,
        data,
      });
    });
  };
};

export function fetchRepos() {
  return (dispatch) => {
    api.fetchRepos().then((data) => {
      dispatch({
        type: types.REPOS_FETCHED,
        data,
      });
    });
  };
};

