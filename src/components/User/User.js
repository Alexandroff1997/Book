import React from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { makeStyles, Box, Collapse, IconButton, TableCell, TableRow, Button } from '@material-ui/core'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

export function User(props) {
  const { user, setModalActive } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row" onClick={() => setOpen(open => !open)} align='justify'>
          {user.name}
        </TableCell>
        <TableCell align='right'>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(open => !open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p>Username: {user.username}</p>
              <p>E-mail: {user.email}</p>
              <p>Web: {user.website}</p>
              <p>Company: {user.company.name}</p>
              <p>City: {user.address.city}</p>
            </Box>
            <Button
              onClick={() => setModalActive(user)}
              style={{marginBottom: "10px"}}
              variant="contained"
              color="primary"
            >
              Change
            </Button>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}