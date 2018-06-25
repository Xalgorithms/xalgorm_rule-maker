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

const API = process.env.REACT_APP_API;

export function fetchPackages() {
  return fetch(`${API}/package`, {
    method: 'GET',
  })
  .then(response => response.json())
};

export function fetchEditorState(id) {
  return fetch(`${API}/state/${id}`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
};

export function saveEditorState(id, payload) {
  return fetch(`${API}/state`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      payload
    }),
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
};
