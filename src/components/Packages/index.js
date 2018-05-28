import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import FileCopyIcon from '@material-ui/icons/InsertDriveFile';

import { fetchPackages } from '../../actions';

import './index.css';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 700,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  link: {
    color: '#3f51b5'
  },
  title: {
    'text-transform': 'capitalize'
  }
});

class Packages extends Component {
  render() {
    const { packages, classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={220} className={classes.gridList} cols={2}>
          {packages.map((p, i) => (
            <GridListTile key={i}>
              <List component="nav">
                {p.files.map((f, i) => (
                  <ListItem button key={i}>
                    <ListItemIcon>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={f.path} />
                  </ListItem>
                ))}
              </List>

              <GridListTileBar
                title={<span className={classes.title}>{p.path}</span>}
                subtitle={<a href={p.url} className={classes.link} target="_blank">{p.url}</a>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchPackages();
  }
}

Packages.propTypes = {
  fetchPackages: PropTypes.func.isRequired,
  packages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { packages } = state;

  return { packages };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPackages: (url) => dispatch(fetchPackages())
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Packages);
