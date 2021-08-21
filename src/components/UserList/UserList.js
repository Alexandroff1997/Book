import React from 'react'
import { Table, TableBody, TableContainer, Paper } from '@material-ui/core'
import {User} from "../User/User"

export class UserList extends React.Component {
  render() {
    const { users, setModalActive, modalActive } = this.props
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>
            {users.map((user) => (
              <User
                key={user.name}
                user={user}
                setModalActive={setModalActive}
                modalActive={modalActive}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}