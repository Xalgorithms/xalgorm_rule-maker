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

import AddPackage from '../AddPackage';

import { fetchPackages, newPackage } from '../../actions';

import './index.css';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: '#3f51b5'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Packages extends Component {
  onPackageClick = (path) => {
    const { history } = this.props;
    history.push({
      pathname: `/editor/${path}`,
    })
  }

  onPackageAdd = (name) => {
    this.props.newPackage(name);
  }

  componentDidMount() {
    this.props.fetchPackages();
  }

  render() {
    const { packages, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant="title" className={classes.title}>
            Packages
          </Typography>
          <div className={classes.demo}>
            <List dense={false}>
              {packages.map((p, i) => (
                <ListItem disableGutters={true} key={i}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.path}
                    secondary={<a href={p.url} className={classes.link} target="_blank">{p.url}</a>}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Folder open">
                      <FolderOpen onClick={(e) => this.onPackageClick(p.path)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>

        <AddPackage onPackageAdd={this.onPackageAdd} />
      </div>
    );
  }
}

Packages.propTypes = {
  fetchPackages: PropTypes.func.isRequired,
  newPackage: PropTypes.func.isRequired,
  packages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { packages } = state;

  return { packages };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPackages: () => dispatch(fetchPackages()),
    newPackage: (name) => dispatch(newPackage(name))
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(Packages);
