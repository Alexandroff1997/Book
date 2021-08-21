import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}))

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export const DataChangeModal = ({ modalActive, setModalActive, modalUserData }) => {
  const classes = useStyles()

  console.log(modalUserData.company)

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
              defaultValue={modalUserData.username}
              id="1"
              label="Username"
              variant="outlined"
            />
            <TextField
              defaultValue={modalUserData.email}
              id="2"
              label="E-mail"
              variant="outlined"
            />
            <TextField
              defaultValue={modalUserData.website}
              id="3"
              label="Web"
              variant="outlined"
            />
            <TextField
              defaultValue={modalUserData.company}
              id="3"
              label="Company"
              variant="outlined"
            />
            <TextField
              defaultValue="London"
              id="3"
              label="City"
              variant="outlined"
            />
            <Button variant="contained" color="primary">
              Confirm
            </Button>
            <Button variant="contained">
              Cancel
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}