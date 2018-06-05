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

export const xalgo = {
  // The start state contains the rules that are intially used
  start: [
    // All keywords
    {regex: /(?:WHEN|REQUIRE|INDEX|FILTER|ASSEMBLE|COLUMN|COLUMNS|FROM|MAP|AS|USING|REDUCE|REVISE|KEEP)\b/,
      token: "keyword"},
    // <section>:<key> reference
    {regex: /[a-z$][\w$]*:[a-z$]([\w$]|\.)*/, token: "variable-2"},
    // @<key> reference
    {regex: /@[a-z$]([\w$]|\.)*/, token: "variable-2"},
    // $ reference
    {regex: /(?:\$)\B/, token: "variable-2"},
    // Regular operator
    {regex: /[-+/*=<>!]+/, token: "operator"},
    // String
    {regex: /'(?:[^\\]|\\.)*?(?:'|$)/, token: "string"},
    // Primitives
    {regex: /true|false/, token: "atom"},
    // Numbers
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: "number"},
    {regex: /#.*/, token: "comment"},
  ],
};