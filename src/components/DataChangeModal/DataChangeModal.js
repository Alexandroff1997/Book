import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Modal, TextField, Button} from '@material-ui/core'
import {set} from "../../utils/set"

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%'
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
})

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

class DataChangeModal extends React.Component {
  constructor(props) {
    super(props);
    const { modalUserData } = props;
    this.state = {
      modalUserData,
    }
  }

  handleChange = (field) => (event) => {
    const { modalUserData } = this.state
    if (!field) {
      field = event.target.name
    }

    set(modalUserData, field, event.target.value)

    this.setState(() => ({
      modalUserData,
    }))
  }

  saveUserData() {
    return this.props.changeUserDataState(this.state.modalUserData)
  }

  render() {
    const { modalUserData } = this.state
    const { modalActive, setModalActive, classes, toggleModal } = this.props
    return (
      <div>
        <Modal
          style={modalStyles}
          open={modalActive}
          onClose={setModalActive}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Change this contact</h2>
            <p id="simple-modal-description"></p>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                value={modalUserData.username}
                onChange={this.handleChange()}
                name="username"
                id="1"
                label="Username"
                variant="outlined"
              />
              <TextField
                value={modalUserData.email}
                onChange={this.handleChange()}
                name="email"
                id="2"
                label="E-mail"
                variant="outlined"
              />
              <TextField
                value={modalUserData.website}
                onChange={this.handleChange()}
                name="website"
                id="3"
                label="Web"
                variant="outlined"
              />
              <TextField
                value={modalUserData.company ? modalUserData.company.name : ''}
                onChange={this.handleChange('company.name')}
                name="companyName"
                id="4"
                label="Company"
                variant="outlined"
              />
              <TextField
                value={modalUserData.address ? modalUserData.address.city : ''}
                onChange={this.handleChange('address.city')}
                name="addressCity"
                id="5"
                label="City"
                variant="outlined"
              />
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Button
                  onClick={() => this.saveUserData(this.state.modalUserData)}
                  variant="contained"
                  color="primary"
                >
                  Confirm
                </Button>
                <Button variant="contained" onClick={toggleModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DataChangeModal)