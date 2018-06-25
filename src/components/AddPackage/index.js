import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class AddPackage extends Component {
  state = {
    open: false,
    value: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAddPackage = () => {
    this.props.onPackageAdd(this.state.value);
    this.handleClose();
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button variant="fab" className={classes.fab} color="primary" onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Package</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide the package name
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Package Name"
              type="text"
              fullWidth
              value={this.state.value}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddPackage} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddPackage.propTypes = {
  classes: PropTypes.object.isRequired,
  onPackageAdd: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddPackage);