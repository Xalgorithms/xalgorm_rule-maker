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
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import IconButton from '@material-ui/core/IconButton';

import { fetchRepos } from '../../actions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: '#3f51b5'
  },
});

class Home extends Component {
  onRepoClick = (repo, owner) => {
    const { history } = this.props;
    history.push({
      pathname: `/owner/${owner}/repo/${repo}`,
    })
  }

  componentDidMount() {
    this.props.fetchRepos();
  }

  render() {
    const { classes, repos } = this.props;
    console.log(this.props);
    if (!repos) {
      return (
        <Paper className={classes.root}>
          Activate github app
        </Paper>
      );
    }

    return (
      <Paper className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant="title">
            Repositories
          </Typography>
          <div>
            <List dense={false}>
              {repos.map((r, i) => (
                <ListItem disableGutters={true} key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={r.name}
                    secondary={<a href={r.html_url} className={classes.link} target="_blank">{r.html_url}</a>}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Folder open">
                      <FolderOpen onClick={(e) => this.onRepoClick(r.name, r.owner.login)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Paper>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { repos } = state;

  return { repos };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRepos: () => dispatch(fetchRepos()),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Home);

