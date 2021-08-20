import React from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { makeStyles, Box, Collapse, IconButton, TableCell, TableRow } from '@material-ui/core'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

export function User(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row" onClick={() => setOpen(!open)} align='justify'>
          {row.name}
        </TableCell>
        <TableCell align='right'>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <p>Username: {row.username}</p>
              <p>E-mail: {row.email}</p>
              <p>Phone: {row.website}</p>
              <p>Company: {row.company.name}</p>
              <p>City: {row.address.city}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}